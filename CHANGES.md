# Changes

**Note :** [ex]function() are experimental functions, and aren't added in sanic.js library.

## v0.0.4 - 04/08/17

 - Add natives methods calls on optimized functions bad cases.
For example, Array functions are optimized for Array, and crashed when array was not an array. Now, it will call the native methods instead, keeping compatibility with Object mapping, etc.

## v0.0.3 - 01/08/17

- Add Array.prototype.fill()
- Add Array.prototype.reverse()
- Add [ex]Array.prototype.join()
- Add [ex]Array.prototype.shift()
- Add [ex]Array.prototype.includes()
- Add bench/misc to create some Javascript concepts tests
- Add misc/loop to check best JS iteration way
- Add misc/stackSize to check JS stack size

## v0.0.2 - 26/07/17

- Increase performance of Array functions
- Add experimental flag 
- Add [ex]Array.prototype.indexOf()
- Add [ex]Array.prototype.lastIndexOf()
- Add [ex]Array.prototype.find()
- Add loop benchmarks

## v0.0.1 - 24/07/17

- Add Array.prototype.every()
- Add Array.prototype.filter()
- Add Array.prototype.forEach()
- Add Array.prototype.map()
- Add Array.prototype.reduce()
- Add Array.prototype.some()