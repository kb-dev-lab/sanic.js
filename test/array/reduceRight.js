'use strict';

const expect = require('chai').expect;
const sanicReduceRight = require('../../index').Library.Array.reduceRight;

const baseArray = (new Array(10000)).fill(0).map((e, i) => i);
const evenArray = (new Array(10000)).fill(0).map((e, i) => i * 2);
const emptyArray = [];

function sum(acc, e) {
    return acc + e;
}

function sumUnderThreshold(acc, e) {
    return e < this.threshold;
}

const sumUnderThresholdContext = {
    threshold: 10
};

module.exports = function () {
    describe('Base behaviours', function () {
        it('should do nothing if there\'s no array', function () {
            expect(sanicReduceRight()).to.be.undefined;
        });

        it('should need a function', function () {
            expect(() => sanicReduceRight(emptyArray)).to.throw();
            expect(() => sanicReduceRight(emptyArray, [])).to.throw();
            expect(() => sanicReduceRight(emptyArray, '')).to.throw();
            expect(() => sanicReduceRight(emptyArray, null)).to.throw();
        });

        it('should throw an error with empty array and no initial value', function () {
            expect(() => sanicReduceRight(emptyArray, sum)).to.throw('Reduce of empty array with no initial value')
        });

        it('should return initial value if array is empty', function(){
            const nativeResult = emptyArray.reduce(sum, 100);
            const sanicResult = sanicReduceRight(emptyArray, sum, 100);

            expect(nativeResult).to.be.eql(sanicResult);
            expect(sanicResult).to.be.eql(100);
        });

        it ('should call native reduce if array is not an array', function() {
            expect(() => sanicReduceRight({}, (acc, e) => e + acc, 0)).to.not.throw();

            const strTest = 'Hello World';
            const fnTest = (acc, e) => acc + e.charCodeAt(0);

            const nativeResult = Array.prototype.reduceRight.call(strTest, fnTest, 0);
            const sanicResult = sanicReduceRight(strTest, fnTest, 0);

            expect(nativeResult).to.be.equal(sanicResult);
        });
    });

    describe('Sum function', function () {
        it('should return the same result than Array.prototype.reduce()', function () {
            let nativeResult = baseArray.reduceRight(sum);
            let sanicResult = sanicReduceRight(baseArray, sum);

            expect(nativeResult).to.be.eql(sanicResult);

            nativeResult = evenArray.reduceRight(sum);
            sanicResult = sanicReduceRight(evenArray, sum);

            expect(nativeResult).to.be.eql(sanicResult);

            nativeResult = evenArray.reduceRight(sum, -100);
            sanicResult = sanicReduceRight(evenArray, sum, -100);

            expect(nativeResult).to.be.eql(sanicResult);
        });
    });
};