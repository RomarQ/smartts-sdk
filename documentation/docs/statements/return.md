# Return values (Views/Lambdas)

## Return

The `Return` statement can be used to return values inside `lambdas` of `views`. (`Entry points` do not return values.)

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/statement.html#Return)

#### Usage

```typescript
import {
    Contract,
    EntryPoint,
    OnChainView,
    If,
    Return,
    SetValue,
    GreaterThan,
    Not,
    Lambda,
    ContractStorage,
    GetSelfAddress,
    CallLambda,
    CallView,
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
            .Then([Return(String('YES'))])  // Return "YES" if true
            .Else([Return(String('NO'))]),  // Return "NO" if false
    ]);

const contract = new Contract()
    .setStorageType(TOption(TString()))
    .addView(
        new OnChainView('some_view')
            .setInputType(TNat())
            .code((argument) => [
                Return(CallLambda(lambda, argument))
            ])
    )
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .code((arg) => [
                SetValue(ContractStorage(), CallView('some_view', GetSelfAddress(), arg, TString())),
            ]),
    );
```
