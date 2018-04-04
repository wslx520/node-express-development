// 运行方式: 推荐使用git bash运行 mocha -u tdd -R spec --no-timeouts  qa/tests-crosspage.js
// --no-timeouts 可以避免测试在页面没加载完的时候就失败
const Browser = require('zombie');
// const assert = require('chai').assert;

let browser;

suite('Cross-Page Tests', function () {
    setup(function () {
        browser = new Browser();
    });
    test(`requesting a group rate quote form the hood river tour page
    should populate the referrer field`, function (done) {
        let referrer = 'http://localhost:3000/tours/hood-river';
        browser.visit(referrer, () => {
            browser.clickLink('.requestGroupRate', function () {
                // 不再使用 chai.assert , 换成 zombie 自己的 assert
                // assert(browser.field('referrer').value === referrer);
                browser.assert.element('form input[name=referrer]', referrer);
                done();
            });
        });
    });

    test(`requesting a group rate from the oregon coast tour page should 
    populate the referrer field`, done => {
        var referrer = 'http://localhost:3000/tours/oregon-coast';
        browser.visit(referrer, () => {
            browser.clickLink('.requestGroupRate', () => {
                // assert(browser.field('referrer').value === referrer);
                browser.assert.element('form input[name=referrer]', referrer);
                done();
            });
        });
    });

    test(`visiting the "request group rate" page directly should result 
        in an empty referrer field`, function (done) {
        browser.visit('http://localhost:3000/tours/request-group-rate',
            function () {
                browser.assert.element('form input[name=referrer]', '');
                done();
            });
    });
});