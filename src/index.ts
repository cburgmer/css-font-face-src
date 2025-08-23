import * as grammar from './grammar/index';

export class SyntaxError extends Error {
    readonly name = SyntaxError.name;

    location: unknown;

    constructor(message: string, location?: unknown) {
        super(message);

        this.location = location;
    }
}

export type FontFaceSrcItem = {
    local: string;
    url: never;
    format: never;
    tech: never;
} | {
    local: never;
    url: string;
    format?: string;
    tech?: string;
};

export function parse(fontFaceSourceValue: string): FontFaceSrcItem[] {
    try {
        return grammar.parse(fontFaceSourceValue) as FontFaceSrcItem[];
    } catch (e) {
        const error = e as {
            message: string;
            location: unknown;
        }
        throw new SyntaxError(error.message, error.location);
    }
}

export function serialize(parsedFontFaceSources: FontFaceSrcItem[]): string {
    return parsedFontFaceSources.map(item => {
        let itemStr: string;

        if (item.url) {
            itemStr = `url("${item.url}")`;
            if (item.format) {
                itemStr = `${itemStr} format("${item.format}")`;
            }
        } else {
            itemStr = `local("${item.local}")`;
        }
        return itemStr;
    }).join(', ');
}