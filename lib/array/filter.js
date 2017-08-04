'use strict';

/* ECMA Reference
 * http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.filter
 */

/**
 * @param {Array} array - array
 * @param {Function} fn - function to execute 
	   (element, index, array) => any
 * @param {Object} thisArg - context to pass to function
 * @return the computed array
 */
module.exports = function filterClosure(nativeFilter) {
	return function filter(array, fn, thisArg) {
		if (!array) {
			return;
		}

		if (!(array instanceof Array)) {
			return nativeFilter.call(...arguments);
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

		let i = 0;
		const iMax = array.length;

		for (; i < iMax; i++) {
			if (functionToCall(array[i], i, array)) {
				aRes.push(array[i]);
			}
		}

		return aRes;
	};
};