var trimCSSWhitespace = function (value) {
    var whitespaceRegex = /^[\t\r\f\n ]*(.+?)[\t\r\f\n ]*$/;

    return value.replace(whitespaceRegex, "$1");
};

exports.unquoteString = function (quotedUrl) {
    var doubleQuoteRegex = /^"(.*)"$/,
        singleQuoteRegex = /^'(.*)'$/;

    if (doubleQuoteRegex.test(quotedUrl)) {
        return quotedUrl.replace(doubleQuoteRegex, "$1");
    } else {
        if (singleQuoteRegex.test(quotedUrl)) {
            return quotedUrl.replace(singleQuoteRegex, "$1");
        } else {
            return quotedUrl;
        }
    }
};

exports.extractCssUrl = function (cssUrl) {
    var urlRegex = /^url\(([^\)]+)\)/,
        quotedUrl;

    if (!urlRegex.test(cssUrl)) {
        throw new Error("Invalid value");
    }

    quotedUrl = urlRegex.exec(cssUrl)[1];
    return exports.unquoteString(trimCSSWhitespace(quotedUrl));
};

exports.extractLocalFontName = function (fontValue) {
    var localFontRegex = /^local\(([^\)]+)\)/,
        quotedLocalFont;

    if (!localFontRegex.test(fontValue)) {
        throw new Error("Invalid value");
    }

    quotedLocalFont = localFontRegex.exec(fontValue)[1];
    return exports.unquoteString(trimCSSWhitespace(quotedLocalFont));
};
