---
sidebar_position: 1
slug: /
---

# Overview
![CI](https://github.com/RomarQ/smartts-sdk/workflows/CI/badge.svg)
![Coverage Status](https://coveralls.io/repos/github/RomarQ/smartts-sdk/badge.svg?branch=main)

**`SmartTS SDK`** is a metaprogramming framework for building Tezos smart contracts from Javascript.

<hr/>

## [TypeDoc](https://romarq.github.io/smartts-sdk/api)

<hr/>

## Getting Started

### Install the package

```shell
npm install @tezwell/smartts-sdk
```

### Use the package

#### Build and compile contract

```js
const { Contract, EntryPoint, GetSender } = require('@tezwell/smartts-sdk');
const { DefineVar, Require, SetValue } = require('@tezwell/smartts-sdk/core/command');
const { TNat } = require('@tezwell/smartts-sdk/core/type');
const { ContractStorage, Equal, GetLocal, Address, Nat, String } = require('@tezwell/smartts-sdk/core/expression');
const SmartML = require('@tezwell/smartts-sdk/smartml');

const contract = new Contract()
    .setStorage(Nat(0))
    .addEntrypoint(
        new EntryPoint('ep1').inputType(TNat()).code((arg) => [
            // Define a variable named "some_address"
            DefineVar('some_address', Address('tz1')),
            // Require sender to be equal to variable "some_address", otherwise fail with "Not Admin!"
            Require(Equal(GetLocal('some_address'), GetSender()), String('Not Admin!')),
            // Replace the storage value with entry point argument
            SetValue(ContractStorage(), arg),
        ]),
    )
    .toString();

SmartML.compileContract(contract);
```
