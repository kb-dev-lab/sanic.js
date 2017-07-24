'use strict';

const sanicForEach = require('../../index').Library.Array.forEach;

module.exports = function (computeSuite, fileWriter, suiteOptions) {
    const little = (new Array(10)).fill(0).map((e, i) => i % 2);
    const medium = (new Array(1000)).fill(0).map((e, i) => i % 2);
    const big = (new Array(1000000)).fill(0).map((e, i) => i % 2);
    
    if (fileWriter) fileWriter.writeTableElement('Square');

    console.log(`\t10 elements`);
    computeSuite()
        .add('Array.prototype.forEach()', function () {
            return little.forEach((e) => e * e);
        })
        .add('Sanic forEach()', function () {
            return sanicForEach(little, (e) => e * e);
        })
        .run(suiteOptions);

    console.log(`\t1k elements`);
    computeSuite()
        .add('Array.prototype.forEach()', function () {
            return medium.forEach((e) => e * e);
        })
        .add('Sanic forEach()', function () {
            return sanicForEach(medium, (e) => e * e);
        })
        .run(suiteOptions);

    console.log(`\t1M elements`);
    computeSuite()
        .add('Array.prototype.forEach()', function () {
            return big.forEach((e) => e * e);
        })
        .add('Sanic forEach()', function () {
            return sanicForEach(big, (e) => e * e);
        })
        .run(suiteOptions);
};