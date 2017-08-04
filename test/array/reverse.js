'use strict';

const expect = require('chai').expect;
const sanicReverse = require('../../index').Library.Array.reverse;

const baseArray = (new Array(10000)).fill(0).map((e, i) => i);
const emptyArray = [];

module.exports = function () {
    describe('Base behaviours', function () {
        it('should do nothing if there\'s no array', function () {
            expect(sanicReverse()).to.be.undefined;
        });

        it('should return empty array with empty array input', function () {
            const sanicResult = sanicReverse(emptyArray);

            expect(sanicResult.length).to.be.eql(0);
        });

        it ('should call native reverse if array is not an array', function() {
            expect(() => sanicReverse({})).to.not.throw();
        });
    });

    describe('Constant function', function () {
        it('should return the same result than Array.prototype.reverse()', function () {
            const nativeResult = baseArray.reverse();
            const sanicResult = sanicReverse(baseArray);

            expect(nativeResult.length).to.be.eql(sanicResult.length);

            for (let i = 0, iMax = nativeResult; i < iMax; i++) {
                expect(nativeResult[i]).to.be.eql(sanicResult[i]);
            }
        });
    });
};