import { Hono } from 'hono';
import { isNull } from '@/utils';
import { fetchHtml } from '@/utils/fetch';

const xhsRoutes = new Hono();

const idRegex = /(?:discovery\/item|explore|item|note)\/([a-zA-Z0-9]+)/;
const scriptRegex = /<script>\s*window\.__INITIAL_STATE__\s*=\s*({[\s\S]*?})(?:<\/script>|;)/i;

const extractId = (url: string): string | null => {
  const match = url.match(idRegex);
  return match?.[1] ?? null;
};

xhsRoutes.get('/', async (c) => {
  const { url: rawUrl } = c.req.query();
  if (!rawUrl) return c.fail('URL parameter is required');

  try {
    const parsedUrl = new URL(rawUrl);
    let finalUrl = rawUrl;

    if (parsedUrl.hostname === 'xhs.com') {
      const pathSegments = parsedUrl.pathname.split('/');
      if (pathSegments.length > 4) {
        finalUrl = `https://xhslink.com/a/${pathSegments[4]}`;
      }
    }
    
    if (parsedUrl.hostname !== 'www.xiaohongshu.com') {
      try {
        const res = await fetch(finalUrl, { redirect: 'follow' });
        finalUrl = res.url;
      } catch (fetchError) {
        console.error('Redirect fetch failed:', fetchError);
        return c.fail('Failed to resolve redirect');
      }
    }

    const html = await fetchHtml(finalUrl);
    if (!html) return c.fail('Failed to fetch HTML content');

    const scriptMatch = html.match(scriptRegex);
    if (isNull(scriptMatch)) return c.fail('Initial state script not found');

    let initialState;
    try {
      const jsonString = scriptMatch[1].replace(/undefined/g, 'null');
      initialState = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return c.fail('Failed to parse initial state');
    }

    const { note } = initialState;
    if (!note || !note.noteDetailMap) return c.fail('Invalid note data structure');

    const noteId = note.firstNoteId || extractId(finalUrl);
    if (!noteId) return c.fail('Failed to extract note ID');

    const noteDetail = note.noteDetailMap[noteId]?.note;
    if (!noteDetail) return c.fail('Note detail not found');

    const videoSources = [
      ...(noteDetail.video?.media?.stream?.h265 || []),
      ...(noteDetail.video?.media?.stream?.h264 || [])
    ];
    const video = videoSources[0]?.masterUrl || null;

    const result = {
      nickName: noteDetail.user?.nickname || null,
      avatar: noteDetail.user?.avatar || null,
      title: noteDetail.title || '',
      desc: noteDetail.desc || '',
      cover: noteDetail.imageList?.[0]?.urlPre || null,
      imageList: (noteDetail.imageList || []).map((img: any) => img.urlDefault),
      video
    };

    return c.ok(result, '解析成功');
  } catch (error) {
    console.error('Processing error:', error);
    return c.fail('Internal server error');
  }
});

export default xhsRoutes;
