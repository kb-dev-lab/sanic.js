'use strict';

const expect = require('chai').expect;
const sanicFilter = require('../../index').Library.Array.filter;

const baseArray = (new Array(10000)).fill(0).map((e, i) => i);
const evenArray = (new Array(10000)).fill(0).map((e, i) => i * 2);
const emptyArray = [];

function even(e) {
    return e % 2 === 0;
}

function underThreshold(e) {
    return e < this.threshold;
}

const underThresholdContext = {
    threshold: 10
};

module.exports = function () {
    describe('Base behaviours', function () {
        it('should need an array', function () {
            expect(() => sanicFilter()).to.throw('array is not an Array');
        });

        it('should need a function', function () {
            expect(() => sanicFilter(emptyArray)).to.throw();
            expect(() => sanicFilter(emptyArray, [])).to.throw();
            expect(() => sanicFilter(emptyArray, '')).to.throw();
            expect(() => sanicFilter(emptyArray, null)).to.throw();
        });

        it('should return empty array with empty input', function () {
            const nativeResult = emptyArray.filter(even);
            const sanicResult = sanicFilter(emptyArray, even);

            expect(nativeResult.length).to.be.eql(sanicResult.length);
            expect(sanicResult.length).to.be.eql(0);
        });
    });

    describe('Even function', function () {
        it('should return the same result than Array.prototype.filter()', function () {
            let nativeResult = baseArray.filter(even);
            let sanicResult = sanicFilter(baseArray, even);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            for (let i = 0, iMax = nativeResult.length; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }

            nativeResult = evenArray.filter(even);
            sanicResult = sanicFilter(evenArray, even);

            expect(nativeResult.length).to.be.eql(sanicResult.length);
            expect(sanicResult.length).to.be.eql(evenArray.length);

            for (let i = 0, iMax = nativeResult.length; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });
    });

    describe('Under threshold function (with special context)', function () {
        it('should return the same result than Array.prototype.filter()', function () {
            let nativeResult = baseArray.filter(underThreshold, underThresholdContext);
            let sanicResult = sanicFilter(baseArray, underThreshold, underThresholdContext);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            for (let i = 0, iMax = nativeResult.length; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });
    });
};