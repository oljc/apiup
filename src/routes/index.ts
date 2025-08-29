import { Hono } from 'hono';
import xhs from './xhs';

const routes = new Hono();

routes.get('/', (c) => c.ok('欢迎开放 API 服务', '欢迎开放 API 服务'));

routes.route('/xhs', xhs);

export default routes;
