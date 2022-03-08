# SmartTS SDK
![CI](https://github.com/RomarQ/smartts-sdk/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/RomarQ/smartts-sdk/badge.svg?branch=main)](https://coveralls.io/github/RomarQ/smartts-sdk?branch=main)

`SmartTS SDK` is a metaprogramming framework for building Tezos smart contracts from Javascript. It uses the SmartPy compiler.

<hr/>

# [TypeDoc](https://romarq.github.io/smartts-sdk/api)

<hr/>

### Use the package

#### Build and compile a contract

```js
const {
    Equal,
    Contract,
    EntryPoint,
    GetSender,
    NewVariable,
    Require,
    SetValue,
    TNat,
    ContractStorage,
    GetVariable,
    Address,
    Nat,
    String
} = require('@tezwell/smartts-sdk');
const SmartML = require('@tezwell/smartts-sdk/compiler');

const contract = new Contract()
    .setStorage(Nat(0))
    .addEntrypoint(
        new EntryPoint('ep1').setInputType(TNat()).code((arg) => [
            // Define a variable named "some_address"
            NewVariable('some_address', Address('tz1')),
            // Require sender to be equal to variable "some_address", otherwise fail with "Not Admin!"
            Require(Equal(GetVariable('some_address'), GetSender()), String('Not Admin!')),
            // Replace the storage value with entry point argument
            SetValue(ContractStorage(), arg),
        ]),
    );

SmartML.compileContract(contract);
```

#### Build and compile a lambda

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

SmartML.compileLambda(lambda);
```

## **About**

Project was supported by **Tezos Foundation**.
