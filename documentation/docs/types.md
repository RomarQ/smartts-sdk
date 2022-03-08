# Types

## Singleton Types

### nat

Naturals are arbitrary-precision, meaning that the only size limit is gas.

```ts
const { TNat } = require('@tezwell/smartts-sdk');

const type = TNat();
```
- [Value Example](./literals#nat)

### int

Integers are arbitrary-precision, meaning that the only size limit is gas.

```ts
const { TInt } = require('@tezwell/smartts-sdk');

const type = TInt();
```
- [Value Example](./literals#int)

### mutez

Mutez (micro-Tez) are internally represented by **64-bit** signed integers. These are restricted to prevent creating a negative amount of mutez.

```ts
const { TMutez } = require('@tezwell/smartts-sdk');

const type = TMutez();
```
- [Value Example](./literals#mutez)

### string

The current version of Michelson restricts strings to be the printable subset of **7-bit ASCII**, namely characters with codes from within [32, 126] range, plus the following escape characters `\n`, `\\`, `\"`.

```ts
const { TString } = require('@tezwell/smartts-sdk');

const type = TString();
```
- [Value Example](./literals#string)

### bool

The type for booleans whose values are `True` and `False`.

```ts
const { TBool } = require('@tezwell/smartts-sdk');

const type = TBool();
```
- [Value Example](./literals#bool)

### bytes

Bytes are used for serializing data, in order to check signatures and compute hashes on them. They can also be used to incorporate data from the wild and untyped outside world.

```ts
const { TBytes } = require('@tezwell/smartts-sdk');

const type = TBytes();
```
- [Value Example](./literals#bytes)

### address

The type `address` gives the guarantee that the value has the form of a Tezos address, as opposed to contract that guarantees that the value is indeed a valid, existing account.

A valid Tezos address is a string prefixed by either `tz1`, `tz2`, `tz3` or `KT1` and followed by a Base58 encoded hash and terminated by a 4-byte checksum.

The prefix designates the type of address:

- **`tz1`** addresses are followed by a ed25519 public key hash
- **`tz2`** addresses are followed by a Secp256k1 public key hash
- **`tz3`** addresses are followed by a NIST p256r1 public key hash
- **`KT1`** addresses are followed by a contract hash

Addresses prefixed by tz1, tz2 and tz3 designate implicit accounts, whereas those prefixed KT1 designate originated accounts.

Addresses can also specify an entrypoint, with a `%<entrypoint_name>` suffix.

```ts
const { TAddress } = require('@tezwell/smartts-sdk');

const type = TAddress();
```
- [Value Example](./literals#address)

### timestamp

The type `timestamp` is used to represent timestamps that are written as the number of seconds since Epoch.

```ts
const { TTimestamp } = require('@tezwell/smartts-sdk');

const type = TTimestamp();
```
- [Value Example](./literals#timestamp)

### chain_id

The type `chain_id` represents an identifier for a chain, used to distinguish the test and the main chains.

```ts
const { TChain_id } = require('@tezwell/smartts-sdk');

const type = TChain_id();
```
- [Value Example](./literals#chain_id)

### bls12_381_fr

The type `bls12_381_fr` represents an element of the scalar field Fr, used for scalar multiplication on the BLS12-381 curves G1 and G2.

```ts
const { TBls12_381_fr } = require('@tezwell/smartts-sdk');

const type = TBls12_381_fr();
```
- [Value Example](./literals#bls12_381_fr)

### bls12_381_g1

The type `bls12_381_g1` represents a point on the BLS12-381 curve G1.

```ts
const { TBls12_381_g1 } = require('@tezwell/smartts-sdk');

const type = TBls12_381_g1();
```
- [Value Example](./literals#bls12_381_g1)

### bls12_381_g2

The type `bls12_381_g2` represents a point on the BLS12-381 curve G2.

```ts
const { TBls12_381_g2 } = require('@tezwell/smartts-sdk');

const type = TBls12_381_g2();
```
- [Value Example](./literals#bls12_381_g2)

### key

The type `key` represents a public cryptographic key.

```ts
const { TKey } = require('@tezwell/smartts-sdk');

const type = TKey();
```
- [Value Example](./literals#key)

### key_hash

The type `key_hash` represents a hash of a public cryptographic key.

```ts
const { TKey_hash } = require('@tezwell/smartts-sdk');

const type = TKey_hash();
```
- [Value Example](./literals#key_hash)

### signature

The type `signature` represents a cryptographic signature.

```ts
const { TSignature } = require('@tezwell/smartts-sdk');

const type = TSignature();
```
- [Value Example](./literals#signature)

### unit

The type whose only value is Unit, to use as a placeholder when some result or parameter is non-necessary.

```ts
const { TUnit } = require('@tezwell/smartts-sdk');

const type = TUnit();
```
- [Value Example](./literals#unit)

### operation

The type `operation` represents an internal operation emitted by a contract.

```ts
const { TOperation } = require('@tezwell/smartts-sdk');

const type = TOperation();
```

### never

The type `never` is used to represent an unreachable branch.

```ts
const { TNever } = require('@tezwell/smartts-sdk');

const type = TNever();
```

## Container types

### list

The `list` type reprensents a immutable and homogeneous linked list.

```ts
const { TList, TNat } = require('@tezwell/smartts-sdk');

const type = TList(TNat());
```
- [Value Example](./literals#list)

### set

The `set` type is used to represent sequences of unique elements.

```ts
const { TSet, TNat } = require('@tezwell/smartts-sdk');

const type = TSet(TNat());
```
- [Value Example](./literals#set)

### option

The `option` type is used to represent an optional value.

```ts
const { TOption, TNat } = require('@tezwell/smartts-sdk');

const type = TOption(TNat());
```
- [Value Example (Some)](./literals#some)
- [Value Example (None)](./literals#none)

### pair

The `pair` type represents a binary tuple composed of a left element and a right element.

```ts
const { TPair, TNat, TString } = require('@tezwell/smartts-sdk');

const type = TPair(TString(), TNat());
```
- [Value Example](./literals#pair)

### or

The type `or` represents a union of two types. Used for type variance. (e.g. number | string)

```ts
const { TOr, TNat, TString } = require('@tezwell/smartts-sdk');

const type = TOr(TString(), TNat());
```
- [Value Example (Left)](./literals#left)
- [Value Example (Right)](./literals#right)

### map

```ts
const { TMap, TNat, TString } = require('@tezwell/smartts-sdk');

const type = TMap(TString(), TNat());
```
[Value Example](./literals#map)

### big_map

The type `big_map` is used to represent lazily deserialized maps.

```ts
const { TBigMap, TNat, TString } = require('@tezwell/smartts-sdk');

const type = TBigMap(TString(), TNat());
```
[Value Example](./literals#big_map)

### lambda

The type `lambda` represents a function signature.

```ts
const { TLambda, TNat, TString } = require('@tezwell/smartts-sdk');

const type = TLambda(TString(), TNat());
```
[Value Example](./literals#lambda)

### ticket

The type `ticket` represents a ticket used to authenticate information.

```ts
const { TTicket, TString } = require('@tezwell/smartts-sdk');

const type = TTicket(TString());
```

### contract

The type `contract` represents the interface and address of a contract entrypoint.

```ts
const { TContract, TString } = require('@tezwell/smartts-sdk');

const type = TContract(TString());
```

### sapling_state

Michelson reference [sapling_state](https://tezos.gitlab.io/michelson-reference/#type-sapling_state).

```ts
const { TSapling_state } = require('@tezwell/smartts-sdk');

const type = TSapling_state(8);
```

### sapling_transaction

Michelson reference [sapling_transaction](https://tezos.gitlab.io/michelson-reference/#type-sapling_transaction).

```ts
const { TSapling_transaction } = require('@tezwell/smartts-sdk');

const type = TSapling_transaction(8);
```

## Artificial types

### record

A `TRecord` is an artificial type composed of nested `pair's` with annotated leaves to simulate a dictionary.

```ts
const { TRecord, TNat, TInt, TBytes } = require('@tezwell/smartts-sdk');

const type = TRecord(
    {
        field1: TNat(),
        field2: TInt(),
        field3: TBytes()
    },
    // Optional argument (defaults to right combs)
    ["field1", ["field2", "field3"]]
);
```
[Value Example](./literals#record)

### variant

A `TVariant` is an artificial type composed of nested `or's` with annotated leaves to create a union type.

```ts
const { TVariant, TNat, TInt, TBytes } = require('@tezwell/smartts-sdk');

const type = TVariant(
    {
        branch1: TNat(),
        branch2: TInt(),
        branch3: TBytes()
    },
    // Optional argument (defaults to right combs)
    ["branch1", ["branch2", "branch3"]]
);
```
[Value Example](./literals#variant)
