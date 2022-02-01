import { ILayout } from '../../typings/literal';
import { IType } from '../../typings/type';
import { Layout } from '../enums/layout';
import { Prim, SmartPyAtom } from '../enums/prim';

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

export class ContainerType extends BaseType {
    constructor(public type: string, public innerTypes: IType[]) {
        super();
    }

    toString() {
        return `(${this.type} ${this.innerTypes.map((t) => t.toString()).join(' ')})`;
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
export const TList = (innerType: IType) => new ContainerType(Prim.list, [innerType]);
export const TOption = (innerType: IType) => new ContainerType(Prim.option, [innerType]);
export const TRecord = (fields: Record<string, IType>, layout?: ILayout | Layout) => new Type_Record(fields, layout);
export const TMap = (keyType: IType, valueType: IType) => new ContainerType(Prim.map, [keyType, valueType]);
export const TBigMap = (keyType: IType, valueType: IType) =>
    new ContainerType(SmartPyAtom.bigmap, [keyType, valueType]);
export const TTuple = (...types: IType[]) => new ContainerType(SmartPyAtom.tuple, types);

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
    TRecord,
    TMap,
    TBigMap,
    TTuple,
};

export default Types;