# FA2

The contract described in this document is an implementation of [`TZIP-12`](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md) also known as `FA2`.

The contract source code can be found at: [Github (RomarQ/smartts-sdk)](https://github.com/RomarQ/smartts-sdk/blob/main/src/contracts/fa2.ts)

## Contract Structure

### Storage type

- config
    - administrator
    - paused
- assets
    - ledger
    - operators
    - token_metadata
    - token_total_supply
- metadata

```ts
TRecord(
    {
        config: TRecord(
            {
                administrator: TAddress(),
                paused: TBool(),
            },
            // Uses right combs by default
        ),
        assets: TRecord(
            {
                ledger: TBig_map(
                    TPair(TAddress(), TNat()),
                    TRecord(
                        {
                            balance: TNat(),
                        },
                        // Uses right combs by default
                    )
                ),
                operators: TBig_map(
                    TRecord(
                        {
                            owner: TAddress(),
                            operator: TAddress(),
                            token_id: TNat(),
                        },
                        ['owner', ['operator', 'token_id']],
                    ),
                    TUnit()
                ),
                token_metadata: TBig_map(
                    TNat(),
                    TRecord(
                        {
                            token_id: TNat(),
                            token_info: TMap(TString(), TBytes()),
                        },
                        // Uses right combs by default
                    )
                ),
                token_total_supply: TBig_map(TNat(), TNat()),
            },
            // Uses right combs by default
        ),
        metadata: TBig_map(TString(), TBytes()),
    },
    // Uses right combs by default
);

// Micheline

(pair
    (pair %config
        (address %administrator)
        (bool %paused)
    )
    (pair
        (pair %assets
            (big_map %ledger (pair address nat) nat)
            (pair
                (big_map %operators (pair (address %owner) (pair (address %operator) (nat %token_id))) unit)
                (pair
                    (big_map %token_metadata nat (pair (nat %token_id) (map %token_info string bytes)))
                    (big_map %token_total_supply nat nat)
                )
            )
        )
        (big_map %metadata string bytes)
    )
)
```

### Entry points

- [transfer](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md#transfer)

    - Argument Type

        ```ts
        TList(
            TRecord(
                {
                    from_: TAddress(),
                    txs: TList(
                        TRecord(
                            {
                                to_: TAddress(),
                                token_id: TNat(),
                                amount: TNat(),
                            },
                            ['to_', ['token_id', 'amount']],
                        ),
                    ),
                },
                ['from_', 'txs'],
            ),
        )

        // Micheline

        (list %transfer
          (pair
            (address %from_)
            (list %txs
              (pair
                (address %to_)
                (pair
                  (nat %token_id)
                  (nat %amount)
                )
              )
            )
          )
        )
        ```

- [update_operators](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md#update_operators)

    - Argument Type

        ```ts
        TList(
            TVariant(
                {
                    add_operator: FA2_Types.OperatorKey,
                    remove_operator: FA2_Types.OperatorKey,
                },
                ['add_operator', 'remove_operator'],
            ),
        )

        // Micheline

        (list %update_operators
          (or
            (pair %add_operator
              (address %owner)
              (pair
                (address %operator)
                (nat %token_id)
              )
            )
            (pair %remove_operator
              (address %owner)
              (pair
                (address %operator)
                (nat %token_id)
              )
            )
          )
        )
        ```

- [balance_of](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md#balance_of)

    - Argument Type

        ```ts
        TRecord(
            {
                requests: TList(
                    TRecord(
                        {
                            owner: TAddress(),
                            token_id: TNat(),
                        },
                        ['owner', 'token_id'],
                    ),
                ),
                callback: TContract(
                    TList(
                        TRecord(
                            {
                                request: TRecord(
                                    {
                                        owner: TAddress(),
                                        token_id: TNat(),
                                    },
                                    ['owner', 'token_id'],
                                ),
                                balance: TNat(),
                            },
                            ['request', 'balance'],
                        ),
                    ),
                ),
            },
            ['requests', 'callback'],
        )

        // Micheline

        (pair %balance_of
          (list %requests
            (pair
              (address %owner)
              (nat %token_id)
            )
          )
          (contract %callback
            (list
              (pair
                (pair %request
                  (address %owner)
                  (nat %token_id)
                )
                (nat %balance)
              )
            )
          )
        )
        ```

- mint

    - Argument type

        ```ts
        TRecord(
            {
                address: TAddress(),
                amount: TNat(),
                token_id: TNat(),
            },
            // Uses right combs by default
        )

        // Micheline

        (pair %mint (address %address) (pair (nat %amount) (nat %token_id)))
        ```

- pause

    - Argument type

        ```ts
        TBool()

        // Micheline

        (bool %pause)
        ```

- set_admin

    - Argument type

        ```ts
        TAddress()

        // Micheline

        (address %set_admin)
        ```

- update_metadata

    - Argument type

        ```ts
        TMap(TString(), TBytes())

        // Micheline

        (map %update_metadata string bytes)
        ```


### On-chain Views

- balance_of

    - Argument Type

        ```ts
        TList(
            TRecord(
                {
                    owner: TAddress(),
                    token_id: TNat(),
                },
                ['owner', 'token_id'],
            ),
        )

        // Micheline

        (list
            (pair
              (address %owner)
              (nat %token_id)
            )
        )
        ```

    - Output type

        ```ts
        TList(
            TRecord(
                {
                    request: TRecord(
                        {
                            owner: TAddress(),
                            token_id: TNat(),
                        },
                        ['owner', 'token_id'],
                    ),
                    balance: TNat(),
                },
                ['request', 'balance'],
            ),
        )

        // Micheline

        (list
            (pair
                (nat %balance)
                (pair %request
                    (address %owner)
                    (nat %token_id)
                )
            )
        )
        ```
## Contract Customization

The contract is customizable. Users can update/add/remove any entry points or views, including changing the storage type.

### Override/Add a new entry point

```ts
const {
    EntryPoint,
    NewVariable,
    SetValue,
    GetMapValue,
    GetVariable,
    ContractStorage,
    Pair,
    Record,
    Nat,
    Add
} = require("@tezwell/smartts-sdk");
const Compiler = require("@tezwell/smartts-sdk/compiler");

const { FA2_Contract, FA2_Type, FA2_Utils } = require("@tezwell/smartts-sdk/contracts/fa2");

const contract = FA2_Contract.addEntrypoint(
    new EntryPoint('mint')
        .setInputType(FA2_Type.Entrypoint.Mint)
        .code((entrypoint_arg) => [
            // Sender must be the administrator
            FA2_Utils.FailIfSenderIsNotAdmin(),
            // Create the ledger key
            NewVariable('ledger_key', Pair(entrypoint_arg.address, entrypoint_arg.token_id)),
            // Get the current ledger balance
            NewVariable(
                'balance',
                GetMapValue(ContractStorage().assets.ledger, GetVariable('ledger_key'), Record({ balance: Nat(0) }))
                    .balance,
            ),
            // Update ledger balance
            SetValue(
                GetMapValue(ContractStorage().assets.ledger, GetVariable('ledger_key')),
                Record({ balance: Add(GetVariable('balance'), entrypoint_arg.amount) }),
            ),
        ])
);

const contractJSON = Compiler.compileContract(contract).json;
```

### Remove an entry point

```ts
const Compiler = require("@tezwell/smartts-sdk/compiler");
const { FA2_Contract } = require("@tezwell/smartts-sdk/contracts/fa2");

const contract = FA2_Contract.removeEntrypoint("mint");

const contractJSON = Compiler.compileContract(contract).json;
```

### Override/Add a new on-chain view

```ts
const {
    OnChainView,
    NewVariable,
    ForEachOf,
    SetValue,
    Return,
    Require,
    MapContainsKey,
    GetMapValue,
    GetVariable,
    AsType,
    PrependToList,
    ContractStorage,
    Pair,
    List,
    Record,
    Nat,
    String
} = require("@tezwell/smartts-sdk");
const Compiler = require("@tezwell/smartts-sdk/compiler");
const { FA2_Contract, FA2_Type, FA2_Error, FA2_Utils } = require("@tezwell/smartts-sdk/contracts/fa2");

const contract = FA2_Contract.addView(
    new OnChainView('balance_of')
        .setInputType(FA2_Type.Entrypoint.BalanceOf)
        .code((argument) => [
                // Fail if contract is paused
                FA2_Utils.FailIfContractIsPaused(),
                // Iterate over each request and compute result
            NewVariable('responses', AsType(List([]), FA2_Type.View.BalanceOf.Output)),
                ForEachOf(argument.requests).Do((request) => [
                    // Fail if the token does not exist
                    Require(
                        MapContainsKey(ContractStorage().assets.token_total_supply, request.token_id),
                        String(FA2_Error.TOKEN_UNDEFINED),
                    ),
                    SetValue(
                        GetVariable('responses'),
                        PrependToList(
                            GetVariable('responses'),
                            Record({
                                request,
                                balance: GetMapValue(
                                    ContractStorage().assets.ledger,
                                    Pair(request.owner, request.token_id),
                                    Record({ balance: Nat(0) }),
                                ).balance,
                            }),
                        ),
                    ),
                ]),
                // Return response
                Return(GetVariable('responses')),
        ])
);

const contractJSON = Compiler.compileContract(contract).json;
```

### Remove an on-chain view

```ts
const Compiler = require("@tezwell/smartts-sdk/compiler");
const { FA2_Contract } = require("@tezwell/smartts-sdk/contracts/fa2");

const contract = FA2_Contract.removeView("balance_of");

const contractJSON = Compiler.compileContract(contract).json;
```

## Build the contract initial storage

```shell
npm install @tezwell/michelson-sdk
```

```ts
const { Record, Address, Bool, Big_map } = require('@tezwell/michelson-sdk');

const storageJSON = Record({
    config: Record({
        administrator: Address("tz1aBNXcSKfWE7aujp2Twa7V7Beua2fjhri3"),
        paused: Bool(false),
    }),
    assets: Record({
        ledger: Big_map(),
        operators: Big_map(),
        token_metadata: Big_map(),
        token_total_supply: Big_map(),
    }),
    metadata: Big_map(),
}).toJSON();
```

## Full example with taquito

### Install dependencies

```shell
npm install @tezwell/smartts-sdk @tezwell/michelson-sdk @taquito/taquito @taquito/signer
```

### Compile and originate contract

```ts
const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner } = require('@taquito/signer');

const { Record, Address, Bool, Big_map } = require('@tezwell/michelson-sdk');
const { FA2_Contract } = require("@tezwell/smartts-sdk/contracts/fa2");
const Compiler = require("@tezwell/smartts-sdk/compiler");

// Compile the contract and the initial storage
const compiledContract = Compiler.compileContract(FA2_Contract).json;
const compiledStorage = Record({
    config: Record({
        administrator: Address("tz1aBNXcSKfWE7aujp2Twa7V7Beua2fjhri3"),
        paused: Bool(false),
    }),
    assets: Record({
        ledger: Big_map(),
        operators: Big_map(),
        token_metadata: Big_map(),
        token_total_supply: Big_map(),
    }),
    metadata: Big_map(),
}).toJSON();

const Tezos = new TezosToolkit('https://ithacanet.visualtez.com');
Tezos.setProvider({
  signer: new InMemorySigner('edskS83aZUK3ijLrW5tTs1sDY3qLjSsMGyebKKLWP4RXSBh4LCivG2s1TezyZB5rEvvdqepXMg1MLcfBhS8VSJESN7L27hDpsX')
});

// Originate contract
Tezos.contract.originate({
    code: compiledContract,
    init: compiledStorage,
})
.then((op) => {
    console.log(`Waiting for ${op.hash} to be confirmed...`);
    return op.confirmation(1).then(() => op.contractAddress);
})
.then((contractAddress) => console.log("Contract originated:", contractAddress))
.catch((error) => console.log(error));
```

## Full example with ConseilJS


### Install dependencies

```shell
npm install @tezwell/smartts-sdk @tezwell/michelson-sdk conseiljs conseiljs-softsigner node-fetch@2 loglevel
```

### Compile and originate contract

```ts
const fetch = require('node-fetch');
const log = require('loglevel');

const { registerFetch, registerLogger, TezosMessageUtils, TezosParameterFormat, TezosNodeWriter } = require('conseiljs');
const { KeyStoreUtils, SoftSigner } = require('conseiljs-softsigner');

const { Record, Address, Bool, Big_map } = require('@tezwell/michelson-sdk');
const { FA2_Contract } = require("@tezwell/smartts-sdk/contracts/fa2");
const Compiler = require("@tezwell/smartts-sdk/compiler");

// Compile the contract and the initial storage
const compiledContract = Compiler.compileContract(FA2_Contract).json;
const compiledStorage = Record({
    config: Record({
        administrator: Address("tz1aBNXcSKfWE7aujp2Twa7V7Beua2fjhri3"),
        paused: Bool(false),
    }),
    assets: Record({
        ledger: Big_map(),
        operators: Big_map(),
        token_metadata: Big_map(),
        token_total_supply: Big_map(),
    }),
    metadata: Big_map(),
}).toJSON();

const logger = log.getLogger('conseiljs');
logger.setLevel('debug', false); // to see only errors, set to 'error'
registerLogger(logger);
registerFetch(fetch);

const RPC = 'https://ithacanet.visualtez.com';

(async () => {
    const keyStore = await KeyStoreUtils.restoreIdentityFromSecretKey('edskS83aZUK3ijLrW5tTs1sDY3qLjSsMGyebKKLWP4RXSBh4LCivG2s1TezyZB5rEvvdqepXMg1MLcfBhS8VSJESN7L27hDpsX');
    const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'), -1);


    const result = await TezosNodeWriter.sendContractOriginationOperation(
        RPC,
        signer,
        keyStore,
        0,
        undefined,
        100_000,
        32_000,
        100_000,
        JSON.stringify(compiledContract),
        JSON.stringify(compiledStorage),
        TezosParameterFormat.Micheline
    );

    console.log("Contract originated:", result.results.contents[0].metadata.operation_result.originated_contracts[0]);
})();
```
