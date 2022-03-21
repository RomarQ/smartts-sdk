import type { IExpression } from '../typings/expression';
import type { IStatement } from '../typings/statement';

import StatementAtom from '../core/enums/statement';
import {
    ForEachStatement,
    ForStatement,
    IfStatment,
    Statement,
    VariantMatchStatement,
    WhileStatement,
} from '../core/statement';
import { LineInfo } from '../misc/utils';
import { Unit } from '../expression';
import { MichelsonType } from '../core/enums/type';

/**
 * Test a condition and interrupt the smart-contract execution if the condition is false. (The whole operation is rollbacked)
 *
 * ```typescript
 * Require(LessThanOrEqual(ContractStorage(), Nat(10)), String("LessThanOrEqual to 10"));
 * ```
 *
 * @category | Assertion
 *
 * @param errorMsg The value to be included in the error trace.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const Require = (condition: IExpression, errorMsg: IExpression = Unit(), line = new LineInfo()) =>
    new Statement(StatementAtom.verify, condition, errorMsg, line);

/**
 * A (If) statement.
 *
    ```typescript
    If(GreaterThan(ContractStorage(), Nat(5)))
        .Then([SetValue(ContractStorage(), Nat(5))])
        .Else([])
    ```
 *
 * @category | Branching
 *
 * @param condition
 * @param thenStatements Statements to be applied if the condition is true.
 * @param elseStatements Statements to be applied if the condition is false.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const If = (
    condition: IExpression,
    thenStatements?: IStatement[],
    elseStatements?: IStatement[],
    line = new LineInfo(),
) => new IfStatment(condition, line, thenStatements, elseStatements);

/**
 * Switch statement used to match branches on variant expressions.
 *
 * ```typescript
 * MatchVariant(arg)
    .Case('action1', (action) => [SetValue(ContractStorage(), action)])
    .Case('action2', (action) => [SetValue(ContractStorage(), action)])
 * ```
 *
 * @category | Branching
 *
 * @param variant Variant expression
 * @param argumentName An optional argument name
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const MatchVariant = (
    variant: IExpression<MichelsonType.or>,
    argumentName = `__MATCH_${VariantMatchStatement.nextID}__`,
    line = new LineInfo(),
) => new VariantMatchStatement(variant, argumentName, line);

/**
 * A (forEach) loop.
 *
 * ```typescript
 * ForEachOf(arg)
 *  .Do((i) => [SetValue(ContractStorage(), Add(ContractStorage(), i))]);
 * ```
 *
 * @category | Loop
 *
 * @param list The list to be iterated over
 * @param statements The statements inside the loop body
 * @param iteratorName The iterator name
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const ForEachOf = (
    list: IExpression,
    statements: IStatement[] = [],
    iteratorName = `__ITERATOR_FOREACH_${ForEachStatement.nextID}__`,
    line = new LineInfo(),
) => new ForEachStatement(list, statements, iteratorName, line);

/**
 * A basic (while) loop.
 *
 * ```typescript
 * While(LessThanOrEqual(ContractStorage(), Nat(10)))
 *  .Do([SetValue(ContractStorage(), Add(ContractStorage(), Nat(1)))]);
 * ```
 *
 * @category | Loop
 *
 * @param condition
 * @param statements The statements inside the loop body
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const While = (condition: IExpression, statements?: IStatement[], line = new LineInfo()) =>
    new WhileStatement(condition, statements, line);

/**
 * A basic (for) loop.
 *
 * ```typescript
 * For(Nat(0), Nat(10), Nat(1)).Do((i) => [SetValue(ContractStorage(), Add(ContractStorage(), i))]);
 * ```
 *
 * @category | Loop
 *
 * @param from The initial value
 * @param to The target value
 * @param increment The incrementor
 * @param statements The statements inside the loop body
 * @param iteratorName The variable name being incremented inside the loop
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IStatement} A statement
 */
export const For = (
    from: IExpression,
    to: IExpression,
    increment: IExpression,
    statements?: IStatement[],
    iteratorName = `__ITERATOR_FOR_${ForStatement.nextID}__`,
    line = new LineInfo(),
) => new ForStatement(from, to, increment, statements, iteratorName, line);
