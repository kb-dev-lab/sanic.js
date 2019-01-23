# Benchmarks
_generated at Tue, 22 Jan 2019 17:02:09 GMT_

**Node version** : v8.15.0  
**Minimum sample size** : 200  
## Array

 Method | Test | 10 | 1k | 1M |
--- |--- |--- |--- |--- |
|  every| All values good| x 6.39| x 8.04| x 1.13
|  | 1/4 Value| x 5.85| x 7.43| x 1.12
|  | 1/2 Value| x 6.07| x 7.33| x 1.09
|  | 3/4 Value| x 5.4| x 8.29| x 1.04
|  | End Value| x 5.73| x 7.95| x 1.85
|  filter| Keep elements with values 0| x 3.61| x 4.99| x 1.16
|  fill| Fill all the array| x 2.52| x 1.26| x 1.4
|  find| No value| x 4.55| x 6.08| x 1.14
|  | 1/4 Value| x 4.2| x 7.06| x 1.07
|  | 1/2 Value| x 4.74| x 7.38| x 1.1
|  | 3/4 Value| x 4.58| x 7.57| x 1.11
|  | End Value| x 4.73| x 7.21| x 2.69
|  forEach| Square| x 7.11| x 16.43| x 1.13
|  map| Map elements with value 0| x 3.81| x 4.8| x 9.14
|  reduce| Sum| x 4.57| x 8.71| x 1.11
|  reduceRight| Sum| x 17.34| x 36.74| x 5.27
|  reverse| Reverse all elements of array| x 5.49| x 7.17| x 6.98
|  some| No value| x 5.51| x 7.59| x 1.14
|  | 1/4 Value| x 4.61| x 7.45| x 1.07
|  | 1/2 Value| x 5.23| x 7.77| x 1.1
|  | 3/4 Value| x 4.95| x 7.65| x 1.09
|  | End Value| x 5.09| x 7.9| x 2.27

## Object

 Method | Test | 10 | 1k | 1M |
--- |--- |--- |--- |--- |
|  assign| Assign object with n elements| x 2.66| x 4.35| x 2.82
|  clone| Assign object with n elements| x 0.04| x 3.03| x 2.14