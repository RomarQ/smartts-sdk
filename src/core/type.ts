import { IToString } from '../typings';

export class BaseType {
    private _ = 'Type';
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

export const TNat = new SimpleType('nat');
export const TInt = new SimpleType('int');
export const TMutez = new SimpleType('mutez');
export const TString = new SimpleType('string');
