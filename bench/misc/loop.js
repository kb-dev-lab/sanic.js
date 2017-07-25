'use strict';

const Benchmark = require('benchmark');
Benchmark.options.minSamples = 50;

const Suite = new Benchmark.Suite();

const array = new Array(1000000).fill(0);

Suite
.add('for (let i = 0; i < array.length; i++)', function(){
    for (let i = 0; i < array.length; i++){
        array[i] * array[i];
    }
})
.add('for (let i = 0, iMax = array.length; i < iMax; i++)', function() {
    for (let i = 0, iMax = array.length; i < iMax; i++){
        array[i] * array[i];
    }
})
.add('let i = 0; const iMax = array.length; for (; i++ < iMax;)', function() {
    let i = 0;
    const iMax = array.length;

    for (; i++ < iMax;){
        array[i] * array[i];
    }
})
.add('let i = 0; const iMax = array.length; for (; i < iMax; i++)', function() {
    let i = 0;
    const iMax = array.length;

    for (; i < iMax; i++){
        array[i] * array[i];
    }
})
.add('let i = 0; for (; i < array.length; i++)', function() {
    let i = 0;

    for (; i < array.length; i++){
        array[i] * array[i];
    }
})
.add('let i = 0; const iMax = array.length; for (; iMax - i; i++)', function() {
    let i = 0;
    const iMax = array.length;

    for (; iMax - i; i++){
        array[i] * array[i];
    }
})
.add('let i = 0; for (; array[i] !== undefined; i++)', function() {
    let i = 0;
    
    for (; array[i] !== undefined; i++){
        array[i] * array[i];
    }
})
.add('let i = 0; for (; array[i++] !== undefined;)', function() {
    let i = 0;

    for (; array[i++] !== undefined;){
        array[i] * array[i];
    }
})
.add('let i = 0; while (array[i++] !== undefined)', function() {
    let i = 0;

    while (array[i++] !== undefined){
        array[i] * array[i];
    }
})
.add('let i = array.length; while (i--)', function() {
    let i = array.length;

    while (i--){
        array[i] * array[i];
    }
})
.add('let i = 0, iMax = array.length; while (i++ < iMax)', function() {
    let i = 0, iMax = array.length;

    while (i++ < iMax){
        array[i] * array[i];
    }
})
.add('let i = 0, iMax = array.length; while (iMax - (i++))', function() {
    let i = 0, iMax = array.length;

    while (iMax - i++){
        array[i] * array[i];
    }
})
.add('let i = -array.length; while (i++)', function() {
    let i = -array.length;

    while (i++){
        array[i + array.length] * array[i + array.length];
    }
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
  process.exit(0);
})
.run({async: false});