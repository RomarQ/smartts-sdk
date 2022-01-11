import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';

export class Expression implements IExpression {
    args: IExpression[];

    constructor(public name: string, ...args: (IExpression | LineInfo)[]) {
        this.args = args || [];
    }

    toString() {
        const atoms = `${this.name} ${this.args.map((arg) => arg.toString()).join(' ')}`;
        return `(${atoms.trim()})`;
    }
}

export const GetLocal = (name: string, line = new LineInfo()) => new Expression('getLocal', `"${name}"`, line);

export const Equal = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('eq', left, right, line);

export const NotEqual = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('neq', left, right, line);

export const LessThan = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('lt', left, right, line);

export const GreaterThan = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('gt', left, right, line);

export const LessThanOrEqual = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression('le', left, right, line);

export const GreaterThanOrEqual = (left: IExpression, right: IExpression, line = new LineInfo()) =>
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
