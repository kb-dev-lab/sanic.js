'use strict';

/* ECMA Reference
 * http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.reverse
 */

/**
 * @param {Array} array - array
 * @return the reversed array
 */
module.exports = function reverseClosure(nativeReverse) {
    return function reverse(array) {
        if (!array) {
            return;
        }

        if (!(array instanceof Array)) {
            return nativeReverse.call(...arguments);
        }

        let i = 0, tmp = null;
        const iMax = Math.floor(array.length / 2);

        for (; i < iMax; i++) {
            tmp = array[i];
            array[i] = array[array.length - i - 1];
            array[array.length - i - 1] = tmp;
        }

        return array;
    };
};