import app from '@/app';

const port = parseInt(process.env.PORT || '6789', 10);

export default {
	port,
	fetch: app.fetch,
};
