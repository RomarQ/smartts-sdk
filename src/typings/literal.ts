import { IType } from './type';

export interface ILiteral {
    _isLiteral: true;
    type: IType;
}
