# Comparison

## LessThan

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#LessThan-1)

```ts
const { Contract, EntryPoint, SetValue, ContractStorage, LessThan, TBool, TNat, Nat } = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TBool())
    .addEntrypoint(
        new EntryPoint('ep1')
            .setInputType(TNat())
            .code((arg) => [
                SetValue(ContractStorage(), LessThan(arg, Nat(1)))
            ]),
    );
```

## LessThanOrEqual

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#LessThanOrEqual-1)


```ts
const { Contract, EntryPoint, SetValue, ContractStorage, LessThanOrEqual, TBool, TNat, Nat } = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TBool())
    .addEntrypoint(
        new EntryPoint('ep1')
            .setInputType(TNat())
            .code((arg) => [
                SetValue(ContractStorage(), LessThanOrEqual(arg, Nat(1)))
            ]),
    );
```

## GreaterThan

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#GreaterThan-1)

```ts
const { Contract, EntryPoint, SetValue, ContractStorage, GreaterThan, TBool, TNat, Nat } = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TBool())
    .addEntrypoint(
        new EntryPoint('ep1')
            .setInputType(TNat())
            .code((arg) => [
                SetValue(ContractStorage(), GreaterThan(arg, Nat(1)))
            ]),
    );
```

## LessThanOrEqual

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#LessThanOrEqual-1)

```ts
const { Contract, EntryPoint, SetValue, ContractStorage, LessThanOrEqual, TBool, TNat, Nat } = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TBool())
    .addEntrypoint(
        new EntryPoint('ep1')
            .setInputType(TNat())
            .code((arg) => [
                SetValue(ContractStorage(), LessThanOrEqual(arg, Nat(1)))
            ]),
    );
```
