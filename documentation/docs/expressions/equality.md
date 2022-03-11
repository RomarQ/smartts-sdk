# Equality

### Equal

Checks if two expressions evaluate to equal values.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#Equal-1)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    Equal,
    TBool,
    TNat,
    Nat,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TBool())
    .addEntrypoint(
        new EntryPoint('ep1')
            .setInputType(TNat())
            .code((arg) => [
                SetValue(ContractStorage(), Equal(arg, Nat(1)))
            ]),
    );
```

### NotEqual

Checks if two expressions evaluate to a different values.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#Equal-1)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    NotEqual,
    TBool,
    TNat,
    Nat,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TBool())
    .addEntrypoint(
        new EntryPoint('ep1')
            .setInputType(TNat())
            .code((arg) => [
                SetValue(ContractStorage(), NotEqual(arg, Nat(1)))
            ]),
    );
```
