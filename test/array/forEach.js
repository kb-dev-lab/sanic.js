'use strict';

const expect = require('chai').expect;
const sanicForEach = require('../../index').Library.Array.forEach;

const baseArray = (new Array(10000)).fill(0).map((e, i) => i);
const evenArray = (new Array(10000)).fill(0).map((e, i) => i * 2);
const emptyArray = [];

const countUnderThresholdContext = {
    threshold: 100
};

module.exports = function () {
    describe('Base behaviours', function () {
        it('should do nothing if there\'s no array', function () {
            expect(sanicForEach()).to.be.undefined;
        });

        it('should need a function', function () {
            expect(() => sanicForEach(emptyArray)).to.throw();
            expect(() => sanicForEach(emptyArray, [])).to.throw();
            expect(() => sanicForEach(emptyArray, '')).to.throw();
            expect(() => sanicForEach(emptyArray, null)).to.throw();
        });

        it('should not crash', function () {
            let nativeResult = 0;
            emptyArray.forEach((e) => {
                nativeResult += e;
            });

            let sanicResult = 0;
            sanicForEach(emptyArray, (e) => {
                sanicResult += e;
            });
        });

        it ('should call native forEach if array is not an array', function() {
            expect(() => sanicForEach({}, (e) => e*e)).to.not.throw();
        });
    });

    describe('Sum function', function () {
        it('should compute the same result than Array.prototype.forEach()', function () {
            let nativeResult = 0;
            baseArray.forEach((e) => {
                nativeResult += e;
            });

            let sanicResult = 0;
            sanicForEach(baseArray, (e) => {
                sanicResult += e;
            });

            expect(nativeResult).to.be.eql(sanicResult);
        });
    });

    describe('Count under threshold function (with special context)', function () {
        it('should compute the same result than Array.prototype.forEach()', function () {
            let nativeResult = 0;
            baseArray.forEach((e) => {
                nativeResult += e < this.threshold ? 1 : 0;
            }, countUnderThresholdContext);

            let sanicResult = 0;
            sanicForEach(baseArray, (e) => {
                sanicResult += e < this.threshold ? 1 : 0;
            }, countUnderThresholdContext);

            expect(nativeResult).to.be.eql(sanicResult);
        });
    });
};