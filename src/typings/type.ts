import { IToString } from './shared';

export interface IType<T = unknown> extends IToString {
    _type: T;
}
