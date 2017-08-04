'use strict';

const mocha = require('mocha');

const Classes = {
    Array: require('./array')
};

const ALL = 'all';

let onlySpecificTest = false;
const testsToDo = {};


if (process.argv.length > 3) {
    onlySpecificTest = true;

    for (let i = 3, iMax = process.argv.length; i < iMax; i++) {
        const [className, methodName] = process.argv[i].split('.');

        if (!testsToDo[className]) {
            testsToDo[className] = {
                all: false,
                methods: []
            };
        }

        if (methodName === ALL) {
            testsToDo[className].all = true;
        } else {
            testsToDo[className].methods.push(methodName);
        }
    }
}

Object.keys(Classes).forEach((className) => {
    if (onlySpecificTest && !testsToDo[className]) {
        return;
    }

    const classMethods = Classes[className];

    Object.keys(classMethods).forEach((methodName) => {
        if (onlySpecificTest && !testsToDo[className].all &&
            !testsToDo[className].methods.some(
                (name) => name === methodName)) {
            return;
        }

        describe(`${className}.${methodName}()`, function () {
            Classes[className][methodName]();
        });
    });
});

describe('changeMyWorld(): check activation and fallback', function() {
    it('should enable sanic functions in prototype', function() {
        require('../index').changeMyWorld();
    });

    it('should not crash when array is not an array', function() {
        [].map.call({}, (e) => e * e);
    });
});