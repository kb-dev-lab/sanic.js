'use strict';

const expect = require('chai').expect;
const sanicFind = require('../..').Library.Array.find;

const emptyArray = [];
const resultArray = new Array(10000);
const indexToFind = 5000;

resultArray[indexToFind] = 1;

module.exports = function() {
	describe('Base behaviours', function() {
		it("should do nothing if there's no array", function() {
			expect(sanicFind()).to.be.undefined;
		});

		it('should need a function', function() {
			expect(() => sanicFind(emptyArray)).to.throw();
			expect(() => sanicFind(emptyArray, [])).to.throw();
			expect(() => sanicFind(emptyArray, '')).to.throw();
			expect(() => sanicFind(emptyArray, null)).to.throw();
		});

		it('should find nothing in an empty array', function() {
			const nativeResult = emptyArray.find((e) => e === 2);
			const sanicResult = sanicFind(emptyArray, (e) => e === 2);

			expect(nativeResult).to.be.eql(sanicResult);
			expect(sanicResult).to.be.undefined;
			expect(emptyArray.length).to.be.eql(0);
		});

		it('should call native find if array is not an array', function() {
			expect(() => sanicFind({}, (e) => e === 1)).to.not.throw();

			const nativeObjTest = { a: 1, b: 2 };
			const sanicObjTest = { a: 1, b: 2 };

			const nativeResult = Array.prototype.find.call(nativeObjTest, (e) => e === 1);
			const sanicResult = sanicFind(sanicObjTest, (e) => e === 1);

			expect(nativeResult).to.be.equal(sanicResult);
		});
	});

	describe('Basic find', function() {
		it('should find a basic element', function() {
			const sanicResult = sanicFind(resultArray, (e) => e === 1);

			expect(sanicResult).to.be.eql(resultArray[5000]);
		});

		it('should not find an inexisting element', function() {
			const sanicResult = sanicFind(resultArray, (e) => e === 2);

			expect(sanicResult).to.be.undefined;
		});
	});

	describe('Find with this context', function() {
		describe('should find same results with base function', function() {
			it('should find a basic element', function() {
				const sanicResult = sanicFind(
					resultArray,
					function(e) {
						return e === this.i;
					},
					{ i: 1 },
				);
				const nativeResult = resultArray.find(
					function(e) {
						return e === this.i;
					},
					{ i: 1 },
				);

				expect(sanicResult).to.be.eql(nativeResult);
			});

			it('should not find an inexisting element', function() {
				const sanicResult = sanicFind(
					resultArray,
					function(e) {
						return e === this.i;
					},
					{ i: 2 },
				);
				const nativeResult = resultArray.find(
					function(e) {
						e === this.i;
					},
					{ i: 2 },
				);

				expect(sanicResult).to.be.eql(nativeResult);
			});
		});

		describe('should find same results with fat-arrow', function() {
			it('should find a basic element', function() {
				const sanicResult = sanicFind(resultArray, (e) => e === this.i, { i: 1 });
				const nativeResult = resultArray.find((e) => e === this.i, { i: 1 });

				expect(sanicResult).to.be.eql(nativeResult);
			});

			it('should not find an inexisting element', function() {
				const sanicResult = sanicFind(resultArray, (e) => e === this.i, { i: 2 });
				const nativeResult = resultArray.find((e) => e === this.i, { i: 2 });

				expect(sanicResult).to.be.eql(nativeResult);
			});
		});
	});
};
