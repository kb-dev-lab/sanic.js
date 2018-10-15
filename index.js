'use strict';

const library = require('./lib');

function computeLibrary() {
	const flatLibrary = {};

	Object.keys(library).forEach((className) => {
		flatLibrary[className] = {};
		flatLibrary[className].constructor = library[className].constructor;

		Object.keys(library[className]).forEach((groupKey) => {
			if (groupKey === 'constructor') {
				return;
			}

			Object.keys(library[className][groupKey]).forEach((methodName) => {
				flatLibrary[className][methodName] = library[className][groupKey][methodName];
			});
		});
	});

	return flatLibrary;
}

function changeMyWorld() {
	Object.keys(library).forEach((className) => {
		const libForClass = library[className];
		const constructor = libForClass.constructor;

		if (libForClass.constructorFunctions) {
			Object.keys(libForClass.constructorFunctions).forEach((methodName) => {
				constructor[methodName] = libForClass.constructorFunctions[methodName];
			});
		}

		if (libForClass.prototypeFunctions) {
			Object.keys(libForClass.prototypeFunctions).forEach((methodName) => {
				constructor.prototype[methodName] = function(...args) {
					const trueArgsArray = [this, ...args];

					return libForClass.prototypeFunctions[methodName].apply(this, trueArgsArray);
				};
			});
		}
	});
}

module.exports = {
	Library: computeLibrary(),
	changeMyWorld,
};
