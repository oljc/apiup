import { Hono } from 'hono';
import { contextMiddleware } from 'node-functions/middleware/context';
import { corsMiddleware } from 'node-functions/middleware/cors';
import xhs from './routes/xhs';

const app = new Hono().basePath('/');

app.use('*', corsMiddleware);
app.use('*', contextMiddleware);

app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <title>API 服务</title>
      <style>
        html, body {
          height: 100%;
          margin: 0;
          font-family: sans-serif;
          background-color: #000;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
    </head>
    <body>
      <h1>API Service Running!</h1>
    </body>
    </html>
  `);
});

app.route('/xhs', xhs);

export default app;

