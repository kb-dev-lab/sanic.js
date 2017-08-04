'use strict';

module.exports = {
    constructor: Array,
    every: require('./every')(Array.prototype.every),
    fill: require('./fill')(Array.prototype.fill),
    filter: require('./filter')(Array.prototype.filter),
    forEach: require('./forEach')(Array.prototype.forEach),
    map: require('./map')(Array.prototype.map),
    reduce: require('./reduce')(Array.prototype.reduce),
    reverse: require('./reverse')(Array.prototype.reverse),
    some: require('./some')(Array.prototype.some)
};
