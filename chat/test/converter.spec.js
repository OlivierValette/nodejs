const assert = require('assert');
const converter = require('../converter');

describe('Test converter', function() {

    describe('#temperature', function () {

        it('should convert the temperature', function() {
            assert.strictEqual(converter.temperature(5, "c", "f"), 41, 'Celsius to Fahrenheit conversion failed!');
            assert.strictEqual(converter.temperature(5, "f", "c"), -15, 'Fahrenheit to Celsius conversion failed!');
            assert.strictEqual(converter.temperature(-5, "k", "f"), -468.67, 'Kelvin to Fahrenheit conversion with negative temperature failed!');
        });

        it('should return the same value', function () {
            assert.strictEqual(converter.temperature(5, "f", "f"), 5, 'Same measuring unit failed!');
        });

        it('should not accept other than °C, °F or K', function () {
            assert.throws(function () {
                converter.temperature(5, "t", "f");
                },
                {name: 'Error', message: 'Invalid unit'},
                'Wrong temperature unit failed!');
        });

    });

    describe('#distance', function () {

        it('should convert the distance', function () {
            assert.strictEqual(converter.distance(10, "m", "k"), 16.09, 'Miles to kilometers conversion failed');
            assert.strictEqual(converter.distance(10, "k", "m"), 6.22, 'Kilometers to miles conversion failed');
        });

        it('should not accept other than °C, °F or K', function () {
            assert.throws(function () {
                    converter.distance(5, "f", "m");
                },
                {name: 'Error', message: 'Invalid unit'},
                'Wrong distance unit failed');
        });

    });

    describe('#currencies', function () {

        it('should convert currencies', function(done) {
            converter.currencies(5, "EUR", "USD", function(value) {
                assert.strictEqual(value, 5.6525, 'Euro to Dollars conversion failed');
                done();
            });
        });

    });

});