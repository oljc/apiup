const opt = Object.prototype.toString;

export function isUndefined(value: unknown): value is undefined {
	return value === undefined;
}

export function isNull(value: unknown): value is null {
	return value === null;
}

export function isNullish(value: unknown): value is null | undefined {
	return value == null;
}

export function isString(value: unknown): value is string {
	return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
	return typeof value === 'number' && !Number.isNaN(value);
}

export function isFiniteNumber(value: unknown): value is number {
	return isNumber(value) && Number.isFinite(value);
}

export function isBoolean(value: unknown): value is boolean {
	return typeof value === 'boolean';
}

export function isArray<T = unknown>(value: unknown): value is T[] {
	return Array.isArray(value);
}

export function isDate(value: unknown): value is Date {
	return opt.call(value) === '[object Date]' && !Number.isNaN((value as Date).getTime());
}

export function isObject(value: unknown): value is Record<string, unknown> {
	return opt.call(value) === '[object Object]';
}

export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
	return typeof value === 'function';
}

export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
	return (
		value instanceof Promise ||
		(isObject(value) && isFunction(value.then) && isFunction(value.catch))
	);
}

export function isRegExp(value: unknown): value is RegExp {
	return opt.call(value) === '[object RegExp]';
}

/**
 * 检查值是否为空值（null、undefined、空字符串、空数组、空对象）
 */
export function isEmpty(value: unknown): boolean {
	if (isNullish(value)) return true;
	if (isString(value)) return isBlank(value);
	if (isArray(value)) return value.length === 0;
	if (isObject(value)) return Object.keys(value).length === 0;
	return false;
}

/**
 * 检查字符串是否为空
 */
export function isBlank(value: unknown): boolean {
	return !isString(value) || value.trim().length === 0;
}

/**
 * 检查值是否为有效的 URL
 */
export function isUrl(value: unknown): value is string {
	if (!isString(value)) return false;
	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
}
