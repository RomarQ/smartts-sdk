import assert from 'assert';

import SmartTS from '@tezwell/smartts-sdk';
const {
    Comparison,
    Contract,
    EntryPoint,
    Address,
    Nat,
    String,
    TNat,
    NewVariable,
    Require,
    SetValue,
    ContractStorage,
    GetVariable,
    GetSender,
} = SmartTS;
import SmartML from '@tezwell/smartts-sdk/compiler';

const contract = new Contract()
    .setStorage(Nat(0))
    .addEntrypoint(
        new EntryPoint('ep1').inputType(TNat()).code((arg) => [
            // Define a variable named "some_address"
            NewVariable('some_address', Address('tz1')),
            // Require sender to be equal to variable "some_address", otherwise fail with "Not Admin!"
            Require(Comparison.Equal(GetVariable('some_address'), GetSender()), String('Not Admin!')),
            // Replace the storage value with entry point argument
            SetValue(ContractStorage(), arg),
        ]),
    )
    .toString();

assert.deepEqual(SmartML.default.compileContract(contract), [
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

console.info('[Passes] - ESM');
