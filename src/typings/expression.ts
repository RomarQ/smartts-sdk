import ValueAtom from '../core/enums/literal';
import { IToString } from './shared';

export interface IExpression<T extends ValueAtom = ValueAtom> extends IToString {
    _isExpression: true;
    _type: T;
}
