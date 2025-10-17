import { Hono } from 'hono';
import { contextMiddleware } from 'node-functions/api/middleware/context';
import { corsMiddleware } from 'node-functions/api/middleware/cors';
import xhs from './routes/xhs';

const app = new Hono();


app.use('*', corsMiddleware);
app.use('*', contextMiddleware);

app.get('/', async(c) => {
  const id = await c.req.param('id')
  console.log('Full URL:', c.req.url)
  return c.ok(id, '欢迎开放 API 服务')
});

app.post('/p', async(c) => {
  const body = await c.req.parseBody()
  console.log(body);
  return c.ok(body, '123')
})

app.route('/xhs', xhs);

export default app;
