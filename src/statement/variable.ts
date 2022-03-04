import Utils, { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import StatementAtom from '../core/enums/statement';
import { Statement } from '../core/statement';

/**
 * Declare a new variable.
 *
 * ```typescript
 * // Mutable
 * NewVariable("a", String("HELLO WORLD"));
 * // Unmutable
 * NewVariable("b", String("HELLO WORLD"), false);
 * ```
 *
 * @param name Variable name
 * @param value Variable initial value
 * @param mutable Optional flag that can be used to set the variable as final (false: final, true: mutable)
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export function NewVariable(name: string, value: IExpression, mutable = true, line = new LineInfo()) {
    return new Statement(StatementAtom.defineLocal, `"${name}"`, value, Utils.capitalizeBoolean(mutable), line);
}

/**
 * Assign value to variable.
 *
 * ```typescript
 * SetValue(ContractStorage(), Nat(1));
 * ```
 *
 * @param source The variable to be updated
 * @param value Value to be assigned
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export function SetValue(source: IExpression, value: IExpression, line = new LineInfo()) {
    return new Statement(StatementAtom.set, source, value, line);
}
