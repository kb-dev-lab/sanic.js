'use strict';

/* ECMA Reference
 * http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.reduce-right
 */

/**
 * @param {Array} array - array
 * @param {Function} fn - function to execute 
       (accumulator, element, index, array) => any
 * @param {any} initialValue - initial value of accumulator
 * @return the computed array
 */
module.exports = function reduceRightClosure(nativeReduceRight) {
    return function reduceRight(array, fn, initialValue) {
        if (!array){
            return;
        }
        
        if (!(array instanceof Array)) {
            return nativeReduceRight.call(...arguments);
        }
        if (typeof fn !== 'function') {
            throw new TypeError();
        }

        let i = array.length - 1;
        let accumulator = initialValue;
                
        if (initialValue === undefined) {
            if (!array.length) {
                throw new TypeError('Reduce of empty array with no initial value');
            }

            accumulator = array[i];
            i--;
        }

        for (; i >= 0; i--) {
            accumulator = fn(accumulator, array[i], i, this);
        }

        return accumulator;
    };
};