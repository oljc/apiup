import type { Context, Next } from 'hono';
import { error, success } from '@/utils/response';

declare module 'hono' {
	interface Context {
		ok: <T = any>(data: T, message?: string, code?: number) => Response;
		fail: (message?: string, code?: number) => Response;
	}
}

export const contextMiddleware = async (c: Context, next: Next) => {
	c.ok = (data, message, code) => c.json(success(data, message, code));
	c.fail = (message, code) => c.json(error(message, code));

	await next();
};
