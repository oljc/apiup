import { Hono } from 'hono';
import { contextMiddleware } from 'node-functions/middleware/context';
import { corsMiddleware } from 'node-functions/middleware/cors';
import xhs from './routes/[[xhs]]';

const app = new Hono().basePath('/');

app.use('*', corsMiddleware);
app.use('*', contextMiddleware);

app.get('/', (c) => {
  return c.ok(null, '欢迎开放 API 服务')
});

app.route('/xhs', xhs);

export default app;

