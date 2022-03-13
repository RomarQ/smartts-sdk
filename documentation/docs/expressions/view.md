# On-Chain View

## Call an on-chain view

The expression `CallView` calls an on-chain view and returns a result of type `TOption(<any>)`.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/expression.html#CallView)

#### Usage

```ts
const {
    Contract,
    EntryPoint,
    OnChainView,
    TOption,
    TBool,
    Not,
    ContractStorage,
    CallView,
    GetSelfAddress,
    SetValue,
    Return,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TOption(TBool()))
    .addView(
        new OnChainView('negate')
            .setInputType(TBool())
            .code((argument) => [Return(Not(argument))])
    )
    .addEntrypoint(
        new EntryPoint('ep1')
            .setInputType(TBool())
            .code((arg) => [
                SetValue(ContractStorage(), CallView('negate', GetSelfAddress(), arg, TBool())),
            ]),
    );
```
