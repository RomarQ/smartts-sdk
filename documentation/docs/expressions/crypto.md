# Crypto

## Hashing

### SHA256

Compute a SHA-256 cryptographic hash.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#SHA256-1)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    None,
    Some,
    SHA256,
    TBytes,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorage(None())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TBytes())
            .code((arg) => [
                SetValue(ContractStorage(), Some(SHA256(arg)))
            ])
    );
```

### SHA512

Compute a SHA-512 cryptographic hash.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#SHA512-1)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    None,
    Some,
    SHA512,
    TBytes,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorage(None())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TBytes())
            .code((arg) => [
                SetValue(ContractStorage(), Some(SHA512(arg)))
            ])
    );
```

### SHA3

Compute a SHA3-256 cryptographic hash.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#SHA3-1)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    None,
    Some,
    SHA3,
    TBytes,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorage(None())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TBytes())
            .code((arg) => [
                SetValue(ContractStorage(), Some(SHA3(arg)))
            ])
    );
```

### BLAKE2B

Compute a Blake2B cryptographic hash.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#BLAKE2B-1)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    None,
    Some,
    BLAKE2B,
    TBytes,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorage(None())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TBytes())
            .code((arg) => [
                SetValue(ContractStorage(), Some(BLAKE2B(arg)))
            ])
    );
```

### KECCAK

Compute a Keccak-256 cryptographic hash.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#KECCAK-1)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    None,
    Some,
    BLAKE2B,
    TBytes,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorage(None())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TBytes())
            .code((arg) => [
                SetValue(ContractStorage(), Some(KECCAK(arg)))
            ])
    );
```
