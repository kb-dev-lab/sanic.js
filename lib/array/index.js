'use strict';

module.exports = {
	constructor: Array,

	prototypeFunctions: {
		fill: require('./fill')(Array.prototype.fill),
		map: require('./map')(Array.prototype.map),
		reverse: require('./reverse')(Array.prototype.reverse),
	},
};
