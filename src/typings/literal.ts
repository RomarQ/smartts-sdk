import { IToString, IToType } from './shared';
import { IType } from './type';

export interface ILiteral extends IToString, IToType {
    type: IType;
}
