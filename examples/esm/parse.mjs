import { parse } from 'css-font-face-src';

console.log(parse('local("The Font"), url("font.otf") format("opentype"), url("font.woff"), local("Another Font")'));