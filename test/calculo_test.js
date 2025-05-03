const test = require('node:test');
const assert = require('node:assert');
const { squareArea } = require('../calculators/calculo');

test('squareArea', async () => {
    const result = await squareArea(5);
    assert.strictEqual(result, 25);
});
