# Integer

## Type convertion

### CastToNat

Convert a value of type `TInt()` to `TNat()`.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#CastToNat)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    CastToNat,
    TInt,
    TNat,
    String,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TNat())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TInt())
            .code((arg) => [
                SetValue(ContractStorage(), CastToNat(arg, String('Could not convert int to nat'))),
            ]),
    );
```

### IsNat

Convert a value of type `TInt()` to `TOption(TNat())`.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#IsNat)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    IsNat,
    GetSome,
    TInt,
    TNat,
    String,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TNat())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TInt())
            .code((arg) => [
                SetValue(ContractStorage(), GetSome(IsNat(arg), String('Could not convert int to nat'))),
            ]),
    );
```

### CastToInt

Convert a value of type `TNat()` to `TInt()`.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#CastToInt)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    CastToInt,
    TInt,
    TNat,
    String,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TInt())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TNat())
            .code((arg) => [
                SetValue(ContractStorage(), CastToInt(arg)),
            ]),
    );
```
