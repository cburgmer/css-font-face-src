import path from 'node:path';
import puppeteer from 'puppeteer';

function fileUrl(p: string): string {
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
    });
