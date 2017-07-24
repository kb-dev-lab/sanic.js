'use strict';

const sanicReduce = require('../../index').Library.Array.reduce;

module.exports = function (computeSuite, fileWriter, suiteOptions) {
    const little = (new Array(10)).fill(0).map((e, i) => i % 2);
    const medium = (new Array(1000)).fill(0).map((e, i) => i % 2);
    const big = (new Array(1000000)).fill(0).map((e, i) => i % 2);

    if (fileWriter) fileWriter.writeTableElement('Sum');

    console.log(`\t10 elements`);
    computeSuite()
        .add('Array.prototype.reduce()', function () {
            return little.reduce((acc, e) => acc + e);
        })
        .add('Sanic reduce()', function () {
            return sanicReduce(little, (acc, e) => acc + e);
        })
        .run(suiteOptions);

    console.log(`\t1k elements`);
    computeSuite()
        .add('Array.prototype.reduce()', function () {
            return medium.reduce((acc, e) => acc + e);
        })
        .add('Sanic reduce()', function () {
            return sanicReduce(medium, (acc, e) => acc + e);
        })
        .run(suiteOptions);

    console.log(`\t1M elements`);
    computeSuite()
        .add('Array.prototype.reduce()', function () {
            return big.reduce((acc, e) => acc + e);
        })
        .add('Sanic reduce()', function () {
            return sanicReduce(big, (acc, e) => acc + e);
        })
        .run(suiteOptions);
};