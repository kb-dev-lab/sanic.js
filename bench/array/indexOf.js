'use strict';

const NO_VALUE = 'No value';
const FIRST_QUARTER_VALUE = '1/4 Value';
const HALF_VALUE = '1/2 Value';
const LAST_QUARTER_VALUE = '3/4 Value';
const END = 'End Value';

function sanicIndexOf(array, searchIndex, fromIndex) {
    if (!(array instanceof Array)){
        throw new TypeError('array is not an Array');
    }

    if (!array.length){
        return -1;
    }

    if (fromIndex && fromIndex >= array.length){
        return -1;
    }

    let i = 0;

    if (fromIndex && fromIndex < 0 && fromIndex > -array.length){
        i = array.length + fromIndex;
    }

    const iMax = array.length;

    for (; i < iMax; i++) {
        if (array[i] === searchIndex){
            return i;
        }
    }

    return -1;
};

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
		.add('Array.prototype.indexOf()', function () {
			return little.indexOf(1);
		})
		.add('Sanic indexOf()', function () {
			return sanicIndexOf(little, 1);
		})
		.run(suiteOptions);

	console.log(`\t1k elements - ${name}`);
	computeSuite()
		.add('Array.prototype.indexOf()', function () {
			return medium.indexOf(1);
		})
		.add('Sanic indexOf()', function () {
			return sanicIndexOf(medium, 1);
		})
		.run(suiteOptions);

	console.log(`\t1M elements - ${name}`);
	computeSuite()
		.add('Array.prototype.indexOf()', function () {
			return big.indexOf(1);
		})
		.add('Sanic indexOf()', function () {
			return sanicIndexOf(big, 1);
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
	doSuite(LAST_QUARTER_VALUE, computeSuite,suiteOptions);

	if (fileWriter) writeInNewRow(fileWriter, END, false);
	doSuite(END, computeSuite, suiteOptions);
};