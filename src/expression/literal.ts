import type { IType } from '../typings/type';
import type { IStatement } from '../typings/statement';
import type { IExpression, IExpressionKind } from '../typings/expression';

import { capitalizeBoolean, LineInfo, quote } from '../misc/utils';
import { TUnknown } from '../type';
import LiteralAtom from '../core/enums/literal';
import TypeAtom from '../core/enums/type';
import { LambdaLiteral, LiteralExpression, MapLiteral, RecordLiteral } from '../core/expression';

/**
 * Build a literal of type unit.
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-unit
 *
 * ```typescript
 * Unit();
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Unit = (line = new LineInfo()) => new LiteralExpression<TypeAtom.unit>(LiteralAtom.unit, [], line);

/**
 * Build a literal of type nat.
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-nat
 *
 * ```typescript
 * Nat(1);
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Nat = (value: number, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.nat>(LiteralAtom.nat, [value], line);

/**
 * Build a literal of type int.
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-int
 *
 * ```typescript
 * Int(1);
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Int = (value: number, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.int>(LiteralAtom.int, [value], line);

/**
 * Build a literal of type mutez.
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-mutez
 *
 * ```typescript
 * Mutez(1);
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Mutez = (value: number, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.mutez>(LiteralAtom.mutez, [value], line);

/**
 * Build a literal of type string.
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-string
 *
 * ```typescript
 * String("Some String");
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const String = (value: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.string>(LiteralAtom.string, [quote(value)], line);

/**
 * Build a literal of type bool.
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-bool
 *
 * ```typescript
 * Bool(false);
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Bool = (value: boolean, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.bool>(LiteralAtom.bool, [capitalizeBoolean(value)], line);

/**
 * Build a literal of type address.
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-address
 *
 * ```typescript
 * Address("KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT");
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Address = (address: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.address>(LiteralAtom.address, [address], line);

/**
 * Build a literal of type timestamp. (The input is the number of seconds since Epoch)
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-timestamp
 *
 * ```typescript
 * Timestamp(1000);
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Timestamp = (timestamp: number, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.timestamp>(LiteralAtom.timestamp, [timestamp], line);

/**
 * Build a literal of type chain_id. (Represents a chain identifier)
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-chain_id
 *
 * ```typescript
 * Chain_id("0x00");
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Chain_id = (chainID: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.chain_id>(LiteralAtom.chain_id_cst, [chainID], line);

/**
 * Build a literal of type bytes.
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-bytes
 *
 * ```typescript
 * Bytes("0x01");
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Bytes = (bytes: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.bytes>(LiteralAtom.bytes, [bytes], line);

/**
 * Build a literal of type bls12_381_fr.
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-bls12_381_fr
 *
 * ```typescript
 * Bls12_381_fr("0x0001");
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Bls12_381_fr = (fr: string | number, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.bls12_381_fr>(LiteralAtom.bls12_381_fr, [fr], line);

/**
 * Build a literal of type bls12_381_g1.
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-bls12_381_g1
 *
 * ```typescript
 * Bls12_381_g1("0x0572cbea904d67468808c8eb50a9450c9721db309128012543902d0ac358a62ae28f75bb8f1c7c42c39a8c5529bf0f4e166a9d8cabc673a322fda673779d8e3822ba3ecb8670e461f73bb9021d5fd76a4c56d9d4cd16bd1bba86881979749d28");
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Bls12_381_g1 = (bytes: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.bls12_381_g1>(LiteralAtom.bls12_381_g1, [bytes], line);

/**
 * Build a literal of type bls12_381_g2.
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-bls12_381_g2
 *
 * ```typescript
 * Bls12_381_g2("0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb813fa4d4a0ad8b1ce186ed5061789213d993923066dddaf1040bc3ff59f825c78df74f2d75467e25e0f55f8a00fa030ed0d1b3cc2c7027888be51d9ef691d77bcb679afda66c73f17f9ee3837a55024f78c71363275a75d75d86bab79f74782aa");
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Bls12_381_g2 = (bytes: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.bls12_381_g2>(LiteralAtom.bls12_381_g2, [bytes], line);

/**
 * Build a literal of type key.
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-key
 *
 * ```typescript
 * Key("edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT");
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Key = (key: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.key>(LiteralAtom.key, [key], line);

/**
 * Build a literal of type key_hash.
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-key_hash
 *
 * ```typescript
 * Key_hash("tz28QJHLyqvaY2rXAoFZTbxrXeD88NA8wscC");
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Key_hash = (key_hash: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.key_hash>(LiteralAtom.key_hash, [key_hash], line);

/**
 * Build a literal of type signature.
 *
 * @category of Singleton Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-signature
 *
 * ```typescript
 * Signature("sigsAujsNePapNNGsVotTvcKWMNNJja9B4a2FfAe8vExzFhEgEo1GTQStiif22uSA6iNxPGCGsXsRyeLHzeLbJL2y8CnYuNe");
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Signature = (signature: string, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.signature>(LiteralAtom.signature, [signature], line);

/**
 * Build a literal of type list.
 *
 * @category of Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-list
 *
 * ```typescript
 * List([Nat(1)]);
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const List = (items: IExpression[], line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.list>(LiteralAtom.list, items, line);

/**
 * Build a literal of type set.
 *
 * @category of Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-set
 *
 * ```typescript
 * Set([Nat(1)]);
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Set = (items: IExpression[], line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.set>(LiteralAtom.set, items, line);

/**
 * Build a literal of type option. (Wraps an existing optional value)
 *
 * @category of Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SOME
 *
 * ```typescript
 * Some(Nat(1));
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Some = (value: IExpressionKind, line = new LineInfo()) =>
    new LiteralExpression(LiteralAtom.Some, [value], line);

/**
 * Build a literal of type option. (Used to represent an absent optional value)
 *
 * @category of Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#instr-NONE
 *
 * ```typescript
 * None();
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const None = (line = new LineInfo()) => new LiteralExpression(LiteralAtom.None, [], line);

/**
 * Build a literal of type map.
 *
 * @category of Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-map
 *
    ```typescript
        Map([
            [Nat(1), String('WORD1')],
            [Nat(2), String('WORD2')],
        ]);
    ```
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
) => new MapLiteral<TypeAtom.map>(LiteralAtom.map, rows, keyType, valueType, line);

/**
 * Build a literal of type big_map.
 *
 * @category of Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-big_map
 *
    ```typescript
        Big_map([
            [Nat(1), String('WORD1')],
            [Nat(2), String('WORD2')],
        ]);
    ```
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
) => new MapLiteral<TypeAtom.big_map>(LiteralAtom.big_map, rows, keyType, valueType, line);

/**
 * Build a literal of type pair. (A binary tuple of values)
 *
 * @category of Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-pair
 *
    ```typescript
        Pair(Nat(1), Bool(false));
    ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Pair = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.tuple>(LiteralAtom.tuple, [left, right], line);

/**
 * Build a literal of type lambda.
 *
 * @category of Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-lambda
 *
    ```typescript
        Lambda()
            .inputType(TString())
            .code((arg) => [Return(arg)]);
    ```
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
 * @category of Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-ticket
 *
    ```typescript
        Ticket(String('A Ticket'), Nat(1));
    ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Ticket = (content: IExpression, amount: LiteralExpression<TypeAtom.nat>, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.ticket>(LiteralAtom.ticket, [content, amount], line);

/**
 * Build a literal of type sapling_state.
 *
 * @category of Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-sapling_state
 *
    ```typescript
        Sapling_state(8);
    ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Sapling_state = (memo: number, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.sapling_state>(LiteralAtom.sapling_state, [memo], line);

/**
 * Build a literal of type or. (Wrap a value in a union. It represents the left branch.)
 *
 * @category of Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#instr-LEFT
 *
    ```typescript
        Left(Nat(1));
    ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Left = (value: IExpressionKind, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.variant>(LiteralAtom.variant, [LiteralAtom.Left, value], line);

/**
 * Build a literal of type or. (Wrap a value in a union. It represents the right branch.)
 *
 * @category of Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#instr-RIGHT
 *
    ```typescript
        Right(Bool(false));
    ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Right = (value: IExpressionKind, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.variant>(LiteralAtom.variant, [LiteralAtom.Right, value], line);

/**
 * An artificial literal of type pair. (Uses nested annotated pair's to simulate an object value)
 *
 * @category of Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-pair
 *
    ```typescript
        Record({
            field1: Nat(1),
            field2: Int(2),
            field3: Bytes('0x00'),
        });
    ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Record = (fields: Record<string, IExpression>, line = new LineInfo()) => new RecordLiteral(fields, line);

/**
 * An artificial literal of type or. (Uses nested annotated or's)
 *
 * @category of Container Literals
 * @see https://tezos.gitlab.io/michelson-reference/#type-or
 *
    ```typescript
        Variant('branch1', Int(1));
    ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Variant = (field: string, value: IExpression, line = new LineInfo()) =>
    new LiteralExpression<TypeAtom.variant>(LiteralAtom.variant, [field, value], line);

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
