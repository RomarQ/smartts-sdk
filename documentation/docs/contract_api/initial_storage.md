# Initial Storage

## Define the initial storage

```js
const { Contract } = require('@tezwell/smartts-sdk');

const contract = new Contract().setStorage(Nat(0));
```

## Specify the storage type

```js
const { Contract } = require('@tezwell/smartts-sdk');

const contract = new Contract().setStorageType(TNat());
```
