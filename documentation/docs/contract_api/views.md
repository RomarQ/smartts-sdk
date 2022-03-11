# On-Chain Views

## Define an on-chain view

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/classes/core.OnChainView.html)

```js
const {
    Contract,
    CallView,
    OnChainView,
    TBool,
    TNat,
    Return,
    Nat,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    // Add an on-chain view named "convert"
    .addView(
        new OnChainView('convert')
            .setInputType(TBool())
            .code((argument) => [
                // Convert a boolean value to a nat value
                If(argument)
                    .Then([Return(Nat(1))])
                    .Else([Return(Nat(0))]),
            ]),
    );
```

## Call an on-chain view

Calls an on-chain view and returns an expression of type `TOption(<any>)`.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#CallView)

#### Usage

```ts
const {
    Contract,
    EntryPoint,
    TOption,
    TBool,
    TNat,
    ContractStorage,
    CallView,
    SetValue,
    Return,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TOption(TNat()))
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TBool())
            .code((arg) => [
                SetValue(ContractStorage(), CallView('convert', Address(""), arg, TNat())),
            ]),
    );
```
