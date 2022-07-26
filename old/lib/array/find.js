'use strict';

/* ECMA Reference
 * http://www.ecma-international.org/ecma-262/8.0/#sec-array.prototype.find
 */

/**
 * @param {Array} array - array
 * @param {Function} predicate - function to execute 
       (element, index, array) => any
 * @param {any} thisArg - context to pass to function
 * @return the computed array
 */
module.exports = function findClosure(nativeFind) {
	return function find(array, predicate, thisArg) {
		if (!array) {
			return;
		}

		if (!Array.isArray(array)) {
			return nativeFind.call(...arguments);
		}
		if (typeof predicate !== 'function') {
			throw new TypeError();
		}

		let functionToCall = predicate;

		if (thisArg !== undefined) {
			functionToCall = predicate.bind(thisArg);
		}

		for (let i = 0; i < array.length; i++) {
			if (functionToCall(array[i], i, array)) {
				return array[i];
			}
		}

		return undefined;
	};
};
