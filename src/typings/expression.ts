import { MichelsonType } from '../core/enums/type';
import { IToString } from './shared';

export interface IExpression<T extends MichelsonType = MichelsonType> extends IToString {
    _isExpression: true;
    _type: T;
}
