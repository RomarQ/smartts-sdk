import Utils, { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import StatementAtom from '../core/enums/statement';
import { Statement } from '../core/statement';

/**
 * @description Define a new variable.
 * @param name Variable name
 * @param value Variable initial value
 * @param mutable Optional flag that can be used to set the variable as final (false: final, true: mutable)
 * @param line An optional line for error information
 * @returns {IStatement}
 */
export function DefineVar(name: string, value: IExpression, mutable = true, line = new LineInfo()) {
    return new Statement(StatementAtom.defineLocal, `"${name}"`, value, Utils.capitalizeBoolean(mutable), line);
}

/**
 * @description Assign value to variable.
 * @param source A variable
 * @param value Value to be assigned
 * @param line An optional line for error information
 * @returns {IStatement}
 */
export function SetValue(source: IExpression, value: IExpression, line = new LineInfo()) {
    return new Statement(StatementAtom.set, source, value, line);
}

const Variable = {
    DefineVar,
    SetValue,
};

export default Variable;
