import LiteralAtom from '../core/enums/literal';
import { IExpression } from './expression';
import { IType } from './type';

export type ILayout = (string | ILayout)[];

export interface ILiteral<T extends LiteralAtom = LiteralAtom> extends IExpression {
    _type: T;
    type: IType;
}
