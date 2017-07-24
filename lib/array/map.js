'use strict';

/* ECMA Reference
 * http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.map
 */

/**
 * @param {Array} array - array
 * @param {Function} fn - function to execute 
       (element, index, array) => any
 * @param {Object} thisArg - context to pass to function
 * @return the computed array
 */
module.exports = function map(array, fn, thisArg) {
    if (!(array instanceof Array)) {
        throw new TypeError('array is not an Array');
    }
    if (typeof fn !== 'function') {
        throw new TypeError();
    }

    const aRes = [];
    let functionToCall = fn;

    if (thisArg !== undefined) {
        functionToCall = function (element, index, array) {
            return fn.call(thisArg, element, index, array);
        };
    }

    for (let i = 0, iMax = array.length; i < iMax; i++) {
        aRes[i] = functionToCall(array[i], i, array);
    }

    return aRes;
};