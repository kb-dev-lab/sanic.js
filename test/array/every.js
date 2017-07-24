'use strict';

const expect = require('chai').expect;
const sanicEvery = require('../../index').Library.Array.every;

const baseArray = (new Array(10000)).fill(0).map((e, i) => i);
const evenArray = (new Array(10000)).fill(0).map((e, i) => i * 2);
const emptyArray = [];

function even(e) {
    return e % 2 === 0;
}

function underThreshold(e) {
    return e < this.threshold;
}

const underThresholdFalseContext = {
    threshold: 10
};

const underThresholdTrueContext = {
    threshold: 1000000
};

module.exports = function () {
    describe('Base behaviours', function () {
        it('should need an array', function () {
            expect(() => sanicEvery()).to.throw('array is not an Array');
        });

        it('should need a function', function () {
            expect(() => sanicEvery(emptyArray)).to.throw();
            expect(() => sanicEvery(emptyArray, [])).to.throw();
            expect(() => sanicEvery(emptyArray, '')).to.throw();
            expect(() => sanicEvery(emptyArray, null)).to.throw();
        });

        it('should return true with empty input', function () {
            const nativeResult = emptyArray.every(even);
            const sanicResult = sanicEvery(emptyArray, even);

            expect(nativeResult).to.be.eql(sanicResult);
            expect(sanicResult).to.be.true;
        });
    });

    describe('Even function', function () {
        it('should return the same result than Array.prototype.every()', function () {
            let nativeResult = baseArray.every(even);
            let sanicResult = sanicEvery(baseArray, even);

            expect(nativeResult).to.be.eql(sanicResult);
            expect(sanicResult).to.be.false;

            nativeResult = evenArray.every(even);
            sanicResult = sanicEvery(evenArray, even);

            expect(nativeResult).to.be.eql(sanicResult);
            expect(sanicResult).to.be.true;
        });
    });

    describe('Under threshold function (with special context)', function () {
        it('should return the same result than Array.prototype.every()', function () {
            let nativeResult = baseArray.every(underThreshold, underThresholdFalseContext);
            let sanicResult = sanicEvery(baseArray, underThreshold, underThresholdFalseContext);

            expect(nativeResult).to.be.eql(sanicResult);
            expect(sanicResult).to.be.false;

            nativeResult = baseArray.every(underThreshold, underThresholdTrueContext);
            sanicResult = sanicEvery(baseArray, underThreshold, underThresholdTrueContext);

            expect(nativeResult).to.be.eql(sanicResult);
            expect(sanicResult).to.be.true;
        });
    });
};