'use strict';

function sanicConcat(array) {
    if (!(array instanceof Array)) {
        throw new TypeError('array is not an Array');
    }

    let i = 1;
    const iMax = arguments.length;

    let currentArray, j, jMax;
    for (; i < iMax; i++) {
        currentArray = arguments[i];

        if (!(currentArray instanceof Array)) {
            throw new TypeError('array is not an Array');
        }

        j = 0;
        jMax = currentArray.length;

        for (; j < jMax; j++){
            array.push(currentArray[j]);
        }
    }
    
    array.length = totalLength;

    return array;
}

module.exports = function (computeSuite, fileWriter, suiteOptions) {
    const little = (new Array(10)).fill(1);
    const medium = (new Array(1000)).fill(1);
    const big = (new Array(1000000)).fill(1);

    if (fileWriter) fileWriter.writeTableElement('Keep elements with values 0');

    console.log(`\t10 elements`);
    computeSuite()
        .add('Array.prototype.concat()', function () {
            return [1].concat(little);
        })
        .add('Sanic concat()', function () {
            return sanicConcat([1], little);
        })
        .run(suiteOptions);

    console.log(`\t1k elements`);
    computeSuite()
        .add('Array.prototype.concat()', function () {
            return [1].concat(medium);
        })
        .add('Sanic concat()', function () {
            return sanicConcat([1], medium);
        })
        .run(suiteOptions);

    console.log(`\t1M elements`);
    computeSuite()
        .add('Array.prototype.concat()', function () {
            return [1].concat(big);
        })
        .add('Sanic concat()', function () {
            return sanicConcat([1], big);
        })
        .run(suiteOptions);
};