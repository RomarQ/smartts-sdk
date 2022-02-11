import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';

/**
 * @description Get entrypoint argument.
 * @param {LineInfo} line Source code line information (Used in error messages)
 * @returns {IStatement}
 */
export function MethodArgument(line = new LineInfo()) {
    return new Expression(ExpressionAtom.params, line);
}

const Method = {
    MethodArgument,
};

export default Method;
