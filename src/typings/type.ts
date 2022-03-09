import TypeAtom from '../core/enums/type';
import { IToString } from './shared';

export interface IType<T extends TypeAtom = TypeAtom> extends IToString {
    _type: T;
}
