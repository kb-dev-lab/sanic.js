'use strict';

module.exports = {
    every: require('./every'),
    filter: require('./filter'),
    forEach: require('./forEach'),
    indexOf: process.env.EXPERIMENTAL ? require('./indexOf') : undefined,
    lastIndexOf: process.env.EXPERIMENTAL ? require('./lastIndexOf') : undefined,
    map: require('./map'),
    reduce: require('./reduce'),
    some: require('./some')
};