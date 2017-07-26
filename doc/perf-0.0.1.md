# Benchmarks
_generated at Mon, 24 Jul 2017 12:28:32 GMT_

**Node version** : v8.1.4  
**Minimum sample size** : 200
## Array

Method | Test | 10 | 1k | 1M
--- | --- | --- | --- | ---
|  every| All values good| x 1.13| x 1.13| x 1.15
|  | 1/4 Value| x 1| x 1.13| x 1.13
|  | 1/2 Value| x 0.94| x 1.14| x 1.16
|  | 3/4 Value| x 1.03| x 1.11| x 1.14
|  | End Value| x 1.13| x 1.12| x 1.13
|  filter| Keep elements with values 0| x 3.15| x 3.83| x 3.27
|  forEach| Square| x 1.16| x 1.22| x 1.21
|  map| Map elements with value 0| x 4.19| x 5.14| x 2.91
|  reduce| Sum| x 1.53| x 1.43| x 1.38
|  some| No value| x 1.06| x 1.13| x 1.15
|  | 1/4 Value| x 1| x 1.15| x 1.08
|  | 1/2 Value| x 1.13| x 1.16| x 1.14
|  | 3/4 Value| x 1.03| x 1.16| x 1.16
|  | End Value| x 1.01| x 1.23| x 1.21
| 