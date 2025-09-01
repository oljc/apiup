import { isString } from './is';

const URL_REGEX =
	/https?:\/\/(?:[-\w.])+(?::[0-9]+)?(?:\/(?:[\w/_.])*)?(?:\?(?:[\w&=%.])*)?(?:#(?:[\w.])*)?/g;

/**
 * 获取文本中链接
 */
export const extractLink = (text: string) => {
	if (!text || !isString(text)) return '';
	URL_REGEX.lastIndex = 0;
	const match = URL_REGEX.exec(text);
	return match?.[0] || '';
};
