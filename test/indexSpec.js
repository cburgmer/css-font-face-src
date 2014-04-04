var parser = require('../lib/index');

describe("Parser", function () {
    describe("parse", function () {
        it("should throw an error on an invalid value", function () {
            expect(function () {
                parser.parse("invalid text");
            }).toThrow(new Error("Invalid value"));
        });

        it("should throw an error on an invalid value together with a valid one", function () {
            expect(function () {
                parser.parse('"invalid url", url("font.woff")');
            }).toThrow(new Error("Invalid value"));
        });

        it("should throw an error on an invalid value together with a valid one in the reverse order", function () {
            expect(function () {
                parser.parse('url("font.woff"), "invalid url"');
            }).toThrow(new Error("Invalid value"));
        });

        it("should parse a single local font value", function () {
            var parse = parser.parse('local("font name")');

            expect(parse).toEqual([{
                local: 'font name'
            }]);
        });

        it("should parse a single url value", function () {
            var parse = parser.parse('url("font.woff")');

            expect(parse).toEqual([{
                url: 'font.woff'
            }]);
        });

        it("should parse a single url value with a format", function () {
            var parse = parser.parse('url("font.woff") format("woff")');

            expect(parse).toEqual([{
                url: 'font.woff',
                format: 'woff'
            }]);
        });

        it("should parse a mix of multiple values", function () {
            var parse = parser.parse("local('The Font'), url('font.otf') format('opentype'), url('font.woff'), local(\"Another Font\")");

            expect(parse).toEqual([{
                local: 'The Font'
            }, {
                url: 'font.otf',
                format: 'opentype'
            }, {
                url: 'font.woff'
            }, {
                local: 'Another Font'
            }]);
        });

        it("should handle an empty string", function () {
            var parse = parser.parse("");

            expect(parse).toEqual([]);
        });
    });

    describe("serialize", function () {
        it("should serialize a single local font value", function () {
            var text = parser.serialize(parser.parse('local("font name")'));

            expect(text).toEqual('local("font name")');
        });

        it("should serialize a single url value", function () {
            var text = parser.serialize(parser.parse('url("font.woff")'));

            expect(text).toEqual('url("font.woff")');
        });

        it("should serialize a single url value with a format", function () {
            var text = parser.serialize(parser.parse('url("font.woff") format("woff")'));

            expect(text).toEqual('url("font.woff") format("woff")');
        });

        it("should serialize a mix of multiple values", function () {
            var text = parser.serialize(parser.parse("local('The Font'), url('font.otf') format('opentype'), url('font.woff'), local(\"Another Font\")"));

            expect(text).toEqual('local("The Font"), url("font.otf") format("opentype"), url("font.woff"), local("Another Font")');
        });

        it("should handle an empty string", function () {
            var text = parser.serialize(parser.parse(""));

            expect(text).toEqual('');
        });
    });
});
