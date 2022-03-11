# Lambda

## Create a lambda

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#Lambda-1)

```ts
import { Lambda, If, Return , GreaterThan, Nat, String, TNat } from '@tezwell/smartts-sdk';

const lambda = Lambda()
    .setInputType(TNat())
    .code((arg) => [
        If(GreaterThan(arg, Nat(2)))
            .Then([Return(String('YES'))])
            .Else([Return(String('NO'))]),
    ]);
```

### Call a lambda

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#CallLambda)

```ts
import {
    Contract,
    EntryPoint,
    If,
    Return,
    SetValue,
    GreaterThan,
    Lambda,
    ContractStorage,
    CallLambda,
    Nat,
    String,
    Bool,
    TNat,
    TString
} from '@tezwell/smartts-sdk';

const lambda = Lambda()
    .setInputType(TNat())
    .code((arg) => [
        If(GreaterThan(arg, Nat(2)))
            .Then([Return(String('YES'))])
            .Else([Return(String('NO'))]),
    ]);

const contract = new Contract()
    .setStorageType(TString())
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .code((arg) => [
                SetValue(ContractStorage(), CallLambda(lambda, Bool(true))),
            ]),
    );
```
