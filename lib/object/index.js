'use strict';

module.exports = {
	constructor: Object,

	constructorFunctions: {
		assign: require('./assign')(Object.assign),
		clone: require('./clone'),
	},
};
