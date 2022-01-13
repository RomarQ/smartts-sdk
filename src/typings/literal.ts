import { IToString, IToType } from './shared';
import { IType } from './type';

export type ILayout = (string | ILayout)[];

export interface ILiteral extends IToString, IToType {
    type: IType;
}
