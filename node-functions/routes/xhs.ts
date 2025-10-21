import { isNull } from 'checkis';
import { Hono } from 'hono';
import { extractLink } from 'node-functions/utils';
import { fetchHtml } from 'node-functions/utils/fetch';
import { validator } from 'node-functions/utils/validator';

const app = new Hono();
const idRegex = /(?:discovery\/item|explore|item|note)\/([a-zA-Z0-9]+)/;
const scriptRegex = /<script>\s*window.__INITIAL_STATE__\s*=\s*({[\s\S]*?})<\/script>/i;

const extractId = (url: string): string | null => {
	const match = url.match(idRegex);
	return match?.[1] ?? null;
};

app.post(
	'/',
	validator('json', {
		url: {
			type: 'string',
			required: true,
		},
	}),
	async (c) => {
		const { url } = await c.req.json();
		const finalUrl = extractLink(url);

		try {
			const html = await fetchHtml(finalUrl);

			if (!html) return c.fail('请求失败');

			const match = html.match(scriptRegex);
			if (isNull(match)) return c.fail('获取数据失败');

			const json = JSON.parse(match?.[1]?.replace(/undefined/g, 'null') ?? '{}');

			const data = json.note;
			const note = data?.noteDetailMap[data.firstNoteId || extractId(finalUrl)]?.note || {};

			const visuals: any[] = [];
			if (note.type === 'normal') {
				note.imageList.forEach((item: any) => {
					if (item.livePhoto && item.stream) {
						visuals.push({
							type: 'livePhoto',
							url: item.urlDefault,
							video:
								item.stream.h266?.[0]?.masterUrl ||
								item.stream.h265?.[0]?.masterUrl ||
								item.stream.h264?.[0]?.masterUrl ||
								item.stream.av1?.[0]?.masterUrl,
							width: item.width,
							height: item.height,
						});
					} else {
						visuals.push({
							type: 'image',
							url: item.urlDefault,
							video: null,
							width: item.width,
							height: item.height,
						});
					}
				});
			} else if (note.type === 'video' && note.video) {
				const img = note.imageList?.[0];
				const { stream = {}, video } = note.video.media || {};
				visuals.push({
					type: 'video',
					url: img?.urlDefault,
					video:
						stream.h266?.[0]?.masterUrl ||
						stream.h265?.[0]?.masterUrl ||
						stream.h264?.[0]?.masterUrl ||
						stream.av1?.[0]?.masterUrl ||
						'',
					width: img?.width,
					height: img?.height,
					duration: video?.duration,
				});
			}

			return c.ok(
				{
					nickName: note.user?.nickname,
					avatar: note.user?.avatar,
					title: note.title,
					desc: note.desc,
					visuals,
				},
				'解析成功',
			);
		} catch {
			return c.fail('链接解析失败');
		}
	},
);

export default app;
