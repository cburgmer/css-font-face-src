import * as util from '../../src/util';

describe("Util", () => {
    describe("extractValue", () => {
        it("should handle string without quotes", () => {
            const fontName = util.extractValue('the font');
            expect(fontName).toEqual("the font");
        });

        it("should handle double quotes", () => {
            const fontName = util.extractValue('"the font"');
            expect(fontName).toEqual("the font");
        });

        it("should handle single quotes", () => {
            const fontName = util.extractValue("'the font'");
            expect(fontName).toEqual("the font");
        });

        it("should handle whitespace", () => {
            const fontName = util.extractValue('   the font ');
            expect(fontName).toEqual("the font");
        });

        it("should also handle tab, line feed, carriage return and form feed", () => {
            const fontName = util.extractValue('\t\r\f\nthe font\t\r\f\n');
            expect(fontName).toEqual("the font");
        });

        it("should keep any other whitspace", () => {
            const fontName = util.extractValue('\u2003the font');
            expect(fontName).toEqual("\u2003the font");
        });

        it("should handle whitespace with double quotes", () => {
            const fontName = util.extractValue(' "the font"  ');
            expect(fontName).toEqual("the font");
        });

        it("should handle whitespace with single quotes", () => {
            const fontName = util.extractValue(" 'the font'  ");
            expect(fontName).toEqual("the font");
        });
    });
});
