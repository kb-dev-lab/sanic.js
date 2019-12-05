'use strict';

const { performance } = require('perf_hooks');

const sanicFilter = require('bindings')('sanicjs').filter;
const originalSanicFilter = require('../../index').Library.Array.filter;

module.exports = function(computeSuite, fileWriter, suiteOptions) {
	const little = new Array(10).fill(0).map((e, i) => i % 2);
	const medium = new Array(1000).fill(0).map((e, i) => i % 2);
	const big = new Array(1000000).fill(0).map((e, i) => i % 2);

	if (fileWriter) fileWriter.writeTableElement('Keep elements with values 0');

	let t = 0;
	let u = 0;

	for (let i = 0; i < 1000000; i++) {
        u = performance.now();
        
		little.filter((e) => e === 0);

		t += performance.now() - u;
	}

	console.log(t);
	t = 0;

	for (let i = 0; i < 1000000; i++) {
		u = performance.now();

		originalSanicFilter(little, (e) => e === 0);

		t += performance.now() - u;
	}

	console.log(t);
	t = 0;

	for (let i = 0; i < 1000000; i++) {
		u = performance.now();

		sanicFilter(little, (e) => e === 0);

		t += performance.now() - u;
	}

	console.log(t);
	/*
    console.log(`\t10 elements`);
    computeSuite()
        .add('Array.prototype.filter()', function () {
            const x = little.filter((e) => e === 0);

            return x;
        })
        .add('Sanic filter()', function () {
            const x = sanicFilter(little, (e) => e === 0);

            return x;
        })
        .run(suiteOptions);

    console.log(`\t1k elements`);
    computeSuite()
        .add('Array.prototype.filter()', function () {
            return medium.filter((e) => e === 0);
        })
        .add('Sanic filter()', function () {
            return sanicFilter(medium, (e) => e === 0);
        })
        .run(suiteOptions);

    console.log(`\t1M elements`);
    computeSuite()
        .add('Array.prototype.filter()', function () {
            return big.filter((e) => e === 0);
        })
        .add('Sanic filter()', function () {
            return sanicFilter(big, (e) => e === 0);
        })
        .run(suiteOptions);
        */
};
