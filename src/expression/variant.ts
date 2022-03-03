import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { None, Some } from './literal';

export const OpenVariant = (variant: IExpression, branch = 'Some', errorMsg?: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.openVariant, variant, `"${branch}"`, errorMsg ? Some(errorMsg) : None(), line);

const Variant = { OpenVariant };

export default Variant;
