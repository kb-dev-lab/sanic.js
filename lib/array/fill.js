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
        if (!array){
            return;
        }

        if (!(array instanceof Array)) {
            return nativeFill.call(...arguments);
        }

        if (!array.length) {
            return array;
        }

        let i = 0, iMax = array.length;

        if (start && start >= 0) {
            i = start > array.length ? array.length : start;
        } else if (start) {
            i = array.length + start > 0 ? array.length + start : 0;
        }

        if (end && end >= 0) {
            iMax = end > array.length ? array.length : end;
        } else if (end) {
            iMax = array.length + end > 0 ? array.length + end : 0;
        }

        for (; i < iMax; i++) {
            array[i] = value;
        }

        return array;
    };
};