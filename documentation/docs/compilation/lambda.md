# Build and compile a lambda

```js
const {
    Comparison,
    Lambda,
    If,
    Return,
    String,
    Nat
} = require('@tezwell/smartts-sdk');
const SmartML = require('@tezwell/smartts-sdk/compiler');

// A Lambda that returns "YES" if the argument is greater than or equal to Nat(10), returns "NO" otherwise.
const lambda = Lambda()
    .code((arg) => [
        If(Comparison.GreaterThanOrEqual(arg, Nat(1)))
            .Then([Return(String('YES'))])
            .Else([Return(String('NO'))]),
    ]);

SmartML.compileValue(lambda);
```
