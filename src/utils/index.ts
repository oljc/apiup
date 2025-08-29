const opt = Object.prototype.toString;

export function isUndefined(obj: any): obj is undefined {
	return obj === undefined;
}

export function isNull(obj: any): obj is null {
	return obj === null;
}

export function isString(obj: any): obj is string {
	return opt.call(obj) === '[object String]';
}

export function isNumber(obj: any): obj is number {
	return opt.call(obj) === '[object Number]';
}

export function isArray(obj: any): obj is any[] {
	return opt.call(obj) === '[object Array]';
}

export function isDate(obj: any): obj is Date {
	return opt.call(obj) === '[object Date]';
}

export function isObject(obj: any): obj is { [key: string]: any } {
	return opt.call(obj) === '[object Object]';
}
