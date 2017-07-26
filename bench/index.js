'use strict';

const BenchFileCreator = require('./benchFileCreator');
const Benchmark = require('benchmark');
const Classes = {
    Array: require('./array')
};

const SuiteOptions = {
    async: false
};

Benchmark.options.minSamples = 200;

const ALL = 'all';
const WRITE_FILE = 'writeFile';

let onlySpecificTest = false;
const testsToDo = {};
let fileWriter = null;

const writeFileArg = process.argv.some((arg) => arg === WRITE_FILE);

if (process.argv.length > 2 && !writeFileArg ||
    process.argv.length > 3) {
    onlySpecificTest = true;

    for (let i = 2, iMax = process.argv.length; i < iMax; i++) {
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

if (writeFileArg) {
    fileWriter = new BenchFileCreator();
    fileWriter.addInformations(Benchmark.options.minSamples);
}

function computeBenchmarkSuite() {
    return new Benchmark.Suite()
        .on('cycle', function (event) {
            console.log(`\t\t${event.target}`);
        })
        .on('complete', function () {
            const fasterName = this.filter('fastest').map('name'),
                nativeTime = this.shift(),
                sanicTime = this.shift();

            if (fileWriter)
                fileWriter.writeTableElement(
                    `x ${Math.round(sanicTime.hz / nativeTime.hz * 100) / 100}`
                );

            console.log(`\t\t-> Fastest is ${fasterName} (x ${sanicTime.hz / nativeTime.hz})`);
        });
}

Object.keys(Classes).forEach((className) => {
    if (onlySpecificTest && !testsToDo[className]) {
        return;
    }

    console.log(`\n# ${className}`);
    if (fileWriter) {
        fileWriter.writeTitle(className);
        fileWriter.writeTableHeader(['Method', 'Test', '10', '1k', '1M']);
    }

    const benchMethods = Classes[className];

    Object.keys(benchMethods).forEach((methodName) => {
        if (onlySpecificTest && !testsToDo[className].all &&
            !testsToDo[className].methods.some(
                (name) => name === methodName)) {
            return;
        }

        if (!benchMethods[methodName]) {
            return;
        }

        console.log(`.${methodName}()`);
        if (fileWriter)
            fileWriter.writeTableElement(methodName);

        benchMethods[methodName](computeBenchmarkSuite, fileWriter, SuiteOptions);

        if (fileWriter) {
            fileWriter.newLine();
        }
    });
});

if (fileWriter) {
    fileWriter.end();
}