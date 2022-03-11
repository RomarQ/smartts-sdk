# Contract

## Cast an address to a contract entrypoint

### ToContract

Returns a value of type `TContract(<entrypoint_argument_type>)`.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#ToContract)

```ts
const {
    Contract,
    EntryPoint,
    Transfer,
    ToContract,
    Unit,
    Mutez,
    Address,
    TUnit,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .code((arg) => [
                Transfer(
                    ToContract(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'), 'entry_point_1', TUnit()),
                    Mutez(100),
                    Unit(),
                ).send(),
            ]),
    );
```

### GetContract

Returns a value of type `TOption(TContract(<entrypoint_argument_type>))`.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#GetContract)

```ts
const {
    Contract,
    EntryPoint,
    Transfer,
    GetSome,
    GetContract,
    Unit,
    Mutez,
    String,
    Address,
    TUnit,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .code((arg) => [
                Transfer(
                    GetSome(
                        GetContract(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'), 'entry_point_1', TUnit()), String("CONTRACT_INVALID")
                    ),
                    Mutez(100),
                    Unit(),
                ).send(),
            ]),
    );
```

## Extract contract address

### ToAddress

Returns a value of type `TAddress()`.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#ToAddress)

```ts
const {
    Contract,
    EntryPoint,
    Transfer,
    SetValue,
    ToAddress,
    GetSelf,
    ContractStorage,
    String,
    TAddress,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TAddress())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .code((arg) => [
            .addEntrypoint(
                SetValue(ContractStorage(), ToAddress(GetSelf('entry_point_1'))),
            ]),
    );
```
