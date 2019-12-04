'use strict';

/* ECMA Reference
 * http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.reduce
 */

/**
 * @param {Array} array - array
 * @param {Function} fn - function to execute 
       (accumulator, element, index, array) => any
 * @param {any} initialValue - initial value of accumulator
 * @return the computed array
 */
module.exports = function reduceClosure(nativeReduce) {
	return function reduce(array, fn, initialValue) {
		if (!array) {
			return;
		}

		if (!Array.isArray(array)) {
			return nativeReduce.call(...arguments);
		}
		if (array.length === 0) {
			throw new TypeError('Reduce of empty array with no initial value');
		}
		if (typeof fn !== 'function') {
			throw new TypeError();
		}

		let accumulator = initialValue === undefined ? array[0] : initialValue;

		for (let i = 0; i < array.length; i++) {
			accumulator = fn(accumulator, array[i], i, array);
		}

		return accumulator;
	};
};
