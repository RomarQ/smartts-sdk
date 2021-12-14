import type { IToString } from '../typings';

import { LineInfo } from '../misc/utils';

export class Expression implements IToString {
    args: IToString[];

    constructor(public name: string, ...args: IToString[]) {
        this.args = args || [];
    }

    toString() {
        return `(${this.name} ${this.args.map((arg) => arg.toString()).join(' ')})`;
    }
}

export const GetLocal = (name: string, line = new LineInfo()) => new Expression('getLocal', `"${name}"`, line);

export const Equal = (left: IToString, right: IToString, line = new LineInfo()) =>
    new Expression('eq', left, right, line);

export const NotEqual = (left: IToString, right: IToString, line = new LineInfo()) =>
    new Expression('neq', left, right, line);

export const LessThan = (left: IToString, right: IToString, line = new LineInfo()) =>
    new Expression('lt', left, right, line);

export const GreaterThan = (left: IToString, right: IToString, line = new LineInfo()) =>
    new Expression('gt', left, right, line);

export const LessThanOrEqual = (left: IToString, right: IToString, line = new LineInfo()) =>
    new Expression('le', left, right, line);

export const GreaterThanOrEqual = (left: IToString, right: IToString, line = new LineInfo()) =>
    new Expression('ge', left, right, line);

export const ContractStorage = () => new Expression('data');

const Expressions = {
    GetLocal,
    Equal,
    NotEqual,
    LessThan,
    GreaterThan,
    LessThanOrEqual,
    GreaterThanOrEqual,
    ContractStorage,
};

export default Expressions;
