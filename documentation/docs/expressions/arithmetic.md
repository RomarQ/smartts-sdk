# Arithmetic

## Addition

Adds two values.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#Add-1)

### Usage

```ts
const {
    Add,
    Nat,
    Int,
    Timestamp,
    Mutez,
    Bls12_381_fr,
    Bls12_381_g1,
    Bls12_381_g2,
} = require('@tezwell/smartts-sdk');

Add(Nat(1), Nat(1));                                // Nat(2)

Add(Int(1), Int(1));                                // Int(2)

Add(Mutez(1), Mutez(1));                            // Mutez(2)

Add(Bls12_381_fr(1), Bls12_381_fr(1));              // Bls12_381_fr(2)
Add(Bls12_381_g1("0x00"), Bls12_381_g1("0x00"));    // Bls12_381_g1("0x00")
Add(Bls12_381_g2("0x00"), Bls12_381_g2("0x00"));    // Bls12_381_g2("0x00")
```

## Subtraction

Subtract two values.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#Subtract-1)

### Usage

```ts
const {
    Subtract,
    Nat,
    Int,
    Timestamp,
    Mutez
} = require('@tezwell/smartts-sdk');

Subtract(Nat(1), Nat(1));               // Int(0)

Subtract(Int(1), Int(1));               // Int(0)

Subtract(Timestamp(1), Timestamp(1));   // Int(0)

Subtract(Mutez(1), Mutez(1));           // Mutez(0)
```

## Multiplication

Multiply two values.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#Multiply-1)

### Usage

```ts
const {
    Multiply,
    Nat,
    Int,
    Mutez,
    Bls12_381_fr,
    Bls12_381_g1,
    Bls12_381_g2
} = require('@tezwell/smartts-sdk');

Multiply(Nat(1), Nat(1));                           // Nat(1)

Multiply(Nat(1), Int(1));                           // Int(1)

Multiply(Int(1), Int(1));                           // Int(1)

Multiply(Mutez(1), Nat(1));                         // Mutez(1)

Multiply(Nat(1), Bls12_381_fr(1));                  // Bls12_381_fr(2)
Multiply(Int(1), Bls12_381_fr(1));                  // Bls12_381_fr(2)
Multiply(Bls12_381_fr(1), Bls12_381_fr(1));         // Bls12_381_fr(2)
Multiply(Bls12_381_g1("0x00"), Bls12_381_fr(0));    // Bls12_381_g1("0x00")
Multiply(Bls12_381_g2("0x00"), Bls12_381_fr(0));    // Bls12_381_g2("0x00")
```

## Euclidean Division

### Division

Performs the euclidean division and extracts the `quotient` from the result.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#Divide-1)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    Divide,
    Nat,
    TNat,
} = require('@tezwell/smartts-sdk');


const contract = new Contract()
    .setStorageType(TNat())
    .addEntrypoint(
        new EntryPoint('ep1').code(() => [
            SetValue(ContractStorage(), Divide(Nat(10), Nat(2)))
        ]),
    );
```

### Modulus

Performs the euclidean division and extracts the `remainder` from the result.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#Mod)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    Mod,
    Nat,
    TNat,
} = require('@tezwell/smartts-sdk');


const contract = new Contract()
    .setStorageType(TNat())
    .addEntrypoint(
        new EntryPoint('ep1').code(() => [
            SetValue(ContractStorage(), Mod(Nat(10), Nat(2)))
        ]),
    );
```

### EuclideanDivision

Performs the euclidean division returns the whole result of type `TOption(TPair(TNat(), TNat()))`.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#EuclideanDivision)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    EuclideanDivision,
    Nat,
    TOption,
    TPair,
    TNat,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TOption(TPair(TNat(), TNat())))
    .addEntrypoint(
        new EntryPoint('ep1').code(() => [
            SetValue(ContractStorage(), EuclideanDivision(Nat(13), Nat(3)))
        ]),
    );
```

## Logical left shift

The logically left shift produces the first number logically left-shifted by second number.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#ShiftLeft)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    ShiftLeft,
    Nat,
    TNat,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TNat())
    .addEntrypoint(
        new EntryPoint('ep1').code(() => [
            SetValue(ContractStorage(), ShiftLeft(Nat(2), Nat(1)))
        ]),
    );
```

## Logical right shift

The logically right shift produces the first number logically right-shifted by second number.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#ShiftRight)

```ts
const {
    Contract,
    EntryPoint,
    SetValue,
    ContractStorage,
    ShiftRight,
    Nat,
    TNat,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TNat())
    .addEntrypoint(
        new EntryPoint('ep1').code(() => [
            SetValue(ContractStorage(), ShiftRight(Nat(2), Nat(1)))
        ]),
    );
```
