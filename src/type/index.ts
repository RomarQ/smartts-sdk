import { ILayout } from '../typings/literal';
import { IType } from '../typings/type';
import { Layout } from '../core/enums/layout';
import { ContainerType, SimpleType, Type_VariantOrRecord } from '../core/type';
import { TypeAtom } from '../core/enums/type';

/**
 * An unknown type (It is used when leveraging type inference)
 *
 * ```typescript
 * TUnknown();
 * ```
 *
 * @return {IType<unknown>} A type
 */
export const TUnknown = (): IType => ({
    // Used for type checking
    _type: TypeAtom.unknown,
    toString: () => '(unknown 0)',
});

/**
 * The type whose only value is Unit
 *
 * ```typescript
 * TUnit();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-unit
 *
 * @return {IType<TypeAtom.unit>} A type
 */
export const TUnit = () => new SimpleType(TypeAtom.unit);

/**
 * The type whose only value an arbitrary-precision natural number
 *
 * ```typescript
 * TNat();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-nat
 *
 * @return {IType<TypeAtom.nat>} A type
 */
export const TNat = () => new SimpleType(TypeAtom.nat);

/**
 * The type whose only value an arbitrary-precision integer
 *
 * ```typescript
 * TInt();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-int
 *
 * @return {IType<TypeAtom.int>} A type
 */
export const TInt = () => new SimpleType(TypeAtom.int);

/**
 * A specific type for manipulating the native tezos tokens.
 *
 * ```typescript
 * TMutez();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-mutez
 *
 * @return {IType<TypeAtom.mutez>} A type
 */
export const TMutez = () => new SimpleType(TypeAtom.mutez);

/**
 * A type that represents a sequence of characters.
 *
 * ```typescript
 * TString();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-string
 *
 * @return {IType<TypeAtom.string>} A type
 */
export const TString = () => new SimpleType(TypeAtom.string);

/**
 * The type used to represent boolean values.
 *
 * ```typescript
 * TBool();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-bool
 *
 * @return {IType<TypeAtom.bool>} A type
 */
export const TBool = () => new SimpleType(TypeAtom.bool);

/**
 * ```typescript
 * TAddress();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-address
 *
 * @return {IType<TypeAtom.address>} A type
 */
export const TAddress = () => new SimpleType(TypeAtom.address);

/**
 * ```typescript
 * TTimestamp();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-timestamp
 *
 * @return {IType<TypeAtom.timestamp>} A type
 */
export const TTimestamp = () => new SimpleType(TypeAtom.timestamp);

/**
 * ```typescript
 * TChain_id();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-chain_id
 *
 * @return {IType<TypeAtom.chain_id>} A type
 */
export const TChain_id = () => new SimpleType(TypeAtom.chain_id);

/**
 * ```typescript
 * TBytes();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-bytes
 *
 * @return {IType<TypeAtom.bytes>} A type
 */
export const TBytes = () => new SimpleType(TypeAtom.bytes);

/**
 * ```typescript
 * TBls12_381_fr();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-bls12_381_fr
 *
 * @return {IType<TypeAtom.bls12_381_fr>} A type
 */
export const TBls12_381_fr = () => new SimpleType(TypeAtom.bls12_381_fr);

/**
 * ```typescript
 * TBls12_381_g1();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-bls12_381_g1
 *
 * @return {IType<TypeAtom.bls12_381_g1>} A type
 */
export const TBls12_381_g1 = () => new SimpleType(TypeAtom.bls12_381_g1);

/**
 * ```typescript
 * TBls12_381_g2();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-bls12_381_g2
 *
 * @return {IType<TypeAtom.bls12_381_g2>} A type
 */
export const TBls12_381_g2 = () => new SimpleType(TypeAtom.bls12_381_g2);

/**
 * ```typescript
 * TKey();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-key
 *
 * @return {IType<TypeAtom.key>} A type
 */
export const TKey = () => new SimpleType(TypeAtom.key);

/**
 * ```typescript
 * TKey_hash();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-key_hash
 *
 * @return {IType<TypeAtom.key_hash>} A type
 */
export const TKey_hash = () => new SimpleType(TypeAtom.key_hash);

/**
 * ```typescript
 * TSignature();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-signature
 *
 * @return {IType<TypeAtom.signature>} A type
 */
export const TSignature = () => new SimpleType(TypeAtom.signature);

/**
 * ```typescript
 * TOperation();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-operation
 *
 * @return {IType<TypeAtom.operation>} A type
 */
export const TOperation = () => new SimpleType(TypeAtom.operation);

/**
 * ```typescript
 * TNever();
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-never
 *
 * @return {IType<TypeAtom.never>} A type
 */
export const TNever = () => new SimpleType(TypeAtom.never);

/**
 * ```typescript
 * TList(TNat());
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-list
 *
 * @return {IType<TypeAtom.list>} A type
 */
export const TList = (innerType: IType) => new ContainerType(TypeAtom.list, [innerType]);

/**
 * ```typescript
 * TSet(TNat());
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-set
 *
 * @return {IType<TypeAtom.set>} A type
 */
export const TSet = (innerType: IType) => new ContainerType(TypeAtom.set, [innerType]);

/**
 * ```typescript
 * TOption(TNat());
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-option
 *
 * @return {IType<TypeAtom.option>} A type
 */
export const TOption = (innerType: IType) => new ContainerType(TypeAtom.option, [innerType]);

/**
 * ```typescript
 * TMap(TString(), TNat());
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-map
 *
 * @return {IType<TypeAtom.map>} A type
 */
export const TMap = (keyType: IType, valueType: IType) => new ContainerType(TypeAtom.map, [keyType, valueType]);

/**
 * ```typescript
 * TBig_map(TString(), TNat());
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-big_map
 *
 * @return {IType<TypeAtom.big_map>} A type
 */
export const TBig_map = (keyType: IType, valueType: IType) => new ContainerType(TypeAtom.big_map, [keyType, valueType]);

/**
 * ```typescript
 * TPair(TString(), TNat());
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-pair
 *
 * @return {IType<TypeAtom.tuple>} A type
 */
export const TPair = (left: IType, right: IType) => new ContainerType(TypeAtom.tuple, [left, right]);

/**
 * ```typescript
 * TOr(TString(), TNat());
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-or
 *
 * @return {IType<TypeAtom.or>} A type
 */
export const TOr = (left: IType, right: IType) => TVariant({ Left: left, Right: right });

/**
 * ```typescript
 * TLambda(TString(), TNat());
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-lambda
 *
 * @return {IType<TypeAtom.lambda>} A type
 */
export const TLambda = (left: IType, right: IType) => new ContainerType(TypeAtom.lambda, [left, right]);

/**
 * ```typescript
 * TTicket(TString());
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-ticket
 *
 * @return {IType<TypeAtom.ticket>} A type
 */
export const TTicket = (innerType: IType) => new ContainerType(TypeAtom.ticket, [innerType]);

/**
 * ```typescript
 * TContract(TString());
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-contract
 *
 * @return {IType<TypeAtom.contract>} A type
 */
export const TContract = (innerType: IType) => new ContainerType(TypeAtom.contract, [innerType]);

/**
 * ```typescript
 * TSapling_state(8);
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-sapling_state
 *
 * @return {IType<TypeAtom.sapling_state>} A type
 */
export const TSapling_state = (memo: number) => new ContainerType(TypeAtom.sapling_state, [memo]);

/**
 * ```typescript
 * TSapling_transaction(8);
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-sapling_transaction
 *
 * @return {IType<TypeAtom.sapling_transaction>} A type
 */
export const TSapling_transaction = (memo: number) => new ContainerType(TypeAtom.sapling_transaction, [memo]);

/**
 * ```typescript
 * TRecord({
 *  field1: TNat(),
 *  field2: TString(),
 * });
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-pair
 *
 * @return {IType<TypeAtom.pair>} A type
 */
export const TRecord = (fields: Record<string, IType>, layout?: ILayout | Layout) =>
    new Type_VariantOrRecord(TypeAtom.record, fields, layout);

/**
 * ```typescript
 * TVariant({
 *  branch1: TNat(),
 *  branch1: TString(),
 * });
 * ```
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-or
 *
 * @return {IType<TypeAtom.or>} A type
 */
export const TVariant = (fields: Record<string, IType>, layout?: ILayout | Layout) =>
    new Type_VariantOrRecord(TypeAtom.variant, fields, layout);

const Types = {
    TUnknown,
    // Singleton types
    TUnit,
    TNat,
    TInt,
    TMutez,
    TString,
    TBool,
    TBytes,
    TAddress,
    TTimestamp,
    TChain_id,
    TBls12_381_fr,
    TBls12_381_g1,
    TBls12_381_g2,
    TKey,
    TKey_hash,
    TSignature,
    TOperation,
    TNever,
    // Container types
    TList,
    TSet,
    TOption,
    TPair,
    TOr,
    TMap,
    TBig_map,
    TLambda,
    TTicket,
    TContract,
    TSapling_state,
    TSapling_transaction,
    // Artificial Types
    TRecord,
    TVariant,
};

export default Types;
