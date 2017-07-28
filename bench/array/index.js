'use strict';

module.exports = {
    every: require('./every'),
    filter: require('./filter'),
    find: process.env.EXPERIMENTAL ? require('./find') : undefined,
    forEach: require('./forEach'),
    indexOf: process.env.EXPERIMENTAL ? require('./indexOf') : undefined,
    join: process.env.EXPERIMENTAL ? require('./join') : undefined,    
    lastIndexOf: process.env.EXPERIMENTAL ? require('./lastIndexOf') : undefined,
    map: require('./map'),
    reduce: require('./reduce'),
    reverse: require('./reverse'),    
    shift: process.env.EXPERIMENTAL ? require('./shift') : undefined,
    some: require('./some')
};