# Assertion

## Require

`Require` statement tests a condition and interrupt the smart-contract execution if the condition is false. (The whole operation gets backtraced)

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/statement.html#Require)

```ts
const {
    Contract,
    EntryPoint,
    Equal,
    GetSender,
    ContractStorage,
    Require,
    Unit,
    TUnit,
    Address,
    String
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorage(Unit())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TUnit())
            .code(() => [
                Require(Equal(GetSender(), Address("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN")), String('Not Admin!'))
            ])
    );
```

## FailWith

`FailWith` statement interrupts the smart-contract execution. (The whole operation gets backtraced)

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/statement.html#FailWith)

```ts
const {
    Contract,
    EntryPoint,
    Equal,
    GetSender,
    ContractStorage,
    If,
    FailWith,
    Unit,
    TUnit,
    Address,
    String
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorage(Unit())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TUnit())
            .code(() => [
                If(Equal(GetSender(), Address("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN")))
                    .Then([
                        FailWith(String('Not Admin!'))
                    ])
            ])
    );
```
