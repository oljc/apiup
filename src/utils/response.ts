import type { ApiResponse } from '@/types';

/**
 * 成功响应
 * @param data 数据
 * @param message 消息
 * @param code 状态码
 * @returns 响应对象
 */
export const success = <T>(data: T, message = 'OK', code = 200, traceId = ''): ApiResponse<T> => {
	return {
		code,
		data,
		message,
		status: 'success',
		timestamp: Date.now(),
		traceId,
	};
};

/**
 * 错误响应
 * @param message 消息
 * @param code 状态码
 * @returns 响应对象
 */
export const error = <T>(
	message = '服务器错误',
	errors: T,
	code = 500,
	traceId = '',
): ApiResponse<T> => {
	return {
		code,
		errors,
		message,
		status: 'error',
		timestamp: Date.now(),
		traceId,
	};
};
