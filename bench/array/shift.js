'use strict';

function sanicShift(array) {
    if (!(array instanceof Array)) {
        throw new TypeError('array is not an array');
    }
    if (!array.length) {
        return undefined;
    }

    let oldElement = array[0];

    let i = 1;
    const iMax = array.length;

    for(; i < iMax; i++){
        array[i-1] = array[i];
    }

    array.length--;

    return oldElement;
}

module.exports = function (computeSuite, fileWriter, suiteOptions) {
    const little = (new Array(10)).fill(1);
    const medium = (new Array(1000)).fill(1);
    const big = (new Array(1000000)).fill(1);

    if (fileWriter) fileWriter.writeTableElement('Keep elements with values 0');

    console.log(`\t10 elements`);
    computeSuite()
        .add('Array.prototype.shift()', function () {
            little.shift();
            little.push(1);
        })
        .add('Sanic shift()', function () {
            sanicShift(little);
            little.push(1);
        })
        .run(suiteOptions);

    console.log(`\t1k elements`);
    computeSuite()
        .add('Array.prototype.shift()', function () {
            medium.shift();
            medium.push(1);
        })
        .add('Sanic shift()', function () {
            sanicShift(medium);
            medium.push(1);
        })
        .run(suiteOptions);

    console.log(`\t1M elements`);
    computeSuite()
        .add('Array.prototype.shift()', function () {
            big.shift();
            big.push(1);
        })
        .add('Sanic shift()', function () {
            sanicShift(big);
            big.push(1);
        })
        .run(suiteOptions);
};