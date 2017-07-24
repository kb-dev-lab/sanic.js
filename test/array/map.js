'use strict';

const expect = require('chai').expect;
const sanicMap = require('../../index').Library.Array.map;

const baseArray = (new Array(10000)).fill(0).map((e, i) => i);
const emptyArray = [];

function squareFunction(e) {
    return e * e;
}

function constantFunction(){
    return 1;
}

function constantSum(e) {
    return e + this.numberToAdd;
}

const constantSumContext = {
    numberToAdd: 10
};

module.exports = function () {
    describe('Base behaviours', function () {
        it('should need an array', function () {
            expect(() => sanicMap()).to.throw('array is not an Array');
        });

        it('should need a function', function () {
            expect(() => sanicMap(emptyArray)).to.throw();
            expect(() => sanicMap(emptyArray, [])).to.throw();
            expect(() => sanicMap(emptyArray, '')).to.throw();
            expect(() => sanicMap(emptyArray, null)).to.throw();
        });

        it('should return empty array with empty array input', function () {
            const sanicResult = sanicMap(emptyArray, squareFunction);

            expect(sanicResult.length).to.be.eql(0);
        });
    });

    describe('Constant function', function () {
        it('should return the same result than Array.prototype.map()', function () {
            const nativeResult = baseArray.map(constantFunction);
            const sanicResult = sanicMap(baseArray, constantFunction);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            for (let i = 0, iMax = nativeResult; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });
    });

    describe('Square function', function () {
        it('should return the same result than Array.prototype.map()', function () {
            const nativeResult = baseArray.map(squareFunction);
            const sanicResult = sanicMap(baseArray, squareFunction);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            for (let i = 0, iMax = nativeResult; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });
    });

    describe('Constant sum function (with special context)', function () {
        it('should return the same result than Array.prototype.map()', function () {
            const nativeResult = baseArray.map(constantSum, constantSumContext);
            const sanicResult = sanicMap(baseArray, constantSum, constantSumContext);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            for (let i = 0, iMax = nativeResult; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });
    });
};