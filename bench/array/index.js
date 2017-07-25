'use strict';

module.exports = {
    every: require('./every'),
    filter: require('./filter'),
    find: process.env.EXPERIMENTAL ? require('./find') : undefined,
    forEach: require('./forEach'),
    indexOf: process.env.EXPERIMENTAL ? require('./indexOf') : undefined,
    lastIndexOf: process.env.EXPERIMENTAL ? require('./lastIndexOf') : undefined,
    map: require('./map'),
    reduce: require('./reduce'),
    some: require('./some')
};