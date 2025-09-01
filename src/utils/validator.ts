import { validator as honoValidator } from 'hono/validator';
import {
	isBoolean,
	isDate,
	isEmpty,
	isFunction,
	isNumber,
	isObject,
	isRegExp,
	isString,
	isUndefined,
} from './is';

export interface VerifyRule {
	/** 数据类型 */
	type?: 'string' | 'number' | 'boolean';
	/** 是否必需 */
	required?: boolean | string;
	/** 最小长度 */
	minLength?: number | { value: number; message: string };
	/** 最大长度 */
	maxLength?: number | { value: number; message: string };
	/** 最小值 */
	min?: number | { value: number; message: string };
	/** 最大值 */
	max?: number | { value: number; message: string };
	/** 正则表达式 */
	pattern?: RegExp | { value: RegExp; message: string };
	/** 消息 */
	message?: string;
	/** 自定义验证函数 */
	validator?: (value: unknown) => boolean | string;
}

export interface Schema {
	[key: string]: VerifyRule;
}

const extractRule = <T>(rule: T | { value: T; message: string }) => {
	if (isObject(rule) && 'value' in rule) {
		return { val: rule.value, msg: rule.message };
	}
	return { val: rule, msg: undefined };
};

const validateField = (field: string, value: unknown, rule: VerifyRule) => {
	const { type, required, message, min, max, minLength, maxLength, pattern, validator } = rule;
	const error = (defaultMsg: string, msg?: string) => msg || message || defaultMsg;

	if (required && isEmpty(value)) {
		return error(`${field} 未填写`, isString(required) ? required : message);
	}

	if (isEmpty(value)) return null;

	if (type) {
		switch (type) {
			case 'string':
				if (!isString(value)) return error('参数类型为字符串');
				break;
			case 'number':
				if (!isNumber(value)) return error('参数类型为数字');
				break;
			case 'boolean':
				if (!isBoolean(value)) return error('参数类型为布尔值');
				break;
		}
	}

	if (!isUndefined(min)) {
		const { val, msg } = extractRule(min);
		if (Number(value) < val) return error(`参数值不能小于 ${val}`, msg);
	}

	if (!isUndefined(max)) {
		const { val, msg } = extractRule(max);
		if (Number(value) > val) return error(`参数值不能大于 ${val}`, msg);
	}

	if (!isUndefined(minLength)) {
		const { val, msg } = extractRule(minLength);
		if (String(value).length < val) return error(`参数值长度不能小于 ${val}`, msg);
	}

	if (!isUndefined(maxLength)) {
		const { val, msg } = extractRule(maxLength);
		if (String(value).length > val) return error(`参数值长度不能大于 ${val}`, msg);
	}

	if (!isUndefined(pattern)) {
		const { val, msg } = extractRule(pattern);
		if (!val.test(value as string)) return error(`参数值不正确 ${val.source}`, msg);
	}

	if (isFunction(validator)) {
		const result = validator(value);
		if (isString(result)) return error(result);
	}
};

const validateData = (data: Record<string, unknown>, schema: Schema) => {
	const errors: Record<string, unknown>[] = [];
	const result: Record<string, unknown> = {};

	for (const [key, rule] of Object.entries(schema)) {
		const value = data[key];
		const error = validateField(key, value, rule);
		if (error) {
			errors.push({
				field: key,
				message: error,
			});
		} else {
			if (!isEmpty(value)) {
				result[key] = value;
			}
		}
	}

	return {
		ok: errors.length === 0,
		errors,
		data: result,
	};
};

/**
 * 参数校验器
 */
export const validator = (
	target: 'query' | 'json' | 'form' | 'header' | 'param' | 'cookie',
	schema: Schema,
	options?: {
		code?: number;
		allErrors?: boolean;
	},
) => {
	const { code = 400 } = options || {};

	return honoValidator(target, (value, c) => {
		const result = validateData(value, schema);

		if (result.ok) return result.data;

		return c.fail('参数校验失败', result.errors, code);
	});
};
