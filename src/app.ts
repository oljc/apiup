import { Hono } from 'hono';
import { contextMiddleware } from '@/middleware/context';
import { corsMiddleware } from '@/middleware/cors';
import routes from '@/routes';

const app = new Hono();

app.use('*', corsMiddleware);
app.use('*', contextMiddleware);

app.route('/', routes);

export default app;
