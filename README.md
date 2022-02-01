# SmartTS SDK
![CI](https://github.com/RomarQ/smartts-sdk/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/RomarQ/smartts-sdk/badge.svg?branch=main)](https://coveralls.io/github/RomarQ/smartts-sdk?branch=main)

`SmartTS SDK` is a metaprogramming framework for building Tezos smart contracts from Javascript. It uses the SmartPy compiler.

```js
import { DefineVar, Require, SetValue } from '@tezwell/smartts-sdk/core/command';
import { TNat } from '@tezwell/smartts-sdk/core/type';
import { Address, Nat, String } from '@tezwell/smartts-sdk/core/literal';
import { Contract, EntryPoint, GetSender } from '@tezwell/smartts-sdk/core';
import { ContractStorage, Equal, GetLocal } from '@tezwell/smartts-sdk/core/expression';
import SmartML from '@tezwell/smartts-sdk/smartml';

const contract = new Contract()
    .setStorage(Nat(0))
    .addEntrypoint(
        new EntryPoint('ep1')
            .inputType(TNat)
            .code((arg) => [
                // Define a variable named "some_address"
                DefineVar('some_address', Address('tz1')),
                // Require sender to be equal to variable "some_address", otherwise fail with "Not Admin!"
                Require(Equal(GetLocal('some_address'), GetSender()), String('Not Admin!')),
                // Replace the storage value with entry point argument
                SetValue(ContractStorage(), arg),
            ])
    ).toString();

SmartML.compileContract(contract);
```

## **About**

Project was supported by **Tezos Foundation**.
