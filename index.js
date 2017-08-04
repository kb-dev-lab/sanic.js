'use strict';

const library = require('./lib');

module.exports = {
    Library: library,
    changeMyWorld: () => {
        Object.keys(library).forEach((className) => {
            const libForClass = library[className];

            Object.keys(libForClass).forEach((methodName) => {
                if (methodName === 'constructor') {
                    return;
                }

                libForClass.constructor.prototype[methodName] =
                    function (...args) {
                        const trueArgsArray = [this, ...args];
                        return libForClass[methodName].apply(this, trueArgsArray);
                    };
            });
        });
    }
};