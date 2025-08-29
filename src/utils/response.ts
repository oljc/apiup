import type { ApiResponse } from '@/types';

/**
 * 成功响应
 * @param data 数据
 * @param message 消息
 * @param code 状态码
 * @returns 响应对象
 */
export const success = <T>(data: T, message = 'OK', code = 200): ApiResponse<T> => {
	return {
		code,
		data,
		message,
		timestamp: Date.now(),
		status: 'success',
	};
};

/**
 * 错误
 * @param message 消息
 * @param code 状态码
 * @returns 响应对象
 */
export const error = (message = '服务器错误', code = 500): ApiResponse<null> => {
	return {
		code,
		data: null,
		message,
		timestamp: Date.now(),
		status: 'error',
	};
};
