const URL_REGEX = /https?:\/\/[^\s'"<>]+/i;

export const extractLink = (text: string): string =>
	text ? (text.match(URL_REGEX) || [''])[0] : '';
