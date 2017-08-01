'use strict';

const sanicReverse = require('../../index').Library.Array.reverse;

module.exports = function (computeSuite, fileWriter, suiteOptions) {
    const little = (new Array(10)).fill(0).map((e, i) => i);
    const medium = (new Array(1000)).fill(0).map((e, i) => i);
    const big = (new Array(1000000)).fill(0).map((e, i) => i);

    if (fileWriter) fileWriter.writeTableElement('Reverse all elements of array');

    console.log(`\t10 elements`);
    computeSuite()
        .add('Array.prototype.reverse()', function () {
            little.reverse();
        })
        .add('Sanic reverse()', function () {
            sanicReverse(little);
        })
        .run(suiteOptions);

    console.log(`\t1k elements`);
    computeSuite()
        .add('Array.prototype.reverse()', function () {
            medium.reverse();
        })
        .add('Sanic reverse()', function () {
            sanicReverse(medium);
        })
        .run(suiteOptions);

    console.log(`\t1M elements`);
    computeSuite()
        .add('Array.prototype.reverse()', function () {
            big.reverse();
        })
        .add('Sanic reverse()', function () {
            sanicReverse(big);
        })
        .run(suiteOptions);
};