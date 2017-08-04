'use strict';

/* ECMA Reference
 * http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.foreach
 */

/**
 * @param {Array} array - array
 * @param {Function} fn - function to execute 
       (element, index, array) => any
 * @param {Object} thisArg - context to pass to function
 * @return the computed array
 */
module.exports = function forEachClosure(nativeForEach) {
    return function forEach(array, fn, thisArg) {
        if (!array) {
            return;
        }

        if (!(array instanceof Array)) {
            return nativeForEach.call(...arguments);
        }
        if (typeof fn !== 'function') {
            throw new TypeError();
        }

        let functionToCall = fn;

        if (thisArg !== undefined) {
            functionToCall = function (element, index, array) {
                return fn.call(thisArg, element, index, array);
            };
        }

        let i = 0;
        const iMax = array.length;

        for (; i < iMax; i++) {
            functionToCall(array[i], i, array);
        }
    };
};