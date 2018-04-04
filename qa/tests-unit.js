const fortune = require('../lib/fortunes');
const expect = require('chai').expect;

suite('Fortune cookie tests', () => {
    test('getFortune() show return a fortune', () => {
        expect('string' === typeof fortune());
    });
});