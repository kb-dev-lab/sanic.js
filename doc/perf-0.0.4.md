# Benchmarks
_generated at Fri, 04 Aug 2017 09:26:20 GMT_

**Node version** : v8.1.4  
**Minimum sample size** : 200  
## Array

 Method | Test | 10 | 1k | 1M |
--- |--- |--- |--- |--- |
|  every| All values good| x 1.18| x 1.31| x 1.29
|  | 1/4 Value| x 0.93| x 1.37| x 1.38
|  | 1/2 Value| x 1.02| x 1.34| x 1.33
|  | 3/4 Value| x 1.23| x 1.35| x 1.34
|  | End Value| x 1.04| x 1.34| x 1.36
|  filter| Keep elements with values 0| x 3.36| x 4.47| x 3.89
|  fill| Fill all the array| x 1.53| x 2.39| x 2.32
|  forEach| Square| x 1.28| x 1.46| x 1.45
|  map| Map elements with value 0| x 5.2| x 7.4| x 5.89
|  reduce| Sum| x 1.37| x 1.39| x 1.43
|  reverse| Reverse all elements of array| x 2.85| x 8.71| x 4.72
|  some| No value| x 1.13| x 1.44| x 1.44
|  | 1/4 Value| x 0.95| x 1.39| x 1.47
|  | 1/2 Value| x 1.12| x 1.37| x 1.39
|  | 3/4 Value| x 1.22| x 1.37| x 1.39
|  | End Value| x 1.01| x 1.39| x 1.4
| 