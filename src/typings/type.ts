import { IToString } from './shared';

export interface IType extends IToString {
    _isType: true;
}
