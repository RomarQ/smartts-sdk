# Loop Controls

## For

The statement `For` lets you repeat a block of statements a specific number of times.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/statement.html#For)

```ts
const {
    Contract,
    EntryPoint,
    TUnit,
    For,
    NewVariable,
    SetValue,
    ContractStorage,
    GetVariable,
    List,
    Nat,
    PrependToList
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    // let <contract>.<storage> = [];
    .setStorage(List([]))
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TUnit())
            .code(() => [
                // let some_list = [];
                NewVariable("some_list", List([])),
                // for(let i = 0; i < 3; i=+1) {
                //   some_list = [...some_list, i];
                // }
                For(
                    Nat(0), /* let i = 0;   */
                    Nat(3), /* i < 3;       */
                    Nat(1)  /* i =+ 1       */
                ).Do((i) => [
                    SetValue(GetVariable("some_list"), PrependToList(GetVariable("some_list"), i))
                ]),
                // <contract>.<storage> = some_list;
                SetValue(ContractStorage(), GetVariable("some_list"))
            ])
    );
```

## ForEachOf

The `ForEachOf` lets you iterate over all elements of a `TList(...)` and apply a given block of statements on every iteration.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/statement.html#ForEachOf)

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

## While

The `While` statement lets you repeat a block of statements while a given condition evaluates to `true`.

- [TypeDoc](https://romarq.github.io/smartts-sdk/api/modules/statement.html#While)

```ts
const {
    Contract,
    EntryPoint,
    While,
    SetValue,
    Add,
    LessThanOrEqual,
    ContractStorage,
    Nat,
    TNat,
} = require('@tezwell/smartts-sdk');

const contract = new Contract()
    // let <contract>.<storage> = 0;
    .setStorage(Nat(0))
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TNat())
            .code((argument) => [
                // while (<contract>.<storage> <= argument) {
                //   <contract>.<storage> += 1;
                // }
                While(LessThanOrEqual(ContractStorage(), argument)).Do([
                    SetValue(ContractStorage(), Add(ContractStorage(), Nat(1))),
                ]),
            ]),
    );
```
