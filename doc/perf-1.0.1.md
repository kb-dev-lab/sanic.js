# Benchmarks
_generated at Mon, 15 Oct 2018 10:26:38 GMT_

**Node version** : v8.11.4  
**Minimum sample size** : 200  
## Array

 Method | Test | 10 | 1k | 1M |
--- |--- |--- |--- |--- |
|  every| All values good| x 6.53| x 7.97| x 1.12
|  | 1/4 Value| x 5.93| x 7.43| x 1.09
|  | 1/2 Value| x 5.05| x 7.84| x 1.15
|  | 3/4 Value| x 4.86| x 8.38| x 1.12
|  | End Value| x 6.34| x 8.27| x 1.88
|  filter| Keep elements with values 0| x 4.16| x 5.4| x 1.15
|  fill| Fill all the array| x 2.62| x 1.21| x 1.19
|  find| No value| x 5.06| x 7.67| x 1.06
|  | 1/4 Value| x 5.28| x 7.06| x 1.09
|  | 1/2 Value| x 4.61| x 7.42| x 1.11
|  | 3/4 Value| x 4.64| x 7.85| x 1.05
|  | End Value| x 4.73| x 7.53| x 1.06
|  forEach| Square| x 7.08| x 15.78| x 1.18
|  map| Map elements with value 0| x 3.74| x 5.17| x 8.81
|  reduce| Sum| x 5.08| x 8.39| x 1.11
|  reduceRight| Sum| x 18.35| x 39.03| x 5.06
|  reverse| Reverse all elements of array| x 5.6| x 6.86| x 6.44
|  some| No value| x 5.23| x 8.23| x 1.15
|  | 1/4 Value| x 3.85| x 7.59| x 1.15
|  | 1/2 Value| x 4.88| x 8.12| x 1.14
|  | 3/4 Value| x 5.01| x 7.9| x 1.14
|  | End Value| x 5.07| x 8.4| x 2.46

## Object

 Method | Test | 10 | 1k | 1M |
--- |--- |--- |--- |--- |
|  assign| Assign object with n elements| x 2.75| x 3.92| x 2.64