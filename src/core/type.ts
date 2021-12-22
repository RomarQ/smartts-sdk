import type { IToString } from '../typings';
import { IType } from '../typings/type';

/**
 * @description All Type classes must extend this class. It identifies Type classes.
 */
class BaseType implements IType {
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

export class T_TList extends BaseType {
    constructor(public innerType: IToString) {
        super();
    }

    toString() {
        return `(list ${this.innerType})`;
    }
}

export const TList = (innerType: BaseType) => new T_TList(innerType);

// Singleton types
export const TUnit = new SimpleType('unit');
export const TNat = new SimpleType('nat');
export const TInt = new SimpleType('int');
export const TMutez = new SimpleType('mutez');
export const TString = new SimpleType('string');
export const TBool = new SimpleType('bool');
export const TAddress = new SimpleType('address');
export const TTimestamp = new SimpleType('timestamp');
export const TChainID = new SimpleType('chain_id');

const Types = {
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
};

export default Types;
