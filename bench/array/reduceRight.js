'use strict';

const sanicReduceRight = require('../../index').Library.Array.reduceRight;

module.exports = function (computeSuite, fileWriter, suiteOptions) {
    const little = (new Array(10)).fill(0).map((e, i) => i % 2);
    const medium = (new Array(1000)).fill(0).map((e, i) => i % 2);
    const big = (new Array(1000000)).fill(0).map((e, i) => i % 2);

    if (fileWriter) fileWriter.writeTableElement('Sum');

    console.log(sanicReduceRight(little, (acc, e) => acc + e));

    console.log(`\t10 elements`);
    computeSuite()
        .add('Array.prototype.reduceRight()', function () {
            return little.reduceRight((acc, e) => acc + e);
        })
        .add('Sanic reduceRight()', function () {
            return sanicReduceRight(little, (acc, e) => acc + e);
        })
        .run(suiteOptions);

    console.log(`\t1k elements`);
    computeSuite()
        .add('Array.prototype.reduceRight()', function () {
            return medium.reduceRight((acc, e) => acc + e);
        })
        .add('Sanic reduceRight()', function () {
            return sanicReduceRight(medium, (acc, e) => acc + e);
        })
        .run(suiteOptions);

    console.log(`\t1M elements`);
    computeSuite()
        .add('Array.prototype.reduceRight()', function () {
            return big.reduceRight((acc, e) => acc + e);
        })
        .add('Sanic reduceRight()', function () {
            return sanicReduceRight(big, (acc, e) => acc + e);
        })
        .run(suiteOptions);
};