'use strict';

function rec(i) {
    if (i) {
        return rec(i - 1);
    }
}

let i = 0;
const iMax = 100000;

for (; i < iMax; i++) {
    try {
        // i+1 because there's an initial call to count
        // rec(1) do 2 functions calls
        process.stdout.write(`\rTesting call stack ${i+1}`);
        rec(i);
    } catch (e) {
        console.error(`\nCrash at ${i +1} calls - Stack size is ${i}`);

        process.exit(-1);
    }
}