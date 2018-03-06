'use strict';

function sanicUnshift(array, ...el) {
	if (!(array instanceof Array)) {
		throw new TypeError('array is not an Array');
	}

	let a = [];
	let i = array.length;

	a.length = array.length + el.length;

	for (; i > 0; i--) {
		a[i + el.length] = array[i];
	}

	i = el.length;

	for (; i > 0; i--) {
		a[i] = el[i];
	}

	array = [];

	return array.length;
}

module.exports = function(computeSuite, fileWriter, suiteOptions) {
	const little = new Array(10).fill(1);
	const medium = new Array(1000).fill(1);
	const big = new Array(1000000).fill(1);

	if (fileWriter) fileWriter.writeTableElement('Keep elements with values 0');
	little.unshift(1);
	console.log(little);
	little.shift();
	sanicUnshift(little, 1);
	console.log(little, little.length);
	little.shift();

	console.log(`\t10 elements`);
	computeSuite()
		.add('Array.prototype.unshift()', function() {
			little.unshift(1);
			little.shift();
		})
		.add('Sanic unshift()', function() {
			sanicUnshift(little, 1);
			little.shift();
		})
		.run(suiteOptions);

	console.log(`\t1k elements`);
	computeSuite()
		.add('Array.prototype.unshift()', function() {
			medium.unshift(1);
			medium.shift();
		})
		.add('Sanic unshift()', function() {
			sanicUnshift(medium, 1);
			medium.shift();
		})
		.run(suiteOptions);

	console.log(`\t1M elements`);
	computeSuite()
		.add('Array.prototype.unshift()', function() {
			big.unshift(1);
			big.shift();
		})
		.add('Sanic unshift()', function() {
			sanicUnshift(big, 1);
			big.shift();
		})
		.run(suiteOptions);
};
