'use strict';

function sanicPush(array, ...items) {
    if (array.length + items.length > Number.MAX_SAFE_INTEGER){
        throw new TypeError();
    }

    let i = 0;
    
    for (; i < items.length; i++){
        array[array.length] = items[i];
    }

    return array.length;
}

module.exports = function (computeSuite, fileWriter, suiteOptions) {
    function doSuite(n) {
        const little = (new Array(10)).fill(0).map((e, i) => i % 2);
        const medium = (new Array(1000)).fill(0).map((e, i) => i % 2);
        const big = (new Array(1000000)).fill(0).map((e, i) => i % 2);

        const nArray = (new Array(n)).fill(2);

        if (fileWriter) fileWriter.writeTableElement(`Pushing ${n} elements`);

        console.log(`\t # ${n} elements pushing`);
        console.log(`\t10 elements`);
        computeSuite()
            .add('Array.prototype.push()', function () {
                little.push(2);
                little.splice(10, n);
            })
            .add('Sanic push()', function () {
                sanicPush(little, ...nArray);
                little.splice(10, n);
            })
            .run(suiteOptions);

        console.log(`\t1k elements`);
        computeSuite()
            .add('Array.prototype.push()', function () {
                medium.push(...nArray);
                medium.splice(1000, n);
            })
            .add('Sanic push()', function () {
                sanicPush(medium, ...nArray);
                medium.splice(1000, n);
            })
            .run(suiteOptions);

        console.log(`\t1M elements`);
        computeSuite()
            .add('Array.prototype.push()', function () {
                big.push(...nArray);
                big.splice(1000000, n);
            })
            .add('Sanic push()', function () {
                sanicPush(big, ...nArray);
                big.splice(1000000, n);
            })
            .run(suiteOptions);

            console.log(little);
    };

    doSuite(1);
    doSuite(10);
    doSuite(100);
}