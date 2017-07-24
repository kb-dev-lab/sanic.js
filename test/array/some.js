'use strict';

const expect = require('chai').expect;
const sanicSome = require('../../index').Library.Array.some;

const baseArray = (new Array(10000)).fill(0).map((e, i) => i);
const oddArray = (new Array(10000)).fill(0).map((e, i) => i * 2 + 1);
const emptyArray = [];

function even(e) {
    return e % 2 === 0;
}

function underThreshold(e) {
    return e < this.threshold;
}

const underThresholdTrueContext = {
    threshold: 10
};

const underThresholdFalseContext = {
    threshold: -1
};

module.exports = function () {
    describe('Base behaviours', function () {
        it('should need an array', function () {
            expect(() => sanicSome()).to.throw('array is not an Array');
        });

        it('should need a function', function () {
            expect(() => sanicSome(emptyArray)).to.throw();
            expect(() => sanicSome(emptyArray, [])).to.throw();
            expect(() => sanicSome(emptyArray, '')).to.throw();
            expect(() => sanicSome(emptyArray, null)).to.throw();
        });

        it('should return false with empty input', function () {
            const nativeResult = emptyArray.some(even);
            const sanicResult = sanicSome(emptyArray, even);

            expect(nativeResult).to.be.eql(sanicResult);
            expect(sanicResult).to.be.false;
        });
    });

    describe('Even function', function () {
        it('should return the same result than Array.prototype.some()', function () {
            let nativeResult = baseArray.some(even);
            let sanicResult = sanicSome(baseArray, even);

            expect(nativeResult).to.be.eql(sanicResult);
            expect(sanicResult).to.be.true;

            nativeResult = oddArray.some(even);
            sanicResult = sanicSome(oddArray, even);

            expect(nativeResult).to.be.eql(sanicResult);
            expect(sanicResult).to.be.false;
        });
    });

    describe('Under threshold function (with special context)', function () {
        it('should return the same result than Array.prototype.some()', function () {
            let nativeResult = baseArray.some(underThreshold, underThresholdTrueContext);
            let sanicResult = sanicSome(baseArray, underThreshold, underThresholdTrueContext);

            expect(nativeResult).to.be.eql(sanicResult);
            expect(sanicResult).to.be.true;

            nativeResult = baseArray.some(underThreshold, underThresholdFalseContext);
            sanicResult = sanicSome(baseArray, underThreshold, underThresholdFalseContext);

            expect(nativeResult).to.be.eql(sanicResult);
            expect(sanicResult).to.be.false;
        });
    });
};