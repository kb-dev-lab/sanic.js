# Benchmarks
_generated at Mon, 06 Aug 2018 12:17:52 GMT_

**Node version** : v8.11.3  
**Minimum sample size** : 200  
## Array

 Method | Test | 10 | 1k | 1M |
--- |--- |--- |--- |--- |
|  every| All values good| x 1.04| x 1.14| x 1.08
|  | 1/4 Value| x 1.11| x 1.07| x 1.11
|  | 1/2 Value| x 1.09| x 1.16| x 1.09
|  | 3/4 Value| x 1.02| x 1.11| x 1.12
|  | End Value| x 1.1| x 1.08| x 1.15
|  filter| Keep elements with values 0| x 1.19| x 1.29| x 1.23
|  fill| Fill all the array| x 3.23| x 1.22| x 1.13
|  forEach| Square| x 1.17| x 1.15| x 1.19
|  map| Map elements with value 0| x 1.07| x 1.2| x 8.2
|  reduce| Sum| x 4.95| x 7.74| x 1.07
|  reduceRight| Sum| x 20.8| x 39.67| x 5.09
|  reverse| Reverse all elements of array| x 5.89| x 6.83| x 6.07
|  some| No value| x 1.12| x 1.16| x 1.12
|  | 1/4 Value| x 0.97| x 1.11| x 1.13
|  | 1/2 Value| x 1.09| x 1.19| x 1.06
|  | 3/4 Value| x 1.07| x 1.1| x 1.18
|  | End Value| x 1.03| x 1.11| x 1.12

## Object

 Method | Test | 10 | 1k | 1M |
--- |--- |--- |--- |--- |
|  assign| Assign object with n elements| x 2.86| x 4.31| x 2.77