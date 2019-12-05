var addon = require('bindings')('sanicjs');

const array = [0, 1];

const res = addon.filter(
	array,
	function(e) {
		return e !== this.n;
	},
	{ n: 0 },
);

console.log(res);
