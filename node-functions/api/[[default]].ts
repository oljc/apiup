import { Hono } from 'hono';
import { contextMiddleware } from 'node-functions/api/middleware/context';
import { corsMiddleware } from 'node-functions/api/middleware/cors';
import xhs from './routes/xhs';

const app = new Hono();


app.use('*', corsMiddleware);
app.use('*', contextMiddleware);

app.get('/', (c) => {
  const id = c.req.query('id')
  console.log('Full URL:', c.req.url)
  return c.ok('欢迎开放 API 服务', '欢迎开放 API 服务' + id)
});

app.route('/xhs', xhs);

export default app;
