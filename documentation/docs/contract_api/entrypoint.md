# Entry Points

## Define an entrypoint

-  [TypeDoc](https://romarq.github.io/smartts-sdk/api/classes/core.EntryPoint.html)

```js
const { Contract, EntryPoint, SetValue, ContractStorage, TNat, GetLevel } = require('@tezwell/smartts-sdk');

const contract = new Contract()
    .setStorageType(TNat()) // Specify the storage type
    .addEntrypoint(
        new EntryPoint('entry_point_1')
            .setInputType(TNat()) // Specify the type of the entrypoint argument
            .code((arg) => [
                SetValue(ContractStorage(), arg) // Update contract storage
            ]);
    )
    .addEntrypoint(
        new EntryPoint('entry_point_2').code(() => [
            SetValue(ContractStorage(), GetLevel())
        ]);
    );
```
