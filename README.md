# sanic.js

[![Build Status](https://travis-ci.org/AamuLumi/sanic.js.svg?branch=master)](https://travis-ci.org/AamuLumi/sanic.js)
[![codecov](https://codecov.io/gh/AamuLumi/sanic.js/branch/master/graph/badge.svg)](https://codecov.io/gh/AamuLumi/sanic.js)

> Another new day in the Javascript's world, and this fucking Array.prototype.map() function is always slow. But Sanic is here to save Javascript from the performance hell. GOTTA GO FAST !

**sanic.js** is a library which increases Javascript natives functions performance to the detriment of some unused cases of EcmaScript specification. For example, this library removes _hasOwnProperty()_ check in Array methods, because nobody uses Array methods for an Object. (Why am I saying that : [See Note 2 of this paragraph](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.map)). 

This project has 2 common uses :
 - like any other library with a classic object with methods.
 - with a special require changing prototype of natives objects concerned (Array, Object, ...).

> gosh you're changing prototype of native objects taht's baaaaaaaad !!!!! :((

The advantage of this bad technic is performances of all library called after **sanic.js** will be impacted, and using this technic is only one line away : 

```js 
    require('sanic.js').changeMyWorld();
``` 

Since v0.0.4, if an updated method fell in a case where it cannot work, it will call the native method instead. It keeps compatibility with a lot of code and optimization are only done on good cases. This feature is enabled in all common uses.

Due to the danger of the library, there's a lot of unit test and performance tests to try to protect you from bugs. But anyway, there are always bugs, so please report them in **Issues** section.

## Installation

```bash
    npm install --save sanic.js
```

## API

### Fast use

This mode replaces all prototypes methods by their Sanic equivalents. Sanic methods are written with same parameters than natives prototypes methods. The goal is to give faster functions **without any code adaptation**.

```js
    require('sanic.js').changeMyWorld();

    const myArray = [1, 2, 3, 5, 8];

    console.log(
        // Yeah, Sanic is activated but there's no code to change
        myArray.reduce((acc, n) => acc + n)
    );
```

### Library use

In this mode, all functions need the object to use to the first parameter and all classic parameters after.

```js 
    const Sanic = require('sanic.js').Library;
    const myArray = [1, 2, 3, 5, 8];

    console.log(
        Sanic.Array.reduce(myArray, (acc, n) => acc + n)
    );
```

## Available reworked functions

### Array

  - Array.prototype.**every()**
  - Array.prototype.**fill()**
  - Array.prototype.**filter()**
  - Array.prototype.**forEach()**
  - Array.prototype.**map()**
  - Array.prototype.**reduce()**
  - Array.prototype.**reverse()**
  - Array.prototype.**some()**

## Performance

```bash
    # Run all benchmarks
    npm run benchmark

    # Run specific benchmarks
    npm run benchmark Array.reduce Array.map

    # Method can be set to 'all' to test all methods of a class
    npm run benchmark Array.all
```

Benchmarks [here](doc/perf.md).

## Experimental functions

To create this library, I do some bench tests on each function detailed in EcmaScript. But sometimes, natives functions are faster. I consider these functions I wrote and were slower than natives functions are **experimental functions**. That's why there are more functions available in benchmarks than in lib.

If you want to test the performance of these functions (in the case of you want to help this library or others things) :  

```bash
    # Run all benchmarks
    npm run exp

    # Run specific benchmarks
    npm run exp Array.map Array.indexOf

    # Method can be set to 'all' to test all methods of a class
    npm run exp Array.all
```

This is the same command line than benchmarks, but it enables a new flag which allows using experimental functions.

### Array

  - Array.prototype.**find()**
  - Array.prototype.**includes()**
  - Array.prototype.**indexOf()**
  - Array.prototype.**join()**
  - Array.prototype.**lastIndexOf()**
  - Array.prototype.**shift()**

## License 

MIT ([LICENSE](/LICENSE))

### Thanks to [ProMyze](https://promyze.com) to give me time and motivation to work on this project.
