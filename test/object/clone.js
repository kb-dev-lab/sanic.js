'use strict';

const expect = require('chai').expect;
const sanicClone = require('../../index').Library.Object.clone;

const simpleObject = {
	x: 1,
	z: true,
	99: 'nothing',
};

const complexObject = {
	c: {
		b: true,
		c: false,
	},
	3: {
		x: 'something',
		42: 64,
	},
	test: {
		date: new Date(),
		value: 'str',
		someArray: [0, 1, 2],
	},
};

function arrayEquals(a, b) {
	if (a.length !== b.length) {
		return false;
	}

	const iMax = a.length;
	let i = 0;

	for (; i < iMax; i++) {
		if (typeof a[i] === 'object' && deepEqual(a[i], b[i])) {
			continue;
		} else if (typeof a[i] === 'array' && arrayEquals(a[i], b[i])) {
			continue;
		} else if (a[i] === b[i]) {
			continue;
		}

		return false;
	}

	return true;
}

function objIncludes(a, b) {
	const aKeys = Object.keys(a);
	const iMax = aKeys.length;
	let i = 0;

	for (; i < iMax; i++) {
		const currentKey = aKeys[i];

		if (a[currentKey] && !b[currentKey]) {
			return false;
		}

		if (a[currentKey] instanceof Date && a[currentKey].getTime() === b[currentKey].getTime()) {
			continue;
		} else if (typeof a[currentKey] === 'object' && deepEqual(a[currentKey], b[currentKey])) {
			continue;
		} else if (typeof a[currentKey] === 'array' && arrayEquals(a[currentKey], b[currentKey])) {
			continue;
		} else if (a[currentKey] === b[currentKey]) {
			continue;
		}

		return false;
	}

	return true;
}

function deepEqual(a, b) {
	return objIncludes(a, b) && objIncludes(b, a);
}

module.exports = function() {
	describe('Base behaviours', function() {
		it('should do returns undefined and null values when passed in params', function() {
			expect(sanicClone()).to.be.undefined;
			expect(sanicClone(null)).to.be.null;
		});
	});

	describe('Clone elements', function() {
		it('should clone each element of an object', function() {
			const simpleClone = sanicClone(simpleObject);

			expect(deepEqual(simpleObject, simpleClone)).to.be.true;
			expect(simpleObject === simpleClone).to.be.false;

			simpleObject.x = 2;

			expect(deepEqual(simpleObject, simpleClone)).to.be.false;

			const complexClone = sanicClone(complexObject);

			expect(deepEqual(complexObject, complexClone)).to.be.true;
			expect(complexObject === complexClone).to.be.false;

			complexObject.x = 2;

			expect(deepEqual(complexObject, complexClone)).to.be.false;
		});
	});
};
