'use strict';

const sanicFilter = require('../../index').Library.Array.filter;

module.exports = function (computeSuite, fileWriter, suiteOptions) {
    const little = (new Array(10)).fill(0).map((e, i) => i % 2);
    const medium = (new Array(1000)).fill(0).map((e, i) => i % 2);
    const big = (new Array(1000000)).fill(0).map((e, i) => i % 2);

    if (fileWriter) fileWriter.writeTableElement('Keep elements with values 0');

    console.log(`\t10 elements`);
    computeSuite()
        .add('Array.prototype.filter()', function () {
            return little.filter((e) => e === 0);
        })
        .add('Sanic filter()', function () {
            return sanicFilter(little, (e) => e === 0);
        })
        .run(suiteOptions);

    console.log(`\t1k elements`);
    computeSuite()
        .add('Array.prototype.filter()', function () {
            return medium.filter((e) => e === 0);
        })
        .add('Sanic filter()', function () {
            return sanicFilter(medium, (e) => e === 0);
        })
        .run(suiteOptions);

    console.log(`\t1M elements`);
    computeSuite()
        .add('Array.prototype.filter()', function () {
            return big.filter((e) => e === 0);
        })
        .add('Sanic filter()', function () {
            return sanicFilter(big, (e) => e === 0);
        })
        .run(suiteOptions);
};