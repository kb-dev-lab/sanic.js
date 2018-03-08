'use strict';

const expect = require('chai').expect;
const sanicAssign = require('../../index').Library.Object.assign;

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
};

function arrayEquals(a, b) {
	if (a.length !== b.length) {
		return false;
	}

	const iMax = a.length;
	let i = 0;

	for (; i < iMax; i++) {
		if (typeof a[i] === 'object' && !deepEqual(a[i], b[i])) {
			return false;
		} else if (typeof a[i] === 'array' && !arrayEquals(a[i], b[i])) {
			return false;
		} else if (a[i] !== b[i]) {
			return false;
		}
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

		if (typeof a[currentKey] === 'object' && !deepEqual(a[currentKey], b[currentKey])) {
			return false;
		} else if (typeof a[currentKey] === 'array' && !arrayEquals(a[currentKey], b[currentKey])) {
			return false;
		} else if (a[currentKey] !== b[currentKey]) {
			return false;
		}
	}

	return true;
}

function deepEqual(a, b) {
	return objIncludes(a, b) && objIncludes(b, a);
}

module.exports = function() {
	describe('Base behaviours', function() {
		it('should do crash if target is undefined', function() {
			expect(() => sanicAssign()).to.throw();
		});

		it('should return the target unchanged if no sources is given', function() {
			const target = {};

			expect(sanicAssign(target)).to.be.eql(target);

			const targetWithKey = { a: 1 };
			const result = sanicAssign(targetWithKey);

			expect(result).to.be.eql(targetWithKey);
			expect(deepEqual(targetWithKey, result)).to.be.true;
		});
	});

	describe('Add new keys', function() {
		it('should return the same result than Object.assign()', function() {
			let sanicObj = { a: 1 };
			let nativeObj = { a: 1 };

			Object.assign(nativeObj, simpleObject, complexObject);
			sanicAssign(sanicObj, simpleObject, complexObject);

			expect(deepEqual(nativeObj, sanicObj)).to.be.true;
		});
	});

	describe('Overwrite existing keys', function() {
		it('should return the same result than Object.assign()', function() {
			let sanicObj = { a: 1 };
			let nativeObj = { a: 1 };

			let newObj = { a: 2 };

			Object.assign(nativeObj, newObj);
			sanicAssign(sanicObj, newObj);

			expect(deepEqual(nativeObj, sanicObj)).to.be.true;
		});

		it('should not overwrite with a undefined value in key source', function() {
			let sanicObj = { a: 1 };
			let nativeObj = { a: 1 };

            let a;

			let newObj = { a };

			Object.assign(nativeObj, newObj);
			sanicAssign(sanicObj, newObj);

			expect(deepEqual(nativeObj, sanicObj)).to.be.true;
		});
	});
};
