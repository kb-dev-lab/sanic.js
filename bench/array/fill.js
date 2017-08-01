'use strict';

const NO_VALUE = 'No value';
const FIRST_QUARTER_VALUE = '1/4 Value';
const HALF_VALUE = '1/2 Value';
const LAST_QUARTER_VALUE = '3/4 Value';
const END = 'End Value';

const sanicFill = require('../../index').Library.Array.fill;

module.exports = function (computeSuite, fileWriter, suiteOptions) {
    const little = (new Array(10)).fill(1);
    const medium = (new Array(1000)).fill(1);
    const big = (new Array(1000000)).fill(1);

    if (fileWriter) fileWriter.writeTableElement('Fill all the array');

    console.log(`\t10 elements`);
    computeSuite()
        .add('Array.prototype.fill()', function () {
            little.fill(1);
        })
        .add('Sanic fill()', function () {
            sanicFill(little, 1);
        })
        .run(suiteOptions);

    console.log(`\t1k elements`);
    computeSuite()
        .add('Array.prototype.fill()', function () {
            medium.fill(1);
        })
        .add('Sanic fill()', function () {
            sanicFill(medium, 1);
        })
        .run(suiteOptions);

    console.log(`\t1M elements`);
    computeSuite()
        .add('Array.prototype.fill()', function () {
            big.fill(1);
        })
        .add('Sanic fill()', function () {
            sanicFill(big, 1);
        })
        .run(suiteOptions);
};