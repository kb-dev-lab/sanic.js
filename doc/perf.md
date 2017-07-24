# Benchmarks
_generated at Mon, 24 Jul 2017 12:04:03 GMT_

Minimum sample size : 100
Node version: 8.1.4

## Array

Method | Test | 10 | 1k | 1M
--- | --- | --- | --- | ---
|  every| All values good| x 1.12| x 1.09| x 1.17
|  | 1/4 Value| x 1.02| x 1.15| x 1.28
|  | 1/2 Value| x 1.05| x 1.16| x 1.15
|  | 3/4 Value| x 1.05| x 1.12| x 1.24
|  | End Value| x 1.12| x 1.15| x 1.18
|  filter| Keep elements with values 0| x 3.15| x 3.81| x 2.24
|  forEach| Square| x 1.13| x 1.17| x 1.19
|  map| Map elements with value 0| x 4.12| x 4.93| x 1.27
|  reduce| Sum| x 1.6| x 1.44| x 1.41
|  some| No value| x 1.06| x 1.16| x 1.15
|  | 1/4 Value| x 1.07| x 1.21| x 1.16
|  | 1/2 Value| x 1.12| x 1.18| x 1.13
|  | 3/4 Value| x 1.04| x 1.15| x 1.16
|  | End Value| x 0.99| x 1.13| x 1.16 