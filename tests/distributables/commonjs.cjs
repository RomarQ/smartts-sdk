const assert = require('assert');

const { Contract, EntryPoint, GetSender } = require('@tezwell/smartts-sdk');
const { NewVariable, Require, SetValue } = require('@tezwell/smartts-sdk/statement');
const { TNat } = require('@tezwell/smartts-sdk/type');
const { Equal, ContractStorage, GetVariable, Address, Nat, String } = require('@tezwell/smartts-sdk/expression');
const SmartML = require('@tezwell/smartts-sdk/compiler');

const contract = new Contract().setStorage(Nat(0)).addEntrypoint(
    new EntryPoint('ep1').setInputType(TNat()).code((arg) => [
        // Define a variable named "some_address"
        NewVariable('some_address', Address('tz1')),
        // Require sender to be equal to variable "some_address", otherwise fail with "Not Admin!"
        Require(Equal(GetVariable('some_address'), GetSender()), String('Not Admin!')),
        // Replace the storage value with entry point argument
        SetValue(ContractStorage(), arg),
    ]),
);

assert.deepEqual(SmartML.compileContract(contract), {
    micheline:
        'parameter (nat %ep1);\n' +
        'storage   nat;\n' +
        'code\n' +
        '  {\n' +
        '    CAR;\n' +
        '    PUSH address "tz1";\n' +
        '    SENDER;\n' +
        '    COMPARE;\n' +
        '    EQ;\n' +
        '    IF\n' +
        '      {}\n' +
        '      {\n' +
        '        PUSH string "Not Admin!";\n' +
        '        FAILWITH;\n' +
        '      };\n' +
        '    NIL operation;\n' +
        '    PAIR;\n' +
        '  };',
    json: [
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
    ],
    smartpy:
        'import smartpy as sp\n' +
        '\n' +
        'class Contract(sp.Contract):\n' +
        '  def __init__(self):\n' +
        '    self.init_type(sp.TNat)\n' +
        '    self.init(0)\n' +
        '\n' +
        '  @sp.entry_point\n' +
        '  def ep1(self, params):\n' +
        '    sp.set_type(params, sp.TNat)\n' +
        `    some_address = sp.local("some_address", sp.address('tz1'))\n` +
        "    sp.verify(some_address.value == sp.sender, 'Not Admin!')\n" +
        '    self.data = params\n' +
        '\n' +
        'sp.add_compilation_target("visualtez_compilation", Contract())',
});

console.info('[Passes] - CommonJS');
