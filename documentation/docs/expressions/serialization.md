# Serialization

## Serialize data

The expression `Pack` serializes any value of packable type to its optimized binary representation, of type `TBytes()`.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#Pack)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    None,
    Some,
    Pack,
    TString,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorage(None())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TString())
            .code((argument) => [
                SetValue(ContractStorage(), Some(Pack(argument)))
            ]),
    );
```

## Deserialize data

The expression `Unpack` deserialize a value of type `TBytes()` into the corresponding Michelson value of type `TOption(...)`.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#Unpack)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    None,
    Pack,
    TBytes,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorage(None())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TBytes())
            .code((argument) => [
                SetValue(ContractStorage(), Unpack(argument))
            ]),
    );
```
