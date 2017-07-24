'use strict';

const sanicMap = require('../../index').Library.Array.map;

module.exports = function (computeSuite, fileWriter, suiteOptions) {
    const little = (new Array(10)).fill(0).map((e, i) => i % 2);
    const medium = (new Array(1000)).fill(0).map((e, i) => i % 2);
    const big = (new Array(1000000)).fill(0).map((e, i) => i % 2);

    if (fileWriter) fileWriter.writeTableElement('Map elements with value 0');

    console.log(`\t10 elements`);
    computeSuite()
        .add('Array.prototype.map()', function () {
            return little.map((e) => e === 0);
        })
        .add('Sanic map()', function () {
            return sanicMap(little, (e) => e === 0);
        })
        .run(suiteOptions);

    console.log(`\t1k elements`);
    computeSuite()
        .add('Array.prototype.map()', function () {
            return medium.map((e) => e === 0);
        })
        .add('Sanic map()', function () {
            return sanicMap(medium, (e) => e === 0);
        })
        .run(suiteOptions);

    console.log(`\t1M elements`);
    computeSuite()
        .add('Array.prototype.map()', function () {
            return big.map((e) => e === 0);
        })
        .add('Sanic map()', function () {
            return sanicMap(big, (e) => e === 0);
        })
        .run(suiteOptions);
};