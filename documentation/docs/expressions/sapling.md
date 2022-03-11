# Sapling

## Create a sapling empty state

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#EmptySaplingState)

```ts
const {
    Contract,
    EntryPoint,
    EmptySaplingState,
    Unit,
    Mutez,
    Address,
    TUnit,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TSapling_state(8))
    .addEntrypoint(
        new EntryPoint('entry_point_1').code(() => [
            SetValue(ContractStorage(), EmptySaplingState(8)),
        ]),
    );
```

## Verify and apply a transaction on a Sapling state.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#ApplySaplingUpdate)

```ts
const {
    Contract,
    EntryPoint,
    EmptySaplingState,
    Unit,
    Mutez,
    Address,
    TUnit,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TSapling_state(8))
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TSapling_transaction(8))
            .code((argument) => [
                SetValue(
                    ContractStorage(),
                    SecondElement(GetSome(ApplySaplingUpdate(ContractStorage(), argument))),
                ),
            ]),
    );
```
