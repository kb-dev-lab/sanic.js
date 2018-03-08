'use strict';

module.exports = {
	assign: process.env.EXPERIMENTAL ? require('./assign') : undefined,
};
