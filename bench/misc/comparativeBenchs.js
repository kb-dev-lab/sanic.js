'use strict';

const Sanic = require('../../index').Library;
const Fast = require('fast.js');
const _ = require('lodash');

const Benchmark = require('benchmark');
Benchmark.options.minSamples = 100;

const FIRST_QUARTER_VALUE = '1/4 Value';
const HALF_VALUE = '1/2 Value';
const LAST_QUARTER_VALUE = '3/4 Value';
const END = 'End Value';

const values = [FIRST_QUARTER_VALUE, HALF_VALUE, LAST_QUARTER_VALUE, END];
const elements = [10, 1000, 1000000];

let fileWriter = null;

if (process.argv.some((e) => e === "writeFile")) {
    const BenchFileCreator = require('../benchFileCreator');
    fileWriter = new BenchFileCreator();
    fileWriter.addInformations(Benchmark.options.minSamples);
    fileWriter.newSimpleLine();
}

const functions = {
    simple: {
        fill: {
            native: function (array) {
                array.fill(0);
            },
            sanic: function (array) {
                Sanic.Array.fill(array, 0);
            },
            fast: function (array) {
                Fast.fill(array, (e) => 0);
            },
            lodash: function (array) {
                _.fill(array, (e) => 0);
            }
        },
        filter: {
            native: function (array) {
                array.filter((e) => e === 1);
            },
            sanic: function (array) {
                Sanic.Array.filter(array, (e) => e === 1);
            },
            fast: function (array) {
                Fast.filter(array, (e) => e === 1);
            },
            lodash: function (array) {
                _.filter(array, (e) => e === 1);
            }
        },
        forEach: {
            native: function (array) {
                array.forEach((e) => {
                    e*e;
                });
            },
            sanic: function (array) {
                Sanic.Array.forEach(array, (e) => {
                    e*e;
                });
            },
            fast: function (array) {
                Fast.forEach(array, (e) => {
                    e*e;
                });
            },
            lodash: function (array) {
                _.forEach(array, (e) => {
                    e*e;
                });
            }
        },
        map: {
            native: function (array) {
                array.map((e) => e * e);
            },
            sanic: function (array) {
                Sanic.Array.map(array, (e) => e * e);
            },
            fast: function (array) {
                Fast.map(array, (e) => e * e);
            },
            lodash: function (array) {
                _.map(array, (e) => e * e);
            }
        },
        reduce: {
            native: function (array) {
                array.reduce((acc, e) => acc + e);
            },
            sanic: function (array) {
                Sanic.Array.reduce(array, (acc, e) => acc + e);
            },
            fast: function (array) {
                Fast.reduce(array, (acc, e) => acc + e);
            },
            lodash: function (array) {
                _.reduce(array, (acc, e) => acc + e);
            }
        },
        reverse: {
            native: function (array) {
                array.reverse();
            },
            sanic: function (array) {
                Sanic.Array.reverse(array);
            },
            lodash: function (array) {
                _.reverse(array);
            }
        }
    },
    complex: {
        every : {
            native: function (array) {
                array.every((e) => e === 0);
            },
            sanic: function (array) {
                Sanic.Array.every(array, (e) => e === 0);
            },
            fast: function (array) {
                Fast.every(array, (e) => e === 0);
            },
            lodash: function (array) {
                _.every(array, (e) => e === 0);
            }
        },
        some: {
            native: function (array) {
                array.some((e) => e === 1);
            },
            sanic: function (array) {
                Sanic.Array.some(array, (e) => e === 1);
            },
            fast: function (array) {
                Fast.some(array, (e) => e === 1);
            },
            lodash: function (array) {
                _.some(array, (e) => e === 1);
            }
        }
    }
}

function computeNumber(nb) {
    if (nb >= 1000000) {
        return `${Math.round(nb / 10000) / 100}m`;
    } else if (nb >= 1000) {
        return `${Math.round(nb / 10) / 100}k`;
    } else {
        return `${Math.round(nb * 100) / 100}`;
    }
}

function doSuite(libName, fn) {
    console.log(`## ${libName}`);

    if (fileWriter) {
        fileWriter.newLine();
        fileWriter.writeTableElement(libName);
    }

    const Suite = new Benchmark.Suite();
    const suite = Suite
        .on('cycle', function (event) {
            console.log(String(event.target));
            if (fileWriter) {
                fileWriter.writeTableElement(computeNumber(event.target.hz));
            }
        });

    const arrays = [];

    for (let i = 0; i < elements.length; i++) {
        arrays.push(new Array(elements[i]).fill(0).map((e, i) => i % 2));

        suite.add(`${elements.length}`, function () {
            fn(arrays[i]);
        });
    }

    suite.run({ async: false });
}

function getIndexForValue(value, length) {
    switch (value) {
        case END: return length - 1;
        case LAST_QUARTER_VALUE: return Math.round(length * 3 / 4);
        case HALF_VALUE: return Math.round(length / 2);
        case FIRST_QUARTER_VALUE: return Math.round(length / 4);
        default:
            return length;
    }
}

function addElementInArrayForValue(array, value) {
    array[getIndexForValue(value, array.length)] = 1;
}

function doComplexSuite(libName, fn) {
    const little = (new Array(10)).fill(0);
    const medium = (new Array(1000)).fill(0);
    const big = (new Array(1000000)).fill(0);

    console.log(`## ${libName}`);

    if (fileWriter) {
        fileWriter.newLine();
        fileWriter.writeTableElement(libName);
    }

    const Suite = new Benchmark.Suite();
    const suite = Suite
        .on('cycle', function (event) {
            console.log(String(event.target));
            if (fileWriter) {
                fileWriter.writeTableElement(computeNumber(event.target.hz));
            }
        });

    for (let i = 0; i < elements.length; i++) {
        for (let j = 0; j < values.length; j++) {
            const array = new Array(elements[i]).fill(0);

            addElementInArrayForValue(array, values[j]);

            suite.add(
                `${getIndexForValue(values[j], elements[i])}/${elements[i]}`,
                function () {
                    fn(array);
                });
        }
    }

    suite.run({ async: false });
}

Object.keys(functions.complex).forEach((fnName) => {
    if (fileWriter) {
        fileWriter.newSimpleLine();
        fileWriter.newSimpleLine();

        const headers = [fnName];

        for (let i = 0; i < elements.length; i++) {
            for (let j = 0; j < values.length; j++) {
                headers.push(
                    `${getIndexForValue(values[j], elements[i])}/${elements[i]}`
                );
            }
        }

        fileWriter.writeTableHeader(headers);
    }

    console.log(`# ${fnName}`);

    Object.keys(functions.complex[fnName]).forEach((libName) => {
        doComplexSuite(libName, functions.complex[fnName][libName]);
    });
});

Object.keys(functions.simple).forEach((fnName) => {
    if (fileWriter) {
        fileWriter.newSimpleLine();
        fileWriter.newSimpleLine();

        fileWriter.writeTableHeader(
            [fnName, ...elements]
        );
    }

    console.log(`# ${fnName}`);

    Object.keys(functions.simple[fnName]).forEach((libName) => {
        doSuite(libName, functions.simple[fnName][libName]);
    });
});