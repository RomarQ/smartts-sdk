import type { IType } from '../typings/type';
import type { IStatement } from '../typings/statement';
import type { IExpression } from '../typings/expression';

import { capitalizeBoolean, LineInfo, quote } from '../misc/utils';
import { TUnknown } from '../type';
import ValueAtom from '../core/enums/literal';
import { LambdaLiteral, LiteralExpression, MapLiteral, RecordLiteral } from '../core/expression';
import { ILiteral } from '../typings/literal';

/**
 * Build a literal of type unit.
 *
 * ```typescript
 * Unit();
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-unit
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Unit = (line = new LineInfo()) => new LiteralExpression(ValueAtom.unit, [], line);

/**
 * Build a literal of type nat.
 *
 * ```typescript
 * Nat(1);
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-nat
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Nat = (value: number, line = new LineInfo()) => new LiteralExpression(ValueAtom.nat, [value], line);

/**
 * Build a literal of type int.
 *
 * ```typescript
 * Int(1);
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-int
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Int = (value: number, line = new LineInfo()) => new LiteralExpression(ValueAtom.int, [value], line);

/**
 * Build a literal of type mutez.
 *
 * ```typescript
 * Mutez(1);
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-mutez
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Mutez = (value: number, line = new LineInfo()) => new LiteralExpression(ValueAtom.mutez, [value], line);

/**
 * Build a literal of type string.
 * ```typescript
 * String("Some String");
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-string
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const String = (value: string, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.string, [quote(value)], line);

/**
 * Build a literal of type bool.
 *
 * ```typescript
 * Bool(false);
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-bool
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Bool = (value: boolean, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.bool, [capitalizeBoolean(value)], line);

/**
 * Build a literal of type address.
 *
 * ```typescript
 * Address("KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT");
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-address
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Address = (address: string, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.address, [address], line);

/**
 * Build a literal of type timestamp. (The input is the number of seconds since Epoch)
 *
 * ```typescript
 * Timestamp(1000);
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-timestamp
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Timestamp = (timestamp: number, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.timestamp, [timestamp], line);

/**
 * Build a literal of type chain_id. (Represents a chain identifier)
 *
 * ```typescript
 * Chain_id("0x00");
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-chain_id
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Chain_id = (chainID: string, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.chain_id_cst, [chainID], line);

/**
 * Build a literal of type bytes.
 *
 * ```typescript
 * Bytes("0x01");
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-bytes
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Bytes = (bytes: string, line = new LineInfo()) => new LiteralExpression(ValueAtom.bytes, [bytes], line);

/**
 * Build a literal of type bls12_381_fr.
 *
 * ```typescript
 * Bls12_381_fr("0x0001");
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-bls12_381_fr
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Bls12_381_fr = (fr: string | number, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.bls12_381_fr, [fr], line);

/**
 * Build a literal of type bls12_381_g1.
 *
 * ```typescript
 * Bls12_381_g1("0x0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28");
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-bls12_381_g1
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Bls12_381_g1 = (bytes: string, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.bls12_381_g1, [bytes], line);

/**
 * Build a literal of type bls12_381_g2.
 *
 * ```typescript
 * Bls12_381_g2("0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa");
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-bls12_381_g2
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Bls12_381_g2 = (bytes: string, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.bls12_381_g2, [bytes], line);

/**
 * Build a literal of type key.
 *
 * ```typescript
 * Key("edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT");
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-key
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Key = (key: string, line = new LineInfo()) => new LiteralExpression(ValueAtom.key, [key], line);

/**
 * Build a literal of type key_hash.
 *
 * ```typescript
 * Key_hash("tz28QJHLyqvaY2rXAoFZTbxrXeD88NA8wscC");
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-key_hash
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Key_hash = (key_hash: string, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.key_hash, [key_hash], line);

/**
 * Build a literal of type signature.
 *
 * ```typescript
 * Signature("sigsAujsNePapNNGsVotTvcKWMNNJja9B4a2FfAe8vExzFhEgEo1GTQStiif22uSA6iNxPGCGsXsRyeLHzeLbJL2y8CnYuNe");
 * ```
 *
 * @category | Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-signature
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Signature = (signature: string, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.signature, [signature], line);

/**
 * Build a literal of type list.
 *
 * ```typescript
 * List([Nat(1)]);
 * ```
 *
 * @category | Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-list
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const List = (items: IExpression[], line = new LineInfo()) => new LiteralExpression(ValueAtom.list, items, line);

/**
 * Build a literal of type set.
 *
 * ```typescript
 * Set([Nat(1)]);
 * ```
 *
 * @category | Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-set
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Set = (items: IExpression[], line = new LineInfo()) => new LiteralExpression(ValueAtom.set, items, line);

/**
 * Build a literal of type option. (Wraps an existing optional value)
 *
 * ```typescript
 * Some(Nat(1));
 * ```
 *
 * @category | Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SOME
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Some = (value: IExpression, line = new LineInfo()): ILiteral<ValueAtom.option> =>
    new LiteralExpression(ValueAtom.Some, [value], line) as any;

/**
 * Build a literal of type option. (Used to represent an absent optional value)
 *
 * ```typescript
 * None();
 * ```
 *
 * @category | Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#instr-NONE
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const None = (line = new LineInfo()): ILiteral<ValueAtom.option> =>
    new LiteralExpression(ValueAtom.None, [], line) as any;

/**
 * Build a literal of type map.
 *
    ```typescript
        Map([
            [Nat(1), String('WORD1')],
            [Nat(2), String('WORD2')],
        ]);
    ```
 *
 * @category | Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-map
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Map = (
    rows: IExpression[][] = [],
    keyType: IType = TUnknown(),
    valueType: IType = TUnknown(),
    line = new LineInfo(),
) => new MapLiteral(ValueAtom.map, rows, keyType, valueType, line);

/**
 * Build a literal of type big_map.
 *
    ```typescript
        Big_map([
            [Nat(1), String('WORD1')],
            [Nat(2), String('WORD2')],
        ]);
    ```
 *
 * @category | Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-big_map
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Big_map = (
    rows: IExpression[][] = [],
    keyType: IType = TUnknown(),
    valueType: IType = TUnknown(),
    line = new LineInfo(),
) => new MapLiteral(ValueAtom.big_map, rows, keyType, valueType, line);

/**
 * Build a literal of type pair. (A binary tuple of values)
 *
    ```typescript
        Pair(Nat(1), Bool(false));
    ```
 *
 * @category | Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-pair
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Pair = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.tuple, [left, right], line);

/**
 * Build a literal of type lambda.
 *
    ```typescript
        Lambda()
            .setInputType(TString())
            .code((arg) => [Return(arg)]);
    ```
 *
 * @category | Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-lambda
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Lambda = (
    statements: IStatement[] = [],
    inType: IType = TUnknown(),
    argumentName = 'lambda_arg',
    line = new LineInfo(),
) => new LambdaLiteral(statements, inType, argumentName, line);

/**
 * Build a literal of type ticket.
 *
    ```typescript
        Ticket(String('A Ticket'), Nat(1));
    ```
 *
 * @category | Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-ticket
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Ticket = (content: IExpression, amount: LiteralExpression<ValueAtom.nat>, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.ticket, [content, amount], line);

/**
 * Build a literal of type sapling_state.
 *
    ```typescript
        Sapling_state(8);
    ```
 *
 * @category | Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-sapling_state
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Sapling_state = (memo: number, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.sapling_state, [memo], line);

/**
 * Build a literal of type or. (Wrap a value in a union. It represents the left branch.)
 *
    ```typescript
        Left(Nat(1));
    ```
 *
 * @category | Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#instr-LEFT
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Left = (value: IExpression, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.variant, [ValueAtom.Left, value], line);

/**
 * Build a literal of type or. (Wrap a value in a union. It represents the right branch.)
 *
    ```typescript
        Right(Bool(false));
    ```
 *
 * @category | Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#instr-RIGHT
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Right = (value: IExpression, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.variant, [ValueAtom.Right, value], line);

/**
 * An artificial literal of type pair. (Uses nested annotated pair's to simulate an object value)
 *
    ```typescript
        Record({
            field1: Nat(1),
            field2: Int(2),
            field3: Bytes('0x00'),
        });
    ```
 *
 * @category | Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-pair
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Record = (fields: Record<string, IExpression>, line = new LineInfo()) => new RecordLiteral(fields, line);

/**
 * An artificial literal of type or. (Uses nested annotated or's)
 *
    ```typescript
        Variant('branch1', Int(1));
    ```
 *
 * @category | Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-or
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Variant = (field: string, value: IExpression, line = new LineInfo()) =>
    new LiteralExpression(ValueAtom.variant, [field, value], line);

export const Literal = {
    // Singletons
    Unit,
    Nat,
    Int,
    Mutez,
    String,
    Bool,
    Bytes,
    Address,
    Timestamp,
    Chain_id,
    Bls12_381_fr,
    Bls12_381_g1,
    Bls12_381_g2,
    Key,
    Key_hash,
    Signature,
    // Containers
    List,
    Set,
    Some,
    None,
    Pair,
    Map,
    Big_map,
    Lambda,
    Ticket,
    Sapling_state,
    Record,
    Variant,
    Left,
    Right,
};
