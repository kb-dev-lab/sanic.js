'use strict';

function sanicIncludes(array, searchElement, fromIndex) {
    if (!(array instanceof Array)){
        throw new TypeError('array is not an Array');
    }

    if (!array.length){
        return false;
    }

    let i = 0;
    const iMax = array.length;

    if (fromIndex > 0){
        i = fromIndex;
    } else if (fromIndex < 0 && fromIndex > -array.length){
        i = array.length + fromindex;
    }

    for (; i < iMax; i++){
        if (array[i] === searchElement) {
            return true;
        }
    }

    return false;
}

const NO_VALUE = 'No value';
const FIRST_QUARTER_VALUE = '1/4 Value';
const HALF_VALUE = '1/2 Value';
const LAST_QUARTER_VALUE = '3/4 Value';
const END = 'End Value';

function doSuite(name, computeSuite, suiteOptions) {
    const little = (new Array(10)).fill(0);
    const medium = (new Array(1000)).fill(0);
    const big = (new Array(1000000)).fill(0);

    switch (name) {
        case END:
            little[little.length - 1] = 1;
            medium[medium.length - 1] = 1;
            big[big.length - 1] = 1;
            break;
        case LAST_QUARTER_VALUE:
            little[7] = 1;
            medium[750] = 1;
            big[750000] = 1;
            break;
        case HALF_VALUE:
            little[5] = 1;
            medium[500] = 1;
            big[500000] = 1;
            break;
        case FIRST_QUARTER_VALUE:
            little[2] = 1;
            medium[250] = 1;
            big[250000] = 1;
            break;
        case NO_VALUE:
        default:
            break;
    }

    console.log(`\t10 elements - ${name}`);
    computeSuite()
        .add('Array.prototype.includes()', function () {
            return little.includes((e) => e === 1);
        })
        .add('Sanic includes()', function () {
            return sanicIncludes(little, (e) => e === 1);
        })
        .run(suiteOptions);

    console.log(`\t1k elements - ${name}`);
    computeSuite()
        .add('Array.prototype.includes()', function () {
            return medium.includes((e) => e === 1);
        })
        .add('Sanic includes()', function () {
            return sanicIncludes(medium, (e) => e === 1);
        })
        .run(suiteOptions);

    console.log(`\t1M elements - ${name}`);
    computeSuite()
        .add('Array.prototype.includes()', function () {
            return big.includes((e) => e === 1);
        })
        .add('Sanic includes()', function () {
            return sanicIncludes(big, (e) => e === 1);
        })
        .run(suiteOptions);
}

function writeInNewRow(fileWriter, name, firstTest) {
    if (!firstTest) {
        fileWriter.newLine();
        fileWriter.writeTableElement('');
    }

    fileWriter.writeTableElement(name);
}

module.exports = function (computeSuite, fileWriter, suiteOptions) {
    if (fileWriter) writeInNewRow(fileWriter, NO_VALUE, true);
    doSuite(NO_VALUE, computeSuite, suiteOptions);

    if (fileWriter) writeInNewRow(fileWriter, FIRST_QUARTER_VALUE, false);    
    doSuite(FIRST_QUARTER_VALUE, computeSuite, suiteOptions);

    if (fileWriter) writeInNewRow(fileWriter, HALF_VALUE, false);    
    doSuite(HALF_VALUE, computeSuite, suiteOptions);

    if (fileWriter) writeInNewRow(fileWriter, LAST_QUARTER_VALUE, false);    
    doSuite(LAST_QUARTER_VALUE, computeSuite, suiteOptions);

    if (fileWriter) writeInNewRow(fileWriter, END, false);
    doSuite(END, computeSuite, suiteOptions);
};