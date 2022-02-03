const assert = require('assert');

const { DefineVar, Require, SetValue } = require('@tezwell/smartts-sdk/core/command');
const { TNat } = require('@tezwell/smartts-sdk/core/type');
const { Address, Nat, String } = require('@tezwell/smartts-sdk/core/literal');
const { Contract, EntryPoint, GetSender } = require('@tezwell/smartts-sdk');
const { ContractStorage, Equal, GetLocal } = require('@tezwell/smartts-sdk/core/expression');
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

assert.deepEqual(SmartML.compileContract(contract), [
    {
        prim: 'storage',
        args: [
            {
                prim: 'nat',
            },
        ],
    },
    {
        prim: 'parameter',
        args: [
            {
                prim: 'nat',
                annots: ['%ep1'],
            },
        ],
    },
    {
        prim: 'code',
        args: [
            [
                {
                    prim: 'CAR',
                },
                {
                    prim: 'PUSH',
                    args: [
                        {
                            prim: 'address',
                        },
                        {
                            string: 'tz1',
                        },
                    ],
                },
                {
                    prim: 'SENDER',
                },
                {
                    prim: 'COMPARE',
                },
                {
                    prim: 'EQ',
                },
                {
                    prim: 'IF',
                    args: [
                        [],
                        [
                            {
                                prim: 'PUSH',
                                args: [
                                    {
                                        prim: 'string',
                                    },
                                    {
                                        string: 'Not Admin!',
                                    },
                                ],
                            },
                            {
                                prim: 'FAILWITH',
                            },
                        ],
                    ],
                },
                {
                    prim: 'NIL',
                    args: [
                        {
                            prim: 'operation',
                        },
                    ],
                },
                {
                    prim: 'PAIR',
                },
            ],
        ],
    },
]);

console.info('[Passes] - CommonJS');
