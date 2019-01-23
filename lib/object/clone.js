'use strict';

/* No ECMA Reference */

const OBJECT_TYPE = 'object';

/**
 * @param {Object} object - source to clone
 * @return the cloned source
 */
module.exports = function clone(source) {
	if (source === null || source === undefined) {
		return source;
	}

	if (Array.isArray(source)) {
		const acc = [];

		for (let i = 0, iMax = source.length; i < iMax; i++) {
			acc.push(clone(source[i]));
		}

		return acc;
	} else if (source instanceof Date) {
		return new Date(source.getTime());
	} else if (typeof source === OBJECT_TYPE) {
		const newObj = {};
		const keys = Object.keys(source);

		for (let i = 0, iMax = keys.length; i < iMax; i++) {
			newObj[keys[i]] = clone(source[keys[i]]);
		}

		return newObj;
	}

	return source;
};
