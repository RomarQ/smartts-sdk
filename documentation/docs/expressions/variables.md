# Accessing Variables

## Access a local variable

The expression `GetVariable` is used to get the value stored in a local variable.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#GetVariable)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    NewVariable,
    ContractStorage,
    GetVariable,
    TString,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TString())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TString())
            .code((argument) => [
                // let some_variable = "SOME_PREFIX_" + <argument>;
                NewVariable("some_variable", Concat(["SOME_PREFIX_", argument])),
                // <contract>.<storage> = some_variable
                SetValue(ContractStorage(), GetVariable("some_variable"))
            ]),
    );
```

## Access the contract storage

The expression `ContractStorage` is used to access the contract storage.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#ContractStorage)

```ts
const {
    Contract,
    EntryPoint,
    Require,
    ContractStorage,
    String,
    TBool,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TBool())
    .addEntrypoint(
        new EntryPoint('entry_point_1').code(() => [
            // The storage is a boolean that will be "true" only when the contract is active and false otherwise
            Require(ContractStorage(), String("The contract is paused!")),
        ]),
    );
```

## Access the list of operations

The expression `GetOperations` is used to get the operations list from the stack or an empty list otherwise.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#GetOperations)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    GetOperations,
    SetDelegate,
    PrependToList,
    None
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .addEntrypoint(
        new EntryPoint('entry_point_1').code(() => [
            // Add a new operation to the stack
            SetValue(
                GetOperations(),
                PrependToList(
                    GetOperations(),
                    SetDelegate(None()),
                ),
            ),
        ]),
    );
```
