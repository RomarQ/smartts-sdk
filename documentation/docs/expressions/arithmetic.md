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

## Division

Performs the euclidean division and extracts the quotient from the result.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#Divide-1)

### Usage

```ts
const {
    Divide,
    Nat
} = require('@tezwell/smartts-sdk');

Divide(Nat(10), Nat(2));               // Nat(5)
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
