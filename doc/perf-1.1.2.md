# Benchmarks
_generated at Thu, 05 Dec 2019 11:44:32 GMT_

**Node version** : v10.16.3  
**Minimum sample size** : 200  
## Array

 Method | Test | 10 | 1k | 1M |
--- |--- |--- |--- |--- |
|  every| All values good| x 1.11| x 1.42| x 1.31
|  | 1/4 Value| x 0.99| x 1.31| x 1.09
|  | 1/2 Value| x 0.86| x 1.31| x 1.07
|  | 3/4 Value| x 1.13| x 1.29| x 1.09
|  | End Value| x 0.92| x 1.28| x 1.2
|  filter| Keep elements with values 0| x 1.07| x 1.13| x 1.16
|  fill| Fill all the array| x 2.08| x 1.04| x 1
|  find| No value| x 0.8| x 0.73| x 1.14
|  | 1/4 Value| x 1.17| x 0.99| x 1.12
|  | 1/2 Value| x 0.66| x 0.98| x 1.14
|  | 3/4 Value| x 0.85| x 1| x 1.15
|  | End Value| x 0.73| x 1| x 2.16
|  forEach| Square| x 1.19| x 1.02| x 1
|  map| Map elements with value 0| x 1.26| x 1.08| x 9.04
|  reduceRight| Sum| x 0.83| x 3| x 5.21
|  reverse| Reverse all elements of array| x 7.29| x 7.87| x 7.11
|  some| No value| x 1.75| x 1.45| x 1.16
|  | 1/4 Value| x 2.01| x 1.58| x 1.18
|  | 1/2 Value| x 1.29| x 1.59| x 1.14
|  | 3/4 Value| x 1.42| x 1.61| x 1.14
|  | End Value| x 1.28| x 1.6| x 1.83

## Object

 Method | Test | 10 | 1k | 1M |
--- |--- |--- |--- |--- |
|  assign| Assign object with n elements| x 3.08| x 4.74| x 2.2
|  clone| Assign object with n elements| x 0.05| x 2.99| x 1.84
| 