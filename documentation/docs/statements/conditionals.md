# Conditional Controls

## If

`If` statement creates two distinct branches (`Then` and `Else`) that get executed conditionally depending on a given condition. The `Then` branch gets executed if the `<condition>` evaluates to `true`; otherwise, the `Else` branch is executed.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/statement.html#If)

```ts
const {
    Contract,
    EntryPoint,
    Equal,
    GetSender,
    ContractStorage,
    If,
    SetValue,
    TUnit,
    Bool,
    Address
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorage(Bool(false))
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TUnit())
            .code(() => [
                // if(<transaction>.<sender> === "tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN") {
                //     <contract>.<storage> = true;
                // } else {
                //     <contract>.<storage> = false;
                // }
                If(Equal(GetSender(), Address("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN")))
                    .Then([
                        SetValue(ContractStorage(), Bool(true))
                    ])
                    .Else([
                        SetValue(ContractStorage(), Bool(false))
                    ])
            ])
    );
```

## MatchVariant

`MatchVariant` statement specifies individual code branches for each possible value in a variant type.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/statement.html#MatchVariant)

```ts
const {
    Contract,
    EntryPoint,
    ContractStorage,
    MatchVariant,
    SetValue,
    TVariant,
    TString,
    String
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorage(String(''))
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(
                TVariant({
                    action1: TString(),
                    action2: TString()
                })
            )
            .code((argument) => [
                // switch(argument.variant) {
                //   case "action1":
                //     <contract>.<storage> = argument.payload;
                //     break;
                //   case "action2":
                //     <contract>.<storage> = argument.payload;
                //     break;
                // }
                MatchVariant(argument)
                    .Case('action1', (payload) => [
                        SetValue(ContractStorage(), payload)
                    ])
                    .Case('action2', (payload) => [
                        SetValue(ContractStorage(), payload)
                    ])
            ])
    );
```
