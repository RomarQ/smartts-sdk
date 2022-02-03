import { IExpression } from './expression';
import { IType } from './type';

export type ILayout = (string | ILayout)[];

export interface ILiteral<T> extends IExpression {
    name: T;
    type: IType;
}
