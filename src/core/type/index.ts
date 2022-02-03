import { composeRightCombLayout, parenthesis } from '../../misc/utils';
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
    private layout: ILayout | Layout;
    constructor(public fields: Record<string, IType>, layout?: ILayout | Layout) {
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
export const TPair = (left: IType, right: IType) => new ContainerType(SmartPyAtom.tuple, [left, right]);
export const TLambda = (left: IType, right: IType) => new ContainerType(Prim.lambda, [left, right]);
export const TTicket = (innerType: IType) => new ContainerType(Prim.ticket, [innerType]);
export const TContract = (innerType: IType) => new ContainerType(Prim.contract, [innerType]);
export const TSapling_state = (memo: number) => new ContainerType(Prim.sapling_state, [memo]);
export const TSapling_transaction = (memo: number) => new ContainerType(Prim.sapling_transaction, [memo]);
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
    TLambda,
    TTicket,
    TContract,
    TSapling_state,
    TSapling_transaction,
    // Artificial Types
    TRecord,
    // TVariant,
};

export default Types;
