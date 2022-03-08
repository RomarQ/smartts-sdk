import assert from 'assert';

import SmartTS from '@tezwell/smartts-sdk';
const {
    Equal,
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

assert.deepEqual(SmartML.default.compileContract(contract), {
    micheline:
        'parameter (nat %ep1);\n' +
        'storage   nat;\n' +
        'code\n' +
        '  {\n' +
        '    CAR;        # @parameter\n' +
        '    # == ep1 ==\n' +
        `    # some_address = sp.local("some_address", sp.address('tz1')) # @parameter\n` +
        '    PUSH address "tz1"; # address : @parameter\n' +
        "    # sp.verify(some_address.value == sp.sender, 'Not Admin!') # address : @parameter\n" +
        '    SENDER;     # @sender : address : @parameter\n' +
        '    COMPARE;    # int : @parameter\n' +
        '    EQ;         # bool : @parameter\n' +
        '    IF\n' +
        '      {}\n' +
        '      {\n' +
        '        PUSH string "Not Admin!"; # string : @parameter\n' +
        '        FAILWITH;   # FAILED\n' +
        '      }; # @parameter\n' +
        '    # self.data = params # @parameter\n' +
        '    NIL operation; # list operation : @parameter\n' +
        '    PAIR;       # pair (list operation) @parameter\n' +
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
});

console.info('[Passes] - ESM');
