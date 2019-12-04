'use strict';

module.exports = {
    concat: process.env.EXPERIMENTAL ? require('./concat') : undefined,    
    every: require('./every'),
    filter: require('./filter'),
    fill: require('./fill'),    
    find: require('./find'),
    forEach: require('./forEach'),
    includes: process.env.EXPERIMENTAL ? require('./includes') : undefined,    
    indexOf: process.env.EXPERIMENTAL ? require('./indexOf') : undefined,
    join: process.env.EXPERIMENTAL ? require('./join') : undefined,    
    lastIndexOf: process.env.EXPERIMENTAL ? require('./lastIndexOf') : undefined,
    map: require('./map'),
    push: process.env.EXPERIMENTAL ? require('./push'): undefined,
    reduce: process.env.EXPERIMENTAL ? require('./reduce') : undefined,
    reduceRight: require('./reduceRight'),
    reverse: require('./reverse'),    
    shift: process.env.EXPERIMENTAL ? require('./shift') : undefined,
    some: require('./some'),
	unshift: process.env.EXPERIMENTAL ? require('./unshift') : undefined,    
};
