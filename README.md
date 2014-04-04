css-font-face-src
=================

<a href="https://www.npmjs.org/package/css-font-face-src">
    <img src="https://badge.fury.io/js/css-font-face-src.svg"
         align="right" alt="NPM version" height="18">
</a>

A CSS [@font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) src property value parser.

Example
-------

    var parser = require('css-font-face-src');

    parser.parse('local("Fake Font"), url("fake.otf") format("opentype"), url("fake.woff"), local("Another Fake Font")');

will return


    [{
        local: 'Fake Font'
    }, {
        url: 'fake.otf',
        format: 'opentype'
    }, {
        url: 'fake.woff'
    }, {
        local: 'Another Fake Font'
    }]


[![Build Status](https://travis-ci.org/cburgmer/css-font-face-src.svg?branch=master)](https://travis-ci.org/cburgmer/css-font-face-src)

Author
------
Christoph Burgmer. Licensed under BSD-2-Clause. Reach out [on Twitter](https://twitter.com/cburgmer).
