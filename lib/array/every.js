'use strict';

/* ECMA Reference
 * http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.every
 */

/**
 * @param {Array} array - array
 * @param {Function} fn - function to execute 
       (accumulator, element, index, array) => any
 * @param {any} thisArg - context to pass to function
 * @return the computed array
 */
module.exports = function everyClosure(nativeEvery) {
	return function every(array, fn, thisArg) {
		if (!array) {
			return;
		}

		if (!Array.isArray(array)) {
			return nativeEvery.call(...arguments);
		}
		if (typeof fn !== 'function') {
			throw new TypeError();
		}

		const functionToCall = thisArg === undefined ? fn : fn.bind(thisArg);

		for (let i = 0; i < array.length; i++) {
			if (!functionToCall(array[i], i, array)) {
				return false;
			}
		}

		return true;
	};
};
