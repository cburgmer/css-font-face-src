/* jshint node: true */
const path = require('path');
const puppeteer = require('puppeteer');

const fileUrl = (p) => {
    if (p.indexOf('://') >= 0) {
        return p;
    }

    if (path.isAbsolute(p)) {
        return 'file://' + path;
    }
    return 'file://' + process.cwd() + '/' + p;
};



puppeteer.launch()
    .then(browser => {
        browser.newPage()
            .then(page => {
                page.on('console', msg => console.log(msg.text()));
                return page;
            })
            .then(page => page.goto(fileUrl(process.argv[2])))
            .then(() => browser.close());
    }) ;
