# Benchmarks
_generated at Tue, 26 Jul 2022 08:35:58 GMT_

**Node version** : v16.13.1  
**Minimum sample size** : 200  
## Array

 Method | Test | 10 | 1k | 1M |
--- |--- |--- |--- |--- |
|  every (removed in 1.1.3)| All values good| x 0.78| x 0.95| x 1.19
|  | 1/4 Value| x 0.8| x 0.8| x 1.3
|  | 1/2 Value| x 0.88| x 0.76| x 1.09
|  | 3/4 Value| x 0.82| x 0.78| x 0.44
|  | End Value| x 0.89| x 0.82| x 1.69
|  filter(removed in 1.1.3)| Keep elements with values 0| x 0.97| x 0.79| x 1.16
|  fill| Fill all the array| x 2.73| x 1.17| x 1.29
|  find (removed in 1.1.3)| No value| x 0.76| x 0.68| x 1.07
|  | 1/4 Value| x 0.91| x 0.85| x 1.29
|  | 1/2 Value| x 0.9| x 0.8| x 1.07
|  | 3/4 Value| x 0.88| x 0.82| x 2.75
|  | End Value| x 0.85| x 0.8| x 1.26
|  forEach (removed in 1.1.3)| Square| x 0.87| x 0.97| x 1.08
|  map| Map elements with value 0| x 1.4| x 1.25| x 1.08
|  reduceRight (removed in 1.1.3)| Sum| x 0.85| x 0.76| x 1.11
|  reverse| Reverse all elements of array| x 1.25| x 1.04| x 1.05
|  some (removed in 1.1.3)| No value| x 0.84| x 0.8| x 1.14
|  | 1/4 Value| x 0.84| x 0.9| x 1.25
|  | 1/2 Value| x 0.9| x 0.8| x 1.1
|  | 3/4 Value| x 0.89| x 0.81| x 0.32
|  | End Value| x 0.88| x 0.8| x 1.9
| ## Object

 Method | Test | 10 | 1k | 1M |
--- |--- |--- |--- |--- |
|  assign| Assign object with n elements| x 3.29| x 5.86| x 1.84
|  clone| Assign object with n elements| x 0.04| x 2.59| x 1.66
| 