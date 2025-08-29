const opt = Object.prototype.toString;

export function isUndefined(obj: any): obj is undefined {
	return obj === undefined;
}

export function isNull(obj: any): obj is null {
	return obj === null;
}
