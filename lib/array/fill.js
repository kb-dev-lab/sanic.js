'use strict';

/* ECMA Reference
 * http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.fill
 */

/**
 * @param {Array} array - array
 * @param {any} value
 * @param {Number} start
 * @param {Number} end
 * @return the computed array
 */
module.exports = function fillClosure(nativeFill) {
    return function fill(array, value, start, end) {
        if (!array) {
            return;
        }

        if (!Array.isArray(array)) {
            return nativeFill.call(...arguments);
        }

        let i = 0, iMax = array.length;

        if (start) {
            if (start >= 0) {
                i = start > array.length ? array.length : start;
            } else {
                i = array.length + start > 0 ? array.length + start : 0;
            }
        }

        if (end) {
            if (end >= 0) {
                iMax = end > array.length ? array.length : end;
            } else {
                iMax = array.length + end > 0 ? array.length + end : 0;
            }
        }

        for (; i < iMax; i++) {
            array[i] = value;
        }

        return array;
    };
};
