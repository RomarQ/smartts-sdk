import { ILayout } from '../typings/literal';
import { IType } from '../typings/type';
import { Layout } from './enums/layout';
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
    constructor(public type: string, public innerType: IType) {
        super();
    }

    toString() {
        return `(${this.type} ${this.innerType})`;
    }
}

export class Type_Record extends BaseType {
    layout: ILayout | Layout;
    constructor(public fields: Record<string, IType>, layout?: ILayout | Layout) {
        super();
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

    static buildFields = (fields: Record<string, IType>) => {
        return Object.entries(fields).map(([field, ty]) => `(${field} ${ty.toString()})`);
    };

    toString() {
        return `(record (${Type_Record.buildFields(this.fields).join(' ')}) ${this.translateLayout(this.layout)})`;
    }
}

export const TUnknown: IType = {
    toString: () => '(unknown 0)',
};
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
export const TList = (innerType: IType) => new Type_1(Prim.list, innerType);
export const TOption = (innerType: IType) => new Type_1(Prim.option, innerType);
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
    TAddress,
    TTimestamp,
    TChainID,
    // Container types
    TList,
    TOption,
};

export default Types;
