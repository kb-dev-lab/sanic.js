# Benchmarks
_generated at Wed, 26 Jul 2017 12:24:55 GMT_

**Node version** : v8.1.4  
**Minimum sample size** : 200  
## Array

 Method | Test | 10 | 1k | 1M |
--- |--- |--- |--- |--- |
|  every| All values good| x 1.22| x 1.38| x 1.39
|  | 1/4 Value| x 1.05| x 1.38| x 1.4
|  | 1/2 Value| x 1.11| x 1.36| x 1.38
|  | 3/4 Value| x 1.26| x 1.38| x 1.43
|  | End Value| x 1.21| x 1.39| x 1.38
|  filter| Keep elements with values 0| x 3.45| x 4.36| x 3.81
|  forEach| Square| x 1.26| x 1.4| x 1.47
|  map| Map elements with value 0| x 5.22| x 7.46| x 7.13
|  reduce| Sum| x 1.56| x 1.39| x 1.44
|  some| No value| x 1.16| x 1.39| x 1.46
|  | 1/4 Value| x 1.04| x 1.4| x 1.4
|  | 1/2 Value| x 1.22| x 1.4| x 1.38
|  | 3/4 Value| x 1.25| x 1.4| x 1.42
|  | End Value| x 1.1| x 1.4| x 1.42
| 