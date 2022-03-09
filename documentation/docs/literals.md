# Literal Expressions

## Singleton Literals

### Nat

- [Type reference](./types#nat)

```ts
import { Nat } from '@tezwell/smartts-sdk';

const literal = Nat(1);
```

### Int

- [Type reference](./types#int)

```ts
import { Int } from '@tezwell/smartts-sdk';

const literal = Int(1);
```

### Mutez

- [Type reference](./types#mutez)

```ts
import { Mutez } from '@tezwell/smartts-sdk';

const literal = Mutez(1);
```

### String

- [Type reference](./types#string)

```ts
import { String } from '@tezwell/smartts-sdk';

const literal = String("A String");
```

### Bool

- [Type reference](./types#bool)

```ts
import { Bool } from '@tezwell/smartts-sdk';

const literal = Bool(true);
```

### Bytes

- [Type reference](./types#bytes)

```ts
import { Bytes } from '@tezwell/smartts-sdk';

const literal = Bytes("0xfffF");
```

### Address

- [Type reference](./types#address)

```ts
import { Address } from '@tezwell/smartts-sdk';

const literal = Address("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN");
```

### Timestamp

- [Type reference](./types#timestamp)

```ts
import { Timestamp } from '@tezwell/smartts-sdk';

const literal = Timestamp(1571659294);
```

### Chain_id

- [Type reference](./types#chain_id)

```ts
import { Chain_id } from '@tezwell/smartts-sdk';

const literal = Chain_id("0x7a06a770");
```

### Bls12_381_fr

- [Type reference](./types#bls12_381_fr)

```ts
import { Bls12_381_fr } from '@tezwell/smartts-sdk';

const literal = Bls12_381_fr("0x0001");
```

### Bls12_381_g1

- [Type reference](./types#bls12_381_g1)

```ts
import { Bls12_381_g1 } from '@tezwell/smartts-sdk';

const literal = Bls12_381_g1("0x0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28");
```

### Bls12_381_g2

- [Type reference](./types#bls12_381_g2)

```ts
import { Bls12_381_g2 } from '@tezwell/smartts-sdk';

const literal = Bls12_381_g2("0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa");
```

### Key

- [Type reference](./types#key)

```ts
import { Key } from '@tezwell/smartts-sdk';

const literal = Key("edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT");
```

### Key_hash

- [Type reference](./types#key)

```ts
import { Key_hash } from '@tezwell/smartts-sdk';

const literal = Key_hash("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN");
```

### Signature

- [Type reference](./types#signature)

```ts
import { Signature } from '@tezwell/smartts-sdk';

const literal = Signature("sigsAujsNePapNNGsVotTvcKWMNNJja9B4a2FfAe8vExzFhEgEo1GTQStiif22uSA6iNxPGCGsXsRyeLHzeLbJL2y8CnYuNe");
```

### Unit

- [Type reference](./types#unit)

```ts
import { Unit } from '@tezwell/smartts-sdk';

const literal = Unit();
```

## Container Literals

### Left

- [Type reference](./types#or)

```ts
import { Left, Nat } from '@tezwell/smartts-sdk';

const literal = Left(Nat(1));
```

### Right

- [Type reference](./types#or)

```ts
import { Right, Nat } from '@tezwell/smartts-sdk';

const literal = Right(Nat(1));
```

### List

- [Type reference](./types#list)

```ts
import { List, Nat } from '@tezwell/smartts-sdk';

const literal = List([Nat(1), Nat(2)]);
```

### Set

- [Type reference](./types#set)

```ts
import { Set, Nat } from '@tezwell/smartts-sdk';

const literal = Set([Nat(1), Nat(2)]);
```

### Some

- [Type reference](./types#option)

```ts
import { Some, Nat } from '@tezwell/smartts-sdk';

const literal = Some(Nat(1));
```

### None

- [Type reference](./types#option)

```ts
import { None } from '@tezwell/smartts-sdk';

const literal = None();
```

### Pair

- [Type reference](./types#pair)

```ts
import { Pair, Nat, String } from '@tezwell/smartts-sdk';

const literal = Pair(Nat(1), String("A String"));
```

### Map

- [Type reference](./types#map)

```ts
import { Map, Nat, String } from '@tezwell/smartts-sdk';

const literal = Map(
    [
        [Nat(1), String("A String 1")],
        [Nat(2), String("A String 2")],
    ]
);
```

### Big_map

- [Type reference](./types#big_map)

```ts
import { Big_map, Nat, String } from '@tezwell/smartts-sdk';

const literal = Big_map(
    [
        [Nat(1), String("A String 1")],
        [Nat(2), String("A String 2")],
    ]
);
```
### Lambda

- [Type reference](./types#lambda)

```ts
import { Lambda, If, String, GreaterThan, Nat, Return } from '@tezwell/smartts-sdk';

const literal = Lambda().code((arg) => [
    If(GreaterThan(arg, Nat(2)))
        .Then([Return(String('YES'))])
        .Else([Return(String('NO'))]),
]);
```

- [Type reference](./types#ticket)

```ts
import { Ticket, String, Nat } from '@tezwell/smartts-sdk';

const literal = Ticket(String('A Ticket'), Nat(1));
```

- [Type reference](./types#sapling_state)

```ts
import { Sapling_state } from '@tezwell/smartts-sdk';

const literal = Sapling_state(8);
```

### Record

- [Type reference](./types#record)

```ts
import { Record, Nat, String, Bytes } from '@tezwell/smartts-sdk';

const literal = Record(
    {
        field1: Nat(1),
        field2: String("A String"),
        field3: Bytes("0x01"),
    },
    [['field1', 'field2'], 'field3'],
);
```

### Variant

- [Type reference](./types#variant)

```ts
import { Variant, Nat } from '@tezwell/smartts-sdk';

const literal = Variant("action", Nat(1));
```
