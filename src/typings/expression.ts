import { ILiteral } from './literal';
import { IToString } from './shared';

export interface IExpression extends IToString {
    _isExpression: true;
}

export type IExpressionKind = string | IExpression | ILiteral;
