import ValueAtom from '../core/enums/literal';
import { IExpression } from './expression';

export type ILayout = (string | ILayout)[];

export type ILiteral<T extends ValueAtom = ValueAtom> = IExpression<T>;
