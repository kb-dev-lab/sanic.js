# Changes

**Note :** [ex]function() are experimental functions, and aren't added in sanic.js library.

## v0.2.0 - 10/12/18

Fn.bind() is faster than Fn.call(). Seems to be a huge improvement.
After IR analysis with Turbolizer, it seems bind() didn't need a FrameState during each loop iteration instead of old method. The bind() move the FrameState to the loop instruction, which seems to explain why the trick is so powerful.

 - Add Array.prototype.find()
 - Upgrade Array.prototype.every()
 - Upgrade Array.prototype.filter()
 - Upgrade Array.prototype.forEach()
 - Upgrade Array.prototype.map()
 - Upgrade Array.prototype.some()

## v0.1.1 - 08/06/18

 - Upgrade Array.prototype.reduce()
 - Upgrade Array.prototype.fill()
 - Add Array.prototype.reduceRight()
 - Add [ex]Array.prototype.push()
 - Update benchmark with Node 8.11.3 (LTS)


## v0.1.0 - 03/09/18

 - Add Object.assign()
 - Refactor main to accept constructor functions and prototype functions
 - Improve Array checking
 - Update benchmark with Node 8.9.4 (LTS)

## v0.0.4 - 08/04/17

 - Add natives methods calls on optimized functions bad cases.
For example, Array functions are optimized for Array, and crashed when array was not an array. Now, it will call the native methods instead, keeping compatibility with Object mapping, etc.

## v0.0.3 - 08/01/17

- Add Array.prototype.fill()
- Add Array.prototype.reverse()
- Add [ex]Array.prototype.join()
- Add [ex]Array.prototype.shift()
- Add [ex]Array.prototype.includes()
- Add bench/misc to create some Javascript concepts tests
- Add misc/loop to check best JS iteration way
- Add misc/stackSize to check JS stack size

## v0.0.2 - 07/26/17

- Increase performance of Array functions
- Add experimental flag 
- Add [ex]Array.prototype.indexOf()
- Add [ex]Array.prototype.lastIndexOf()
- Add [ex]Array.prototype.find()
- Add loop benchmarks

## v0.0.1 - 07/24/17

- Add Array.prototype.every()
- Add Array.prototype.filter()
- Add Array.prototype.forEach()
- Add Array.prototype.map()
- Add Array.prototype.reduce()
- Add Array.prototype.some()