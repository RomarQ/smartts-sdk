import { ILayout } from '../../typings/literal';
import { IType } from '../../typings/type';
import { Layout } from '../enums/layout';
import { Prim, SmartPyAtom } from '../enums/prim';

export class SimpleType implements IType {
    constructor(public name: string) {}

    toString() {
        return `"${this.name}"`;
    }
}

export class ContainerType implements IType {
    constructor(public type: string, public innerTypes: IType[]) {}

    toString() {
        return `(${this.type} ${this.innerTypes.join(' ')})`;
    }
}

export class Type_Record implements IType {
    layout: ILayout | Layout;
    constructor(public fields: Record<string, IType>, layout?: ILayout | Layout) {
        this.layout = layout || Object.keys(fields);
    }

    private translateLayout = (layout: ILayout | Layout): string => {
        const normalizeTuple = (elements: ILayout): string =>
            elements.reduce<string>((pv, cv) => {
                if (Array.isArray(cv)) {
                    return `(${[pv, normalizeTuple(cv)].join(' ')})`;
                }
                const field = `("${cv}")`;
                return !!pv ? `(${pv} ${field})` : field;
            }, '');
        if (Array.isArray(layout)) {
            return layout.length ? `(Some ${normalizeTuple(layout)})` : 'None';
        }
        return '(Some Right)';
    };

    private buildFields = (fields: Record<string, IType>) => {
        return Object.entries(fields).map(([field, ty]) => `(${field} ${ty.toString()})`);
    };

    toString() {
        return `(record (${this.buildFields(this.fields).join(' ')}) ${this.translateLayout(this.layout)})`;
    }
}

export const TUnknown: IType = {
    toString: () => '(unknown 0)',
};
// Singleton types
export const TUnit = () => new SimpleType(Prim.unit);
export const TNat = () => new SimpleType(Prim.nat);
export const TInt = () => new SimpleType(Prim.int);
export const TMutez = () => new SimpleType(Prim.mutez);
export const TString = () => new SimpleType(Prim.string);
export const TBool = () => new SimpleType(Prim.bool);
export const TAddress = () => new SimpleType(Prim.address);
export const TTimestamp = () => new SimpleType(Prim.timestamp);
export const TChain_id = () => new SimpleType(Prim.chain_id);
export const TBytes = () => new SimpleType(Prim.bytes);
export const TBls12_381_fr = () => new SimpleType(Prim.bls12_381_fr);
export const TBls12_381_g1 = () => new SimpleType(Prim.bls12_381_g1);
export const TBls12_381_g2 = () => new SimpleType(Prim.bls12_381_g2);
export const TKey = () => new SimpleType(Prim.key);
export const TKey_hash = () => new SimpleType(Prim.key_hash);
export const TSignature = () => new SimpleType(Prim.signature);
export const TOperation = () => new SimpleType(Prim.operation);
export const TNever = () => new SimpleType(Prim.never);
// Container types
export const TList = (innerType: IType) => new ContainerType(Prim.list, [innerType]);
export const TSet = (innerType: IType) => new ContainerType(Prim.set, [innerType]);
export const TOption = (innerType: IType) => new ContainerType(Prim.option, [innerType]);
export const TMap = (keyType: IType, valueType: IType) => new ContainerType(Prim.map, [keyType, valueType]);
export const TBig_map = (keyType: IType, valueType: IType) =>
    new ContainerType(SmartPyAtom.bigmap, [keyType, valueType]);
export const TPair = (...types: IType[]) => new ContainerType(SmartPyAtom.tuple, types);
// Artificial Types
export const TRecord = (fields: Record<string, IType>, layout?: ILayout | Layout) => new Type_Record(fields, layout);

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
    TMap,
    TBig_map,
    // TLambda,
    // TTicket,
    // TContract,
    // TSapling_state,
    // TSapling_transaction,
    // Artificial Types
    TRecord,
    // TVariant,
};

export default Types;
