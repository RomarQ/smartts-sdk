import type { IToString } from '../typings';
import { IType } from '../typings/type';
import { Prim } from './enums/prim';

/**
 * @description All Type classes must extend this class. It identifies Type classes.
 */
export class BaseType implements IType {
    _isType = true as const;
}

export class SimpleType extends BaseType {
    constructor(public name: string) {
        super();
    }

    toString() {
        return `"${this.name}"`;
    }
}

export class Type_1 extends BaseType {
    constructor(public type: IToString, public innerType: IToString) {
        super();
    }

    toString() {
        return `(${this.type} ${this.innerType})`;
    }
}

export const TUnknown = new Type_1('unknown', '0');
// Singleton types
export const TUnit = new SimpleType(Prim.unit);
export const TNat = new SimpleType(Prim.nat);
export const TInt = new SimpleType(Prim.int);
export const TMutez = new SimpleType(Prim.mutez);
export const TString = new SimpleType(Prim.string);
export const TBool = new SimpleType(Prim.bool);
export const TAddress = new SimpleType(Prim.address);
export const TTimestamp = new SimpleType(Prim.timestamp);
export const TChainID = new SimpleType(Prim.chain_id);
export const TBytes = new SimpleType(Prim.bytes);
// Container types
export const TList = (innerType: BaseType) => new Type_1(Prim.list, innerType);
export const TOption = (innerType: BaseType) => new Type_1(Prim.option, innerType);

const Types = {
    TUnknown,
    // Singleton types
    TUnit,
    TNat,
    TInt,
    TMutez,
    TString,
    TBool,
    TAddress,
    TTimestamp,
    TChainID,
    // Container types
    TList,
    TOption,
};

export default Types;
