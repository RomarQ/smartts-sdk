import { IExpression } from './expression';
import { IType } from './type';

export type ILayout = (string | ILayout)[];

export interface ILiteral extends IExpression {
    _isLiteral: true;
    type: IType;
}
