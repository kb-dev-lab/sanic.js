'use strict';

const expect = require('chai').expect;
const sanicFill = require('../../index').Library.Array.fill;

const nativeEmptyArray = [];
const sanicEmptyArray = [];
const nativeResultArray = new Array(10000);
const sanicResultArray = new Array(10000);

module.exports = function () {
    describe('Base behaviours', function () {
        it('should do nothing if there\'s no array', function () {
            expect(sanicFill()).to.be.undefined;
        });

        it('should do nothing with empty array', function () {
            const nativeResult = nativeEmptyArray.fill(0);
            const sanicResult = sanicFill(sanicEmptyArray, 0);

            expect(nativeResult).to.be.eql(sanicResult);
            expect(nativeEmptyArray.length).to.be.eql(sanicEmptyArray.length);
            expect(sanicResult.length).to.be.eql(0);
            expect(sanicEmptyArray.length).to.be.eql(0);
        });

        it('should return the array given in parameter', function () {
            const sanicResult = sanicFill(sanicResultArray, .5);

            expect(sanicResult.length).to.be.eql(sanicResultArray.length);

            let i = 0;
            const iMax = sanicResultArray.length;

            for (; i < iMax; i++) {
                expect(sanicResult[i]).to.be.eql(sanicResultArray[i]);
            }
        });

        it ('should call native fill if array is not an array', function() {
            expect(() => sanicFill({}, 4)).to.not.throw();

            const nativeObjTest = {length: 4};
            const sanicObjTest = {length: 4};

            const nativeResult = Array.prototype.fill.call(nativeObjTest, 1);
            const sanicResult = sanicFill(sanicObjTest, 1);

            expect(nativeResult.length).to.be.equal(sanicResult.length);
            
            let i = 0;
            const iMax = nativeResult.length;

            for (; i < iMax; i++){
                expect(nativeResult[i]).to.be.equal(sanicResult[i]);
            }
        });
    });

    describe('Basic fill', function () {
        before(function () {
            nativeResultArray.fill(undefined);
            sanicResultArray.fill(undefined);
        });

        it('should return the same result than Array.prototype.fill()', function () {
            const nativeResult = nativeResultArray.fill(1);
            const sanicResult = sanicFill(sanicResultArray, 1);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            let i = 0;
            const iMax = nativeResultArray.length;

            for (; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });
    });

    describe('Fill with start', function () {
        beforeEach(function () {
            nativeResultArray.fill(undefined);
            sanicResultArray.fill(undefined);
        });

        it('should return the same result than Array.prototype.fill() - positive start', function () {
            const nativeResult = nativeResultArray.fill(2, 4000);
            const sanicResult = sanicFill(sanicResultArray, 2, 4000);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            let i = 0;
            const iMax = nativeResultArray.length;

            for (; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });

        it('should return the same result than Array.prototype.fill() - negative start', function () {
            const nativeResult = nativeResultArray.fill(3, -4000);
            const sanicResult = sanicFill(sanicResultArray, 3, -4000);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            let i = 0;
            const iMax = nativeResultArray.length;

            for (; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });
    });

    describe('Fill with start and end', function () {
        beforeEach(function () {
            nativeResultArray.fill(undefined);
            sanicResultArray.fill(undefined);
        });

        it('should return the same result than Array.prototype.fill() - positive start and end', function () {
            const nativeResult = nativeResultArray.fill(4, 4000, 8000);
            const sanicResult = sanicFill(sanicResultArray, 4, 4000, 8000);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            let i = 0;
            const iMax = nativeResultArray.length;

            for (; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });

        it('should return the same result than Array.prototype.fill() - negative start and positive end', function () {
            const nativeResult = nativeResultArray.fill(5, -4000, 8000);
            const sanicResult = sanicFill(sanicResultArray, 5, -4000, 8000);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            let i = 0;
            const iMax = nativeResultArray.length;

            for (; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });

        it('should return the same result than Array.prototype.fill() - positive start and negative end', function () {
            const nativeResult = nativeResultArray.fill(6, 4000, -1000);
            const sanicResult = sanicFill(sanicResultArray, 6, 4000, -1000);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            let i = 0;
            const iMax = nativeResultArray.length;

            for (; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });

        it('should return the same result than Array.prototype.fill() - negative start and end', function () {
            const nativeResult = nativeResultArray.fill(7, -4000, -1000);
            const sanicResult = sanicFill(sanicResultArray, 7, -4000, -1000);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            let i = 0;
            const iMax = nativeResultArray.length;

            for (; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });
    });

    describe('Fill with inexisting start and end', function () {
        beforeEach(function () {
            nativeResultArray.fill(undefined);
            sanicResultArray.fill(undefined);
        });

        it('should return the same result than Array.prototype.fill() - start and end > array.length', function () {
            const nativeResult = nativeResultArray.fill(8, 15000, 20000);
            const sanicResult = sanicFill(sanicResultArray, 8, 15000, 20000);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            let i = 0;
            const iMax = nativeResultArray.length;

            for (; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });

        it('should return the same result than Array.prototype.fill() - start and end < -array.length', function () {
            const nativeResult = nativeResultArray.fill(9, -15000, -20000);
            const sanicResult = sanicFill(sanicResultArray, 9, -15000, -20000);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            let i = 0;
            const iMax = nativeResultArray.length;

            for (; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });

        it('should return the same result than Array.prototype.fill() - start < -array.length && end > array.length', function () {
            const nativeResult = nativeResultArray.fill(10, -15000, 20000);
            const sanicResult = sanicFill(sanicResultArray, 10, -15000, 20000);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            let i = 0;
            const iMax = nativeResultArray.length;

            for (; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });

        it('should return the same result than Array.prototype.fill() - start > array.length && end < -array.length', function () {
            const nativeResult = nativeResultArray.fill(11, 15000, -20000);
            const sanicResult = sanicFill(sanicResultArray, 11, 15000, -20000);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            let i = 0;
            const iMax = nativeResultArray.length;

            for (; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });
    });
};