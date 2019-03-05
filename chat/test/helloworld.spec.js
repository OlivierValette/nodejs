const assert = require('assert');

describe('Test Mocha framework', function() {
    it.skip('should pass the test', function () {
        assert.strictEqual(2,3, 'Values are not equal');
    });
});