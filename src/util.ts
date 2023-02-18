const WHITESPACE_REGEX = /^[\t\r\f\n ]*(.+?)[\t\r\f\n ]*$/;

const DOUBLE_QUOTE_REGEX = /^"(.*)"$/;
const SINGLE_QUOTE_REGEX = /^'(.*)'$/;

function trimCSSWhitespace(str: string): string {
    return str.replace(WHITESPACE_REGEX, "$1");
};

function unquoteString(quotedStr: string): string {
    if (DOUBLE_QUOTE_REGEX.test(quotedStr)) {
        return quotedStr.replace(DOUBLE_QUOTE_REGEX, "$1");
    }
    if (SINGLE_QUOTE_REGEX.test(quotedStr)) {
        return quotedStr.replace(SINGLE_QUOTE_REGEX, "$1");
    }
    return quotedStr;
};

export function extractValue(value: string): string {
    return unquoteString(trimCSSWhitespace(value));
};
