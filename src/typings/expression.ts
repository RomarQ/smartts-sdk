import { ILiteral } from './literal';
import { IToString } from './shared';

export type IExpression = IToString;

export type IExpressionKind = string | IExpression | ILiteral;
