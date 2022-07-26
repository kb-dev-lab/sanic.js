# sanic.js

[![Build Status](https://travis-ci.org/kb-dev/sanic.js.svg?branch=master)](https://travis-ci.org/kb-dev/sanic.js)
[![codecov](https://codecov.io/gh/kb-dev/sanic.js/branch/master/graph/badge.svg)](https://codecov.io/gh/kb-dev/sanic.js)

## Support of this lib with evolution of Javascript (1.1.3 / Node 16 / 22-07-26)

V8 engine evolved a lot since this project began. Few functions are still better with sanic.js, but a lot of them are now fully optimized in last versions of V8 engine (and Node.js/Chromium browsers).
Except if I found a new trick exploding again performance of these functions (which is really hard with the good evolution of V8), this library is currently a story of the past.
I have some tries to do with WebAssembly and N-Api. It was bad last time due to load overhead of C programs, but time has passed and these methods can be good today.
So avoid to use this library while there's not any new big updates (1.1.3 at the time I wrote this message), and keep doing some readable code. **Readable code is optimized code**.

### TL;DR: You shouldn't use this library anymore, except if you have some important performance problems with the last available functions.

---

Benchmarks between JS classic methods and Sanic methods [here](doc/perf.md).

---

> Another new day in the Javascript's world, and this fucking Array.prototype.map() function is always slow. But Sanic is here to save Javascript from the performance hell. GOTTA GO FAST !

**sanic.js** is a library which increases Javascript natives functions performance to the detriment of some unused cases of EcmaScript specification. For example, this library removes _hasOwnProperty()_ check in Array methods, because nobody uses Array methods for an Object. (Why am I saying that : [See Note 2 of this paragraph](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.map)). 

This project has 2 common uses :
 - like any other library with a classic object with methods.
 - with a special require changing prototype of natives objects concerned (Array, Object, ...) (monkey patching).

> gosh you're changing prototype of native objects taht's baaaaaaaad !!!!! :((

The advantage of this bad technic is performances of all library called after **sanic.js** will be impacted, and using this technic is only one line away : 

```js 
    require('sanic.js').changeMyWorld();
``` 

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

  - Array.prototype.**every()** (removed in 1.1.3)
  - Array.prototype.**fill()**
  - Array.prototype.**find()** (removed in 1.1.3)
  - Array.prototype.**filter()** (removed in 1.1.3)
  - Array.prototype.**forEach()** (removed in 1.1.3)
  - Array.prototype.**map()**
  - Array.prototype.**reduceRight()** (removed in 1.1.3)
  - Array.prototype.**reverse()** (removed in 1.1.3)
  - Array.prototype.**some()**

### Object
  - Object.**assign()**
  - Object.**clone()** (optional method)

## Performance

```bash
    # Run all benchmarks
    npm run benchmark

    # Run specific benchmarks
    npm run benchmark Array.reduce Array.map

    # Method can be set to 'all' to test all methods of a class
    npm run benchmark Array.all
```

Benchmarks [here](doc/perf.md)

## Experimental functions

To create this library, I do some bench tests on each function detailed in EcmaScript. But sometimes, natives functions are faster. So I keep my bad functions and I call them **experimental functions**.  That's why there are more functions available in benchmarks than in lib.

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

  - Array.prototype.**concat()**
  - Array.prototype.**includes()**
  - Array.prototype.**indexOf()**
  - Array.prototype.**join()**
  - Array.prototype.**lastIndexOf()**
  - Array.prototype.**push()**
  - Array.prototype.**reduce()**
  - Array.prototype.**shift()**
  - Array.prototype.**unshift()**

## License 

MIT ([LICENSE](/LICENSE))

## Thanks to

 - KBDev