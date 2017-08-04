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
        it('should do nothing if there\'s no array', function () {
            expect(sanicSome()).to.be.undefined;
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

        it ('should call native some if array is not an array', function() {
            expect(() => sanicSome({}, (e) => e === 0)).to.not.throw();

            const strTest = 'Hello World';
            const fnTest = (e) => e.charCodeAt(0) === 32;

            const nativeResult = Array.prototype.some.call(strTest, fnTest);
            const sanicResult = sanicSome(strTest, fnTest);

            expect(nativeResult).to.be.equal(sanicResult);
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