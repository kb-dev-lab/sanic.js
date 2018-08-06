'use strict';

const sanicAssign = require('../../index').Library.Object.assign;

function generateObject(nbKeys) {
	let i = 0,
		iMax = nbKeys;
	const result = {};

	for (; i < iMax; i++) {
		result[i] = 1;
	}

	return result;
}

module.exports = function(computeSuite, fileWriter, suiteOptions) {
	const little = generateObject(10);
	const medium = generateObject(1000);
	const big = generateObject(1000000);

    if (fileWriter) fileWriter.writeTableElement('Assign object with n elements');	

	console.log(`\t10 elements`);
	computeSuite()
		.add('Object.prototype.assign()', function() {
			return Object.assign({}, little);
		})
		.add('Sanic assign()', function() {
			return sanicAssign({}, little);
		})
		.run(suiteOptions);

	console.log(`\t1k elements`);
	computeSuite()
		.add('Object.prototype.assign()', function() {
			return Object.assign({}, medium);
		})
		.add('Sanic assign()', function() {
			return sanicAssign({}, medium);
		})
		.run(suiteOptions);

	console.log(`\t1M elements`);
	computeSuite()
		.add('Object.prototype.assign()', function() {
			return Object.assign({}, big);
		})
		.add('Sanic assign()', function() {
			return sanicAssign({}, big);
		})
		.run(suiteOptions);
};
