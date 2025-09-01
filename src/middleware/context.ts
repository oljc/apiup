import { randomUUID } from 'crypto';
import { createMiddleware } from 'hono/factory';
import { error, success } from '@/utils/response';

declare module 'hono' {
	interface Context {
		ok: <T = unknown>(data: T, message?: string, code?: number) => Response;
		fail: <T = unknown>(message?: string, data?: T, code?: number) => Response;
	}
}

export const contextMiddleware = createMiddleware(async (c, next) => {
	const traceId = c.req.header('X-Trace-Id') || randomUUID();

	c.header('X-Trace-Id', traceId);
	c.ok = (data, message, code) => c.json(success(data, message, code, traceId));
	c.fail = (message, data, code) => c.json(error(message, data, code, traceId));
	await next();
});
