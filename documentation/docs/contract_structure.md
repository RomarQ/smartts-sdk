# Contract Structure

## Define the initial storage

```js
const { Contract } = require('@tezwell/smartts-sdk');

const contract = new Contract().setStorage(Nat(0));
```

## Specify the storage type

```js
const { Contract } = require('@tezwell/smartts-sdk');

const contract = new Contract().setStorageType(TNat()).setStorage(Nat(0));
```

## Define an entrypoint

```js
const { Contract, EntryPoint, SetValue, ContractStorage, TNat } = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorage(Nat(0)) // Set initial storage
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TNat()) // Set the type of the entrypoint argument
            .code((arg) => [
                SetValue(ContractStorage(), arg) // Update contract storage
            ]);
    );
```

## Define and call an on-chain view

```js
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    GetSome,
    CallView,
    GetSelfAddress,
    String,
    OnChainView,
    TBool,
    TNat,
    Return,
    Nat,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    // Set initial storage
    .setStorage(Nat(0))
    // Add an entrypoint named "entry_point_1"
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            // Set the type of the entrypoint argument
            .setInputType(TBool())
            // Specify the entrypoint logic
            .code((argument) => [
                // Update contract storage
                SetValue(
                    ContractStorage(),
                    GetSome(CallView('convert', GetSelfAddress(), argument), String('Could not call view')),
                ),
            ]),
    )
    // Add an on-chain view named "convert"
    .addView(
        new OnChainView('convert').setInputType(TBool()).code((argument) => [
            // Convert a boolean value to a nat value
            If(argument)
                .Then([Return(Nat(1))])
                .Else([Return(Nat(0))]),
        ]),
    );
```
