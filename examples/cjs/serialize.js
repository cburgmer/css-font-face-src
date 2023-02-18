const parser = require('css-font-face-src');

console.log(
    parser.serialize([
        { local: 'The Font' },
        { url: 'font.otf', format: 'opentype' },
        { url: 'font.woff' },
        { local: 'Another Font' }
    ])
);