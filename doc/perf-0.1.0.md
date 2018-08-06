# Benchmarks
_generated at Thu, 08 Mar 2018 23:59:53 GMT_

**Node version** : v8.9.4  
**Minimum sample size** : 200  
## Array

| Method | Test | 10 | 1k | 1M |
| --- |--- |--- |--- |--- |
|  every| All values good| x 1.03| x 1.12| x 1.11
|  | 1/4 Value| x 0.84| x 1.1| x 1.12
|  | 1/2 Value| x 0.97| x 1.1| x 1.11
|  | 3/4 Value| x 1| x 1.1| x 1.11
|  | End Value| x 1| x 1.1| x 1.1
|  filter| Keep elements with values 0| x 1.15| x 1.26| x 1.16
|  fill| Fill all the array| x 2.79| x 1.06| x 0.9
|  forEach| Square| x 1.13| x 1.17| x 1.16
|  map| Map elements with value 0| x 1.02| x 1.12| x 17.68
|  reduce| Sum| x 5.03| x 9.61| x 0.99
|  reverse| Reverse all elements of array| x 4.85| x 7.67| x 6.91
|  some| No value| x 1.05| x 1.15| x 1.17
|  | 1/4 Value| x 0.89| x 1.1| x 1.16
|  | 1/2 Value| x 0.96| x 1.08| x 1.17
|  | 3/4 Value| x 0.98| x 1.08| x 1.15
|  | End Value| x 1.05| x 1.08| x 1.15

## Object

| Method | Test | 10 | 1k | 1M |
| --- |--- |--- |--- |--- |
|  assign| Assign object with n elements| x 2.48| x 3.92| x 2.09