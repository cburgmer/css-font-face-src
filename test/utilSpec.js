var util = require('../lib/util');

describe("Util", function () {
    describe("extractCssUrl", function () {
        it("should extract a CSS URL", function () {
            var url = util.extractCssUrl('url(path/file.png)');
            expect(url).toEqual("path/file.png");
        });

        it("should handle double quotes", function () {
            var url = util.extractCssUrl('url("path/file.png")');
            expect(url).toEqual("path/file.png");
        });

        it("should handle single quotes", function () {
            var url = util.extractCssUrl("url('path/file.png')");
            expect(url).toEqual("path/file.png");
        });

        it("should handle whitespace", function () {
            var url = util.extractCssUrl('url(   path/file.png )');
            expect(url).toEqual("path/file.png");
        });

        it("should also handle tab, line feed, carriage return and form feed", function () {
            var url = util.extractCssUrl('url(\t\r\f\npath/file.png\t\r\f\n)');
            expect(url).toEqual("path/file.png");
        });

        it("should keep any other whitspace", function () {
            var url = util.extractCssUrl('url(\u2003\u3000path/file.png)');
            expect(url).toEqual("\u2003\u3000path/file.png");
        });

        it("should handle whitespace with double quotes", function () {
            var url = util.extractCssUrl('url( "path/file.png"  )');
            expect(url).toEqual("path/file.png");
        });

        it("should handle whitespace with single quotes", function () {
            var url = util.extractCssUrl("url( 'path/file.png'  )");
            expect(url).toEqual("path/file.png");
        });

        it("should extract a data URI", function () {
            var url = util.extractCssUrl('url("data:image/png;base64,soMEfAkebASE64=")');
            expect(url).toEqual("data:image/png;base64,soMEfAkebASE64=");
        });

        it("should throw an exception on invalid CSS URL", function () {
            expect(function () {
                util.extractCssUrl('invalid_stuff');
            }).toThrow(new Error("Invalid value"));
        });
    });

    describe("extractLocalFontName", function () {
        it("should extract a local font name", function () {
            var fontName = util.extractLocalFontName('local(the font)');
            expect(fontName).toEqual("the font");
        });

        it("should handle double quotes", function () {
            var fontName = util.extractLocalFontName('local("the font")');
            expect(fontName).toEqual("the font");
        });

        it("should handle single quotes", function () {
            var fontName = util.extractLocalFontName("local('the font')");
            expect(fontName).toEqual("the font");
        });

        it("should handle whitespace", function () {
            var fontName = util.extractLocalFontName('local(   the font )');
            expect(fontName).toEqual("the font");
        });

        it("should also handle tab, line feed, carriage return and form feed", function () {
            var fontName = util.extractLocalFontName('local(\t\r\f\nthe font\t\r\f\n)');
            expect(fontName).toEqual("the font");
        });

        it("should keep any other whitspace", function () {
            var fontName = util.extractLocalFontName('local(\u2003the font)');
            expect(fontName).toEqual("\u2003the font");
        });

        it("should handle whitespace with double quotes", function () {
            var fontName = util.extractLocalFontName('local( "the font"  )');
            expect(fontName).toEqual("the font");
        });

        it("should handle whitespace with single quotes", function () {
            var fontName = util.extractLocalFontName("local( 'the font'  )");
            expect(fontName).toEqual("the font");
        });

        it("should throw an exception on invalid local font", function () {
            expect(function () {
                util.extractLocalFontName('invalid_stuff');
            }).toThrow(new Error("Invalid value"));
        });
    });

    describe("unquoteString", function () {
        it("should unquote a double quoted string", function () {
            var url = util.unquoteString('"a string"');
            expect(url).toEqual('a string');
        });

        it("should unquote a single quoted string", function () {
            var url = util.unquoteString("'a string'");
            expect(url).toEqual('a string');
        });

        it("should pass a string that is not quoted", function () {
            var url = util.unquoteString("a string");
            expect(url).toEqual('a string');
        });
    });
});
