import { MichelsonType } from '../core/enums/type';
import { IExpression } from './expression';

export type ILayout = (string | ILayout)[];

export type ILiteral<T extends MichelsonType = MichelsonType> = IExpression<T>;
