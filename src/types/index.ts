export interface ApiResponse<T> {
	code: number;
	message: string;
	status: 'success' | 'error';
	data: T | null;
	timestamp: number;
}
