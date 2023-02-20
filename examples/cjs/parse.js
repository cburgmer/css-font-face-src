const parser = require('css-font-face-src');

console.log(parser.parse('local("The Font"), url("font.otf") format("opentype"), url("font.woff"), local("Another Font")'));