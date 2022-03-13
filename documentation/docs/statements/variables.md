# Declaring variables

## NewVariable

The statement `NewVariable` is used to declare local scoped variables.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/statement.html#NewVariable)

```ts
const {
    Contract,
    EntryPoint,
    ContractStorage,
    ForEachOf,
    NewVariable,
    SetValue,
    Add,
    PrependToList,
    GetVariable,
    TUnit,
    List,
    Nat
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    // let <contract>.<storage> = [1, 2, 3];
    .setStorage(List([Nat(1), Nat(2), Nat(3)]))
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TUnit())
            .code(() => [
                // let sum = 0;
                NewVariable("sum", Nat(0)),
                // <contract>.<storage>.forEach((el) => {
                //   sum += el;
                // })
                ForEachOf(ContractStorage()).Do((el) => [
                    SetValue(GetVariable("sum"), Add(GetVariable("sum"), el))
                ]),
                // <contract>.<storage> = [...<contract>.<storage>, sum];
                SetValue(ContractStorage(), PrependToList(ContractStorage(), GetVariable("sum")))
            ])
    );
```
