import { serialize } from 'css-font-face-src';

console.log(
    serialize([
        { local: 'The Font' },
        { url: 'font.otf', format: 'opentype' },
        { url: 'font.woff' },
        { local: 'Another Font' }
    ])
);