'use strict';

const sanicClone = require('../../index').Library.Object.clone;

/* Complete iterative version
 *
 *	for (; i < iMax; i++) {
		const key = keys[i];
		if (i === iMax - 1) {
			// If there's no previous key, so we reach the end of the clone
			if (previous.length) {
				// Get previous key entry and restore it
				const prev = previous.pop();

				i = prev.i;
				iMax = prev.iMax;
				keys = prev.keys;
				currentAcc = prev.currentAcc;
				current = prev.current;
			}
		} else if (current[key] instanceof Date) {
			currentAcc[key] = new Date(current[key].getTime());
		} else if (Array.isArray(current[key])) {
			currentAcc[key] = [];

			previous.push({ i, iMax, keys, currentAcc, current });
			current = current[key];
			currentAcc = currentAcc[key];
			i = -1; // -1 caused by the incrementation at the end of cycle
			keys = [];

			let j = 0;
			const jMax = current.length;
			for (; j < jMax; j++) {
				keys.push(j);
			}

			iMax = keys.length + 1;
		} else if (typeof current[key] === OBJECT_TYPE) {
			// When we found an object, create a new object in clone,
			// save old key state and treat the new object to clone
			currentAcc[key] = {};

			previous.push({ i, iMax, keys, currentAcc, current });
			current = current[key];
			currentAcc = currentAcc[key];
			i = -1; // -1 caused by the incrementation at the end of loop
			keys = Object.keys(current);
			iMax = keys.length + 1;
		} else {
			currentAcc[key] = current[key];
		}
	}
 * 
 */

function generateObject(nbKeys, deepLevel, currentDeepLevel = 1) {
	let i = 0,
		iMax = nbKeys;
	const result = {};

	for (; i < iMax; i++) {
		if (currentDeepLevel !== deepLevel) {
			result[i] = generateObject(nbKeys, deepLevel, currentDeepLevel + 1);
		} else {
			result[i] = 1;
		}
	}

	return result;
}

function cloneRec(o) {
	if (Array.isArray(o)) {
		const acc = [];

		for (let i = 0, iMax = o.length; i < iMax; i++) {
			acc.push(cloneRec(o[i]));
		}

		return acc;
	} else if (typeof o === 'object') {
		return Object.keys(o).reduce((acc, key) => {
			acc[key] = cloneRec(o[key]);

			return acc;
		}, {});
	}

	return o;
}

function cloneRec2(o) {
	if (Array.isArray(o)) {
		const acc = [];

		for (let i = 0, iMax = o.length; i < iMax; i++) {
			acc.push(cloneRec(o[i]));
		}

		return acc;
	} else if (o instanceof Date) {
		return new Date(o.getTime());
	} else if (typeof o === 'object') {
		const keys = Object.keys(o);
		const acc = {};

		for (let i = 0, iMax = keys.length; i < iMax; i++) {
			acc[keys[i]] = cloneRec(o[keys[i]]);
		}

		return acc;
	}

	return o;
}

function cloneRec2(o) {
	if (Array.isArray(o)) {
		const acc = [];

		let i = 0;
		const iMax = o.length;

		for (; i < iMax; i++) {
			acc.push(cloneRec(o[i]));
		}

		return acc;
	} else if (typeof o === 'object') {
		const keys = Object.keys(o);
		const acc = {};

		let i = 0;
		const iMax = keys.length;

		for (; i < iMax; i++) {
			acc[keys[i]] = cloneRec(o[keys[i]]);
		}

		return acc;
	}

	return o;
}

function cloneRec3(o) {
	if (Array.isArray(o)) {
		const acc = [];

		for (let i = 0, iMax = o.length; i < iMax; i++) {
			acc.push(cloneRec(o[i]));
		}

		return acc;
	} else if (typeof o === 'object') {
		const acc = {};

		for (const key in o) {
			if (o.hasOwnProperty(key)) acc[key] = cloneRec(o[key]);
		}

		return acc;
	}

	return o;
}

function cloneArray(o) {
	const acc = [];

	let i = 0;
	const iMax = o.length;

	for (; i < iMax; i++) {
		acc.push(cloneRec4(o[i]));
	}

	return acc;
}

function cloneObject(o) {
	const keys = Object.keys(o);
	const acc = {};

	let i = 0;
	const iMax = keys.length;

	for (; i < iMax; i++) {
		acc[keys[i]] = cloneRec(o[keys[i]]);
	}

	return acc;
}

function cloneRec4(o) {
	if (Array.isArray(o)) {
		return cloneArray(o);
	} else if (typeof o === 'object') {
		return cloneObject(o);
	}

	return o;
}

function cloneRec5(o) {
	if (Array.isArray(o)) {
		const acc = [];

		let i = 0;
		const iMax = o.length;

		for (; i < iMax; i++) {
			acc.push(cloneRec(o[i]));
		}

		return acc;
	} else if (typeof o === 'object') {
		const keys = Object.keys(o);
		const acc = {};

		let i = 0;
		const iMax = keys.length;

		for (; i < iMax; i++) {
			const k = keys[i];

			acc[k] = cloneRec(o[k]);
		}

		return acc;
	}

	return o;
}

function cloneJson(o) {
	return JSON.parse(JSON.stringify(o));
}

function cloneDifferent(o) {
	if (Array.isArray(o)) {
		const acc = [];

		let i = 0;
		const iMax = o.length;

		for (; i < iMax; i++) {
			acc.push(cloneRec(o[i]));
		}

		return acc;
	} else if (typeof o === 'object') {
		const keys = Object.keys(o);
		const acc = { ...o };

		let i = 0;
		const iMax = keys.length;

		for (; i < iMax; i++) {
			if (typeof o[keys[i]] === 'object') {
				acc[keys[i]] = cloneRec(o[keys[i]]);
			}
		}

		return acc;
	}

	return o;
}

// Not finished -> Need array and date duplication
function cloneIt2(o) {
	let keys = Object.keys(o);
	let current = o;
	const acc = {};
	let currentAcc = acc;

	let i = 0;
	let iMax = keys.length + 1;
	let previous = [];
	let activeKey = [];

	for (; i < iMax; i++) {
		if (i === iMax - 1) {
			if (!previous.length) {
				break;
			}

			const prev = previous.pop();
			activeKey.pop();

			i = prev.i;
			iMax = prev.iMax;
			keys = prev.keys;

			let j = 0;
			const jMax = activeKey.length;
			currentAcc = acc;
			current = o;

			for (; j < jMax; j++) {
				currentAcc = currentAcc[activeKey[j]];
				current = current[activeKey[j]];
			}
		} else if (typeof current[keys[i]] === 'object') {
			currentAcc[keys[i]] = {};

			previous.push({ i, iMax, keys });
			activeKey.push(keys[i]);
			current = current[keys[i]];
			currentAcc = currentAcc[keys[i]];
			i = -1;
			keys = Object.keys(current);
			iMax = keys.length + 1;
		} else {
			currentAcc[keys[i]] = current[keys[i]];
		}
	}

	return acc;
}

// Not finished -> Need array and date duplication
function cloneIt(o) {
	let keys = Object.keys(o);
	let current = o;
	const acc = {};
	let currentAcc = acc;

	let i = 0;
	let iMax = keys.length + 1;
	let previous = [];

	for (; i < iMax; i++) {
		if (i === iMax - 1) {
			if (previous.length) {
				const prev = previous.pop();

				i = prev.i;
				iMax = prev.iMax;
				keys = prev.keys;
				current = prev.current;
				currentAcc = prev.currentAcc;
			}
		} else if (typeof current[keys[i]] === 'object') {
			currentAcc[keys[i]] = {};

			previous.push({ i, iMax, keys, current, currentAcc });
			current = current[keys[i]];
			currentAcc = currentAcc[keys[i]];
			i = -1;
			keys = Object.keys(current);
			iMax = keys.length + 1;
		} else {
			currentAcc[keys[i]] = current[keys[i]];
		}
	}

	return acc;
}

module.exports = function(computeSuite, fileWriter, suiteOptions) {
	const little = generateObject(10, 1);
	const medium = generateObject(1000, 1);
	const big = generateObject(1000000, 1);
	const mediumComplex = generateObject(100, 2);
	const bigComplex = generateObject(200, 3);

	if (fileWriter) fileWriter.writeTableElement('Assign object with n elements');

	console.log(`\t10 keys`);
	computeSuite()
		.add('cloneJson() -> JSON.parse(JSON.stringify()) clone', function() {
			return cloneJson(little);
		})
		/*.add('cloneRec() -> Recursive Object.keys() clone', function() {
			return cloneRec(little);
		})
		.add('cloneRec2() -> Recursive optimized loop clone', function() {
			return cloneRec2(little);
		})
		.add('cloneRec3() -> Recursive hasOwnProperty clone', function() {
			return cloneRec3(little);
		})
		.add('cloneRec4() -> Recursive optimized loop in function clone', function() {
			return cloneRec4(little);
		})
		.add('cloneRec5() -> Recursive optimized loop with key saved clone', function() {
			return cloneRec5(little);
		})
		.add('cloneDifferent() -> Recursive clone by checking object keys', function() {
			return cloneDifferent(little);
		})
		.add('cloneIt() -> Iterative clone (yeah, iterative)', function() {
			return cloneIt(little);
		})*/
		.add('sanicClone()', function() {
			return sanicClone(medium);
		})
		.run(suiteOptions);

	console.log(`\t1k keys`);
	computeSuite()
		.add('cloneJson() -> JSON.parse(JSON.stringify()) clone', function() {
			return cloneJson(medium);
		})
		/*.add('cloneRec() -> Recursive Object.keys() clone', function() {
				return cloneRec(medium);
			})
			.add('cloneRec2() -> Recursive optimized loop clone', function() {
				return cloneRec2(medium);
			})
			.add('cloneRec3() -> Recursive hasOwnProperty clone', function() {
				return cloneRec3(medium);
			})
			.add('cloneRec4() -> Recursive optimized loop in function clone', function() {
				return cloneRec4(medium);
			})
			.add('cloneRec5() -> Recursive optimized loop with key saved clone', function() {
				return cloneRec5(medium);
			})
			.add('cloneDifferent() -> Recursive clone by checking object keys', function() {
				return cloneDifferent(medium);
			})
			.add('cloneIt() -> Iterative clone (yeah, iterative)', function() {
				return cloneIt(medium);
			})*/
		.add('sanicClone()', function() {
			return sanicClone(medium);
		})
		.run(suiteOptions);

	console.log(`\t1M keys`);
	computeSuite()
		.add('cloneJson() -> JSON.parse(JSON.stringify()) clone', function() {
			return cloneJson(big);
		})
		/*.add('cloneRec() -> Recursive Object.keys() clone', function() {
					return cloneRec(big);
				})
				.add('cloneRec2() -> Recursive optimized loop clone', function() {
					return cloneRec2(big);
				})
				.add('cloneRec3() -> Recursive hasOwnProperty clone', function() {
					return cloneRec3(big);
				})
				.add('cloneRec4() -> Recursive optimized loop in function clone', function() {
					return cloneRec4(big);
				})
				.add('cloneRec5() -> Recursive optimized loop with key saved clone', function() {
					return cloneRec5(big);
				})
				.add('cloneDifferent() -> Recursive clone by checking object keys', function() {
					return cloneDifferent(big);
				})
				.add('cloneIt() -> Iterative clone (yeah, iterative)', function() {
					return cloneIt(big);
				})*/
		.add('sanicClone()', function() {
			return sanicClone(big);
		})
		.run(suiteOptions);

	/*
	console.log(`\t"100 keys -> 100 keys -> 1 value" object`);
	computeSuite()
		.add('cloneJson() -> JSON.parse(JSON.stringify()) clone', function() {
			return cloneJson(mediumComplex);
		})
		/*.add('cloneRec() -> Recursive Object.keys() clone', function() {
			return cloneRec(mediumComplex);
		})
		.add('cloneRec2() -> Recursive optimized loop clone', function() {
			return cloneRec2(mediumComplex);
		})
		.add('cloneRec3() -> Recursive hasOwnProperty clone', function() {
			return cloneRec3(mediumComplex);
		})
		.add('cloneRec4() -> Recursive optimized loop in function clone', function() {
			return cloneRec4(mediumComplex);
		})
		.add('cloneRec5() -> Recursive optimized loop with key saved clone', function() {
			return cloneRec5(mediumComplex);
		})
		.add('cloneDifferent() -> Recursive clone by checking object keys', function() {
			return cloneDifferent(mediumComplex);
		})
		.add('cloneIt() -> Iterative clone (yeah, iterative)', function() {
			return cloneIt(mediumComplex);
		})
		.add('sanicClone()', function() {
			return sanicClone(mediumComplex);
		})
		.run(suiteOptions);*/

	/*
	console.log(`\t"200 keys -> 200 keys -> 200keys -> 1 value" object`);
	computeSuite()
		.add('cloneJson() -> JSON.parse(JSON.stringify()) clone', function() {
			return cloneJson(bigComplex);
		})
		.add('cloneRec() -> Recursive Object.keys() clone', function() {
				return cloneRec(bigComplex);
			})
			.add('cloneRec2() -> Recursive optimized loop clone', function() {
				return cloneRec2(bigComplex);
			})
			.add('cloneRec3() -> Recursive hasOwnProperty clone', function() {
				return cloneRec3(bigComplex);
			})
			.add('cloneRec4() -> Recursive optimized loop in function clone', function() {
				return cloneRec4(bigComplex);
			})
			.add('cloneRec5() -> Recursive optimized loop with key saved clone', function() {
				return cloneRec5(bigComplex);
			})
			.add('cloneDifferent() -> Recursive clone by checking object keys', function() {
				return cloneDifferent(bigComplex);
			})
			.add('cloneIt() -> Iterative clone (yeah, iterative)', function() {
				return cloneIt(bigComplex);
			})
		.add('sanicClone()', function() {
			return sanicClone(bigComplex);
		})
		.run(suiteOptions);*/
};
