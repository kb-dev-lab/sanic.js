'use strict';

const Benchmark = require('benchmark');
Benchmark.options.minSamples = 200;

let fileWriter = null;

if (process.argv.some((e) => e === "writeFile")) {
    const BenchFileCreator = require('../benchFileCreator');
    fileWriter = new BenchFileCreator();
    fileWriter.addInformations(Benchmark.options.minSamples);
    fileWriter.writeTableHeader(['Elements', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']);
}

function computeNumber(nb) {
    if (nb > 1000000){
        return `${Math.round(nb / 10000)/100}m`;
    } else if (nb > 1000){
        return `${Math.round(nb / 10)/100}k`;
    } else {
        return `${Math.round(nb*100)/100}`;
    }
}

function simpleRecursiveIteration(array, i = 0){
    if (i < array.length) {
        array[i] * array[i];

        return simpleRecursiveIteration(array, i+1);
    }
}

function recursiveClosureIteration(array){
    let i = 0;

    function rec(array){
        if (i < array.length){
            array[i] * array[i];

            i++;

            return rec(array);
        }
    }
    
    return rec(array);
}

function doSuite(arrayLength) {
    console.log(`# Array.length : ${arrayLength}`);
    const Suite = new Benchmark.Suite();
    const array = new Array(arrayLength).fill(0);

    Suite
        .add('for (let i = 0; i < array.length; i++)', function () {
            for (let i = 0; i < array.length; i++) {
                array[i] * array[i];
            }
        })
        .add('for (let i = 0, iMax = array.length; i < iMax; i++)', function () {
            for (let i = 0, iMax = array.length; i < iMax; i++) {
                array[i] * array[i];
            }
        })
        .add('let i = 0; const iMax = array.length; for (; i++ < iMax;)', function () {
            let i = 0;
            const iMax = array.length;

            for (; i++ < iMax;) {
                array[i] * array[i];
            }
        })
        .add('let i = 0; const iMax = array.length; for (; i < iMax; i++)', function () {
            let i = 0;
            const iMax = array.length;

            for (; i < iMax; i++) {
                array[i] * array[i];
            }
        })
        .add('let i = 0; for (; i < array.length; i++)', function () {
            let i = 0;

            for (; i < array.length; i++) {
                array[i] * array[i];
            }
        })
        .add('let i = 0; const iMax = array.length; for (; iMax - i; i++)', function () {
            let i = 0;
            const iMax = array.length;

            for (; iMax - i; i++) {
                array[i] * array[i];
            }
        })
        .add('let i = 0; for (; array[i] !== undefined; i++)', function () {
            let i = 0;

            for (; array[i] !== undefined; i++) {
                array[i] * array[i];
            }
        })
        .add('let i = 0; for (; array[i++] !== undefined;)', function () {
            let i = 0;

            for (; array[i++] !== undefined;) {
                array[i] * array[i];
            }
        })
        .add('let i = 0; while (array[i++] !== undefined)', function () {
            let i = 0;

            while (array[i++] !== undefined) {
                array[i] * array[i];
            }
        })
        .add('let i = array.length; while (i--)', function () {
            let i = array.length;

            while (i--) {
                array[i] * array[i];
            }
        })
        .add('let i = 0, iMax = array.length; while (i++ < iMax)', function () {
            let i = 0, iMax = array.length;

            while (i++ < iMax) {
                array[i] * array[i];
            }
        })
        .add('let i = 0, iMax = array.length; while (iMax - (i++))', function () {
            let i = 0, iMax = array.length;

            while (iMax - i++) {
                array[i] * array[i];
            }
        })
        .add('let i = -array.length; while (i++)', function () {
            let i = -array.length;

            while (i++) {
                array[i + array.length] * array[i + array.length];
            }
        })
        .add('Simple recursion', function() {
            simpleRecursiveIteration(array);
        })
        .add('Simple recursion with i in closure', function() {
            recursiveClosureIteration(array);
        })
        .on('cycle', function (event) {
            console.log(String(event.target));
            if (fileWriter) {
                fileWriter.writeTableElement(computeNumber(event.target.hz));
            }
        })
        .on('complete', function () {
            console.log('Fastest is ' + this.filter('fastest').map('name'));
        })
        .run({ async: false });
}

for (let i = 10; i < 10000000; i *= 10) {
    if (fileWriter) {
        fileWriter.writeTableElement(i);
    }

    doSuite(i);

    if (fileWriter) {
        fileWriter.newLine();
    }
}

if (fileWriter) {
    fileWriter.end();
}
