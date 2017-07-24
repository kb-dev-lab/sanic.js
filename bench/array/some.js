'use strict';

const sanicSome = require('../../index').Library.Array.some;

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
        .add('Array.prototype.some()', function () {
            return little.some((e) => e === 1);
        })
        .add('Sanic some()', function () {
            return sanicSome(little, (e) => e === 1);
        })
        .run(suiteOptions);

    console.log(`\t1k elements - ${name}`);
    computeSuite()
        .add('Array.prototype.some()', function () {
            return medium.some((e) => e === 1);
        })
        .add('Sanic some()', function () {
            return sanicSome(medium, (e) => e === 1);
        })
        .run(suiteOptions);

    console.log(`\t1M elements - ${name}`);
    computeSuite()
        .add('Array.prototype.some()', function () {
            return big.some((e) => e === 1);
        })
        .add('Sanic some()', function () {
            return sanicSome(big, (e) => e === 1);
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