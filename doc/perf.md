# Benchmarks
_generated at Mon, 24 Jul 2017 09:37:26 GMT_

Minimum sample size : 100  
Node.js version : 8.1.4

## Array

Method | Test | 10 | 1k | 1M
--- | --- | --- | --- | ---
 every| All values good| x 1.13| x 1.16| x 1.16
 | 1/4 Value| x 1.02| x 1.22| x 1.24
 | 1/2 Value| x 1.08| x 1.21| x 1.25
 | 3/4 Value| x 1.08| x 1.14| x 1.25
 | End Value| x 0.48| x 1.19| x 1.22
 filter| Keep elements with values 0| x 3.22| x 3.92| x 3.2
 forEach| Square| x 1.13| x 1.26| x 1.19
 map| Map elements with value 0| x 4.1| x 5.02| x 2.49
 reduce| Sum| x 1.57| x 1.35| x 1.41
 some| No value| x 1.02| x 1.14| x 1.17
 | 1/4 Value| x 0.94| x 1.16| x 1.16
 | 1/2 Value| x 1.16| x 1.17| x 1.16
 | 3/4 Value| x 1.06| x 1.13| x 1.15
 | End Value| x 1.14| x 1.11| x 1.15
