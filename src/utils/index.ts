const opt = Object.prototype.toString;

export function isUndefined(obj: any): obj is undefined {
	return obj === undefined;
}

export function isNull(obj: any): obj is null {
	return obj === null;
}

export function isEmpty(value: unknown): boolean {
	// null 或 undefined
	if (value === null || value === undefined) return true;

	// 空字符串
	if (typeof value === 'string' && value.trim() === '') return true;

	// 空数组
	if (Array.isArray(value) && value.length === 0) return true;

	// 空对象
	if (typeof value === 'object' && !Array.isArray(value)) {
		return Object.keys(value as Record<string, unknown>).length === 0;
	}

	return false;
}
