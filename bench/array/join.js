'use strict';

// Basic implementation
function sanicJoin(array, separator = ',') {
    if (!(array instanceof Array)){
        throw new TypeError('array is not an Array');
    }

    if (!array.length){
        return '';
    }

    if (array.length === 1){
        return array[0];
    }

    let res = array[0], i = 1;
    const iMax = array.length;

    for (; i < iMax; i++){
        res += `${separator}${array[i]}`;
    }

    return res;
};

/* Node Buffer implementation
function sanicJoin(array, separator = ',') {
    if (!(array instanceof Array)){
        throw new TypeError('array is not an Array');
    }

    if (!array.length){
        return '';
    }

    if (array.length === 1){
        return `${array[0]}`;
    }

    let res = array[0], i = 1;
    const iMax = array.length;

    const buffer = Buffer.alloc(4096);
    let currentOffset = 0;
    let currentStr = '';

    for (; i < iMax; i++){
        currentStr = `${separator}${array[i]}`;

        if (currentOffset + currentStr >= 4096){
            buffer.fill('\0', currentOffset);
            currentOffset = 0;
            res += buffer.toString();
        }

        buffer.write(currentStr, currentOffset, currentStr.length);
        currentOffset += currentStr.length;
    }

    res += buffer.toString();

    return res;
};
*/

module.exports = function (computeSuite, fileWriter, suiteOptions) {
    const little = (new Array(10)).fill(0).map((e, i) => i % 2);
    const medium = (new Array(1000)).fill(0).map((e, i) => i % 2);
    const big = (new Array(1000000)).fill(0).map((e, i) => i % 2);

    console.log(sanicJoin(little));
    console.log(sanicJoin(medium));

    if (fileWriter) fileWriter.writeTableElement('Keep elements with values 0');

    console.log(`\t10 elements`);
    computeSuite()
        .add('Array.prototype.join()', function () {
            return little.join(',');
        })
        .add('Sanic join()', function () {
            return sanicJoin(little, ',');
        })
        .run(suiteOptions);

    console.log(`\t1k elements`);
    computeSuite()
        .add('Array.prototype.join()', function () {
            return medium.join(',');
        })
        .add('Sanic join()', function () {
            return sanicJoin(medium, ',');
        })
        .run(suiteOptions);

    console.log(`\t1M elements`);
    computeSuite()
        .add('Array.prototype.join()', function () {
            return big.join(',');
        })
        .add('Sanic join()', function () {
            return sanicJoin(big, ',');
        })
        .run(suiteOptions);
};