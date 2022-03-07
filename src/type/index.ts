import { composeRightCombLayout, parenthesis } from '../misc/utils';
import { ILayout } from '../typings/literal';
import { IType } from '../typings/type';
import { Layout } from '../core/enums/layout';
import TypeAtom from '../core/enums/type';

class SimpleType<T extends TypeAtom> implements IType<T> {
    // Used for type checking
    _type = {} as unknown as T;

    constructor(public name: T) {}

    toString() {
        return `"${this.name}"`;
    }
}

class ContainerType<T extends TypeAtom> implements IType<T> {
    // Used for type checking
    _type = {} as unknown as T;

    constructor(public type: T, public innerTypes: (IType | number)[]) {}

    toString() {
        return `(${this.type} ${this.innerTypes.join(' ')})`;
    }
}

class Type_VariantOrRecord implements IType<TypeAtom> {
    // Used for type checking
    _type = TypeAtom.record;

    private layout: ILayout | Layout;

    constructor(private atom: string, private fields: Record<string, IType>, layout?: ILayout | Layout) {
        this.layout = layout || composeRightCombLayout(Object.keys(fields));
    }

    private translateLayout = (layout: ILayout | Layout): string => {
        const normalizeTuple = (layout: string | ILayout): string => {
            if (typeof layout === 'string') {
                return `("${layout}")`;
            }
            const [left, right] = layout;
            return parenthesis([normalizeTuple(left), normalizeTuple(right)].join(' '));
        };

        if (Array.isArray(layout)) {
            return layout.length ? `(Some ${normalizeTuple(layout)})` : 'None';
        }
        return '(Some Right)';
    };

    private buildFields = (fields: Record<string, IType>) => {
        return Object.entries(fields).map(([field, ty]) => `(${field} ${ty.toString()})`);
    };

    toString() {
        return `(${this.atom} (${this.buildFields(this.fields).join(' ')}) ${this.translateLayout(
            this.layout,
        )} ("" -1))`;
    }
}

export const TUnknown = (): IType => ({
    // Used for type checking
    _type: {} as unknown,
    toString: () => '(unknown 0)',
});

// Singleton types

/**
 * The type whose only value is Unit
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-unit
 *
 * @return {IType<TypeAtom.unit>}
 */
export const TUnit = () => new SimpleType(TypeAtom.unit);
/**
 * The type whose only value an arbitrary-precision natural number
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-nat
 *
 * @return {IType<TypeAtom.nat>}
 */
export const TNat = () => new SimpleType(TypeAtom.nat);
/**
 * The type whose only value an arbitrary-precision integer
 *
 * @see https://tezos.gitlab.io/michelson-reference/#type-int
 *
 * @return {IType<TypeAtom.int>}
 */
export const TInt = () => new SimpleType(TypeAtom.int);
export const TMutez = () => new SimpleType(TypeAtom.mutez);
export const TString = () => new SimpleType(TypeAtom.string);
export const TBool = () => new SimpleType(TypeAtom.bool);
export const TAddress = () => new SimpleType(TypeAtom.address);
export const TTimestamp = () => new SimpleType(TypeAtom.timestamp);
export const TChain_id = () => new SimpleType(TypeAtom.chain_id);
export const TBytes = () => new SimpleType(TypeAtom.bytes);
export const TBls12_381_fr = () => new SimpleType(TypeAtom.bls12_381_fr);
export const TBls12_381_g1 = () => new SimpleType(TypeAtom.bls12_381_g1);
export const TBls12_381_g2 = () => new SimpleType(TypeAtom.bls12_381_g2);
export const TKey = () => new SimpleType(TypeAtom.key);
export const TKey_hash = () => new SimpleType(TypeAtom.key_hash);
export const TSignature = () => new SimpleType(TypeAtom.signature);
export const TOperation = () => new SimpleType(TypeAtom.operation);
export const TNever = () => new SimpleType(TypeAtom.never);
// Container types
export const TList = (innerType: IType) => new ContainerType(TypeAtom.list, [innerType]);
export const TSet = (innerType: IType) => new ContainerType(TypeAtom.set, [innerType]);
export const TOption = (innerType: IType) => new ContainerType(TypeAtom.option, [innerType]);
export const TMap = (keyType: IType, valueType: IType) => new ContainerType(TypeAtom.map, [keyType, valueType]);
export const TBig_map = (keyType: IType, valueType: IType) => new ContainerType(TypeAtom.big_map, [keyType, valueType]);
export const TPair = (left: IType, right: IType) => new ContainerType(TypeAtom.tuple, [left, right]);
export const TOr = (left: IType, right: IType) => TVariant({ Left: left, Right: right });
export const TLambda = (left: IType, right: IType) => new ContainerType(TypeAtom.lambda, [left, right]);
export const TTicket = (innerType: IType) => new ContainerType(TypeAtom.ticket, [innerType]);
export const TContract = (innerType: IType) => new ContainerType(TypeAtom.contract, [innerType]);
export const TSapling_state = (memo: number) => new ContainerType(TypeAtom.sapling_state, [memo]);
export const TSapling_transaction = (memo: number) => new ContainerType(TypeAtom.sapling_transaction, [memo]);
// Artificial Types
export const TRecord = (fields: Record<string, IType>, layout?: ILayout | Layout) =>
    new Type_VariantOrRecord(TypeAtom.record, fields, layout);
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
