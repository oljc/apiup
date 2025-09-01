import { Hono } from 'hono';
import { extractLink } from '@/utils';
import { fetchHtml } from '@/utils/fetch';
import { isNull } from '@/utils/is';
import { validator } from '@/utils/validator';

const app = new Hono();
const idRegex = /(?:discovery\/item|explore|item|note)\/([a-zA-Z0-9]+)/;
const scriptRegex = /<script>\s*window.__INITIAL_STATE__\s*=\s*({[\s\S]*?})<\/script>/i;

const extractId = (url: string): string | null => {
	const match = url.match(idRegex);
	return match?.[1] ?? null;
};

app.get(
	'/',
	validator('query', {
		url: {
			type: 'string',
			required: true,
		},
	}),
	async (c) => {
		const { url } = c.req.valid('query') as { url: string };
		let finalUrl = extractLink(url);

		try {
			const domain = new URL(url);
			if (domain.host === 'xhs.com') {
				const parts = url.split('/');
				finalUrl = `http://xhslink.com/n/${parts[4]}`;
			}

			if (domain.host !== 'www.xiaohongshu.com') {
				const res = await fetch(url, { redirect: 'follow' });
				finalUrl = res.url;
			}

			const html = await fetchHtml(finalUrl);
			if (!html) return c.fail('请求失败');

			const match = html.match(scriptRegex);
			if (isNull(match)) return c.fail('获取数据失败');

			const json = JSON.parse(match?.[1]?.replace(/undefined/g, 'null') ?? '{}');
			const data = json.note;
			const note = data?.noteDetailMap[data.firstNoteId || extractId(finalUrl)]?.note || {};

			const video =
				note.video?.media?.stream?.h265[0]?.masterUrl ||
				note.video?.media?.stream?.h264[0]?.masterUrl;

			const result = {
				nickName: note.user?.nickname,
				avatar: note.user?.avatar,
				title: note.title,
				desc: note.desc,
				cover: note.imageList[0].urlPre,
				imageList: note.imageList.map((item: any) => item.urlDefault),
				video: video,
			};

			return c.ok(result, '解析成功');
		} catch {
			return c.fail('链接解析失败');
		}
	},
);

export default app;
