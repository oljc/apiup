export interface OkResponse<T> {
	code: number;
	message: string;
	status: 'success';
	data: T;
	timestamp: number;
	traceId: string;
}
export interface ErrorResponse<T> {
	code: number;
	message: string;
	status: 'error';
	errors: T;
	timestamp: number;
	traceId: string;
}

export type ApiResponse<T> = OkResponse<T> | ErrorResponse<T>;
