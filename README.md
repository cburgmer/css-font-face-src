# CSS `@font-face` rule `src` field parser &ndash; `css-font-face-src`

<a href="https://www.npmjs.org/package/css-font-face-src">
    <img src="https://badge.fury.io/js/css-font-face-src.svg"
         align="right" alt="NPM version" height="18">
</a>

A CSS [@font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) `src` property value parser.

Basically it provides two operations:

* `parse`: To convert a CSS property string to an array of easily readable objects. Each object either describes a **local font** (referenced using its family name) or a **remote font** (referenced using its URL).
* `serialize`: To convert an object array back to a CSS property string.

## Examples

### JavaScript verison (CJS, using `require`)

#### Parse

```js
const parser = require('css-font-face-src');

console.log(parser.parse('local("The Font"), url("font.otf") format("opentype"), url("font.woff"), local("Another Font")'));
```

will return:

```js
[
    { local: 'The Font' },
    { url: 'font.otf', format: 'opentype' },
    { url: 'font.woff' },
    { local: 'Another Font' }
]
```

#### Serialize

```js
const parser = require('css-font-face-src');

console.log(
    parser.serialize([
        { local: 'The Font' },
        { url: 'font.otf', format: 'opentype' },
        { url: 'font.woff' },
        { local: 'Another Font' }
    ])
);
```

will return:

```js
'local("The Font"), url("font.otf") format("opentype"), url("font.woff"), local("Another Font")'
```

### JavaScript version (ESM, using `import`)

#### Parse

```js
import { parse } from 'css-font-face-src';

console.log(parse('local("The Font"), url("font.otf") format("opentype"), url("font.woff"), local("Another Font")'));
```

will return:

```js
[
    { local: 'The Font' },
    { url: 'font.otf', format: 'opentype' },
    { url: 'font.woff' },
    { local: 'Another Font' }
]
```

#### Serialize

```js
import { serialize } from 'css-font-face-src';

console.log(
    serialize([
        { local: 'The Font' },
        { url: 'font.otf', format: 'opentype' },
        { url: 'font.woff' },
        { local: 'Another Font' }
    ])
);
```

will return:

```js
'local("The Font"), url("font.otf") format("opentype"), url("font.woff"), local("Another Font")'
```

### TypeScript version

#### Parse

```ts
import { parse } from 'css-font-face-src';

console.log(parse('local("The Font"), url("font.otf") format("opentype"), url("font.woff"), local("Another Font")'));
```

will return:

```ts
[
    { local: 'The Font' },
    { url: 'font.otf', format: 'opentype' },
    { url: 'font.woff' },
    { local: 'Another Font' }
]
```

#### Serialize

```ts
import { serialize, FontFaceSrcItem } from 'css-font-face-src';

console.log(
    serialize([
        { local: 'The Font' },
        { url: 'font.otf', format: 'opentype' },
        { url: 'font.woff' },
        { local: 'Another Font' }
    ] as FontFaceSrcItem[])
);
```

will return:

```ts
'local("The Font"), url("font.otf") format("opentype"), url("font.woff"), local("Another Font")'
```

## Author

Christoph Burgmer. Licensed under BSD-2-Clause. Reach out [on Twitter](https://twitter.com/cburgmer).
