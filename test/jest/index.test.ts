import * as parser from '../../src/index';

describe("Parser", () => {
    describe("parse", () => {
        it("should throw an error on an invalid value", () => {
            expect(() => {
                parser.parse("invalid text");
            }).toThrow(new parser.SyntaxError('Expected "local(", "url(", or end of input but "i" found.'));
        });

        it("should throw an error on an invalid value together with a valid one", () => {
            expect(() => {
                parser.parse('"invalid url", url("font.woff")');
            }).toThrow(new parser.SyntaxError('Expected "local(", "url(", or end of input but "\\"" found.'));
        });

        it("should throw an error on an invalid value together with a valid one in the reverse order", () => {
            expect(() => {
                parser.parse('url("font.woff"), "invalid url"');
            }).toThrow(new parser.SyntaxError('Expected "local(", "url(", or [ ,\\t,\\r,\\n,\\x0C] but "\\"" found.'));
        });

        it("should parse a single local font value", () => {
            const parse = parser.parse('local("font name")');

            expect(parse).toEqual([{
                local: 'font name'
            }]);
        });

        it("should parse a single url value", () => {
            const parse = parser.parse('url("font.woff")');

            expect(parse).toEqual([{
                url: 'font.woff'
            }]);
        });

        it("should parse a single url value with a format", () => {
            const parse = parser.parse('url("font.woff") format("woff")');

            expect(parse).toEqual([{
                url: 'font.woff',
                format: 'woff'
            }]);
        });

        it("should parse a mix of multiple values", () => {
            const parse = parser.parse("local('The Font'), url( 'font.otf') format('opentype'), url(font.woff), local(\"Another Font\")");

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

        it("should parse white space between values", () => {
            const parse = parser.parse('url("font.woff") \t\r\n\f, \t\r\n\furl("font.eot")');

            expect(parse).toEqual([{
                url: 'font.woff'
            }, {
                url: 'font.eot'
            }]);
        });

        it("should parse white space between a format", () => {
            const parse = parser.parse('url("font.woff") \t\r\n\fformat("woff")');

            expect(parse).toEqual([{
                url: 'font.woff',
                format: 'woff'
            }]);
        });

        it("should parse no white space between a format", () => {
            const parse = parser.parse('url("font.woff")format("woff")');

            expect(parse).toEqual([{
                url: 'font.woff',
                format: 'woff'
            }]);
        });

        it("should handle an empty string", () => {
            const parse = parser.parse("");

            expect(parse).toEqual([]);
        });
    });

    describe("serialize", () => {
        it("should serialize a single local font value", () => {
            const text = parser.serialize(parser.parse('local("font name")'));

            expect(text).toEqual('local("font name")');
        });

        it("should serialize a single url value", () => {
            const text = parser.serialize(parser.parse('url("font.woff")'));

            expect(text).toEqual('url("font.woff")');
        });

        it("should serialize a single url value with a format", () => {
            const text = parser.serialize(parser.parse('url("font.woff") format("woff")'));

            expect(text).toEqual('url("font.woff") format("woff")');
        });

        it("should serialize a mix of multiple values", () => {
            const text = parser.serialize(parser.parse("local('The Font'), url('font.otf') format('opentype'), url('font.woff'), local(\"Another Font\")"));

            expect(text).toEqual('local("The Font"), url("font.otf") format("opentype"), url("font.woff"), local("Another Font")');
        });

        it("should handle an empty string", () => {
            const text = parser.serialize(parser.parse(""));

            expect(text).toEqual('');
        });
    });
});
