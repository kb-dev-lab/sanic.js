# Benchmarks
_generated at Tue, 01 Aug 2017 14:50:56 GMT_

**Node version** : v8.1.4  
**Minimum sample size** : 200  
## Array

 Method | Test | 10 | 1k | 1M |
--- |--- |--- |--- |--- |
|  every| All values good| x 1.22| x 1.41| x 1.45
|  | 1/4 Value| x 1.03| x 1.4| x 1.41
|  | 1/2 Value| x 1.11| x 1.42| x 1.4
|  | 3/4 Value| x 1.43| x 1.4| x 1.45
|  | End Value| x 1.11| x 1.43| x 1.42
|  filter| Keep elements with values 0| x 3.46| x 4.46| x 3.91
|  fill| Fill all the array| x 1.68| x 1.03| x 1.02
|  forEach| Square| x 1.22| x 1.38| x 1.43
|  map| Map elements with value 0| x 5.26| x 7.35| x 6.21
|  reduce| Sum| x 1.54| x 1.5| x 1.43
|  reverse| Reverse all elements of array| x 2.93| x 8.56| x 5.64
|  some| No value| x 1.2| x 1.46| x 1.44
|  | 1/4 Value| x 1.02| x 1.33| x 1.42
|  | 1/2 Value| x 1.21| x 1.41| x 1.39
|  | 3/4 Value| x 1.38| x 1.39| x 1.38
|  | End Value| x 1.14| x 1.38| x 1.35
| 