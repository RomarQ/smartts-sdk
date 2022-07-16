import type { IExpression } from '../typings/expression';
import { LineInfo } from '../misc/utils';
import { Expression } from '../core/expression';
import ExpressionAtom from '../core/enums/expression';
import { MichelsonType } from '../core/enums/type';
import { Bool, Lambda, Nat, Map } from './literal';
import { CallLambda } from './lambda';
import { ForEachOf, If, NewVariable, Return, SetValue } from '../statement';
import { AccessMapByKey, GetMapEntries, MapContainsKey } from './map';
import { SizeOf } from './misc';
import { Equal } from './equality';
import { GreaterThan, LessThan, LessThanOrEqual } from './comparison';
import { GetProperty, GetVariable } from './variables';

/**
 * Add two numerical values
 *
 * ```typescript
 * Add(Nat(1), Nat(1)); // Nat(2)
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Add = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.add, left, right, line);

/**
 * Multiply two numerical values
 *
 * ```typescript
 * Multiply(Nat(1), Nat(1)); // Nat(1)
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Multiply = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression<any>(ExpressionAtom.mul_overloaded, left, right, line);

/**
 * Subtract two numerical values
 *
 * ```typescript
 * Subtract(Nat(1), Nat(1)); // Nat(0)
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Subtract = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression<any>(ExpressionAtom.sub, left, right, line);

/**
 * Division operation.
 *
 * ```typescript
 * Divide(Nat(1), Nat(1)); // Nat(1)
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Divide = (left: IExpression, right: IExpression, line = new LineInfo()) =>
    new Expression<any>(ExpressionAtom.truediv, left, right, line);

/**
 * Euclidean Division
 *
 * ```typescript
 * EuclideanDivision(Nat(13), Nat(3)); // Some(Pair(Nat(4), Nat(1)))
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TOption(TPair(@quotient_type, @remainder_type)))
 */
export const EuclideanDivision = (
    left: IExpression<MichelsonType.nat | MichelsonType.int | MichelsonType.mutez>,
    right: IExpression<MichelsonType.nat | MichelsonType.int | MichelsonType.mutez>,
    line = new LineInfo(),
): IExpression<MichelsonType.option> => new Expression(ExpressionAtom.ediv, left, right, line);

/**
 * Modulus
 *
 * ```typescript
 * Mod(Nat(13), Nat(3)); // Nat(1)
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const Mod = (
    left: IExpression<MichelsonType.nat | MichelsonType.int | MichelsonType.mutez>,
    right: IExpression<MichelsonType.nat | MichelsonType.int | MichelsonType.mutez>,
    line = new LineInfo(),
) => new Expression<any>(ExpressionAtom.mod, left, right, line);

/**
 * Logical left shift
 *
 * ```typescript
 * ShiftLeft(Nat(2), Nat(1)); // Nat(1)
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const ShiftLeft = (
    left: IExpression<MichelsonType.nat>,
    right: IExpression<MichelsonType.nat>,
    line = new LineInfo(),
) => new Expression<MichelsonType.nat>(ExpressionAtom.lsl, left, right, line);

/**
 * Logical right shift
 *
 * ```typescript
 * ShiftRight(Nat(2), Nat(1)); // Nat(1)
 * ```
 *
 * @category | Math
 *
 * @param left Expression
 * @param right Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression.
 */
export const ShiftRight = (
    left: IExpression<MichelsonType.nat>,
    right: IExpression<MichelsonType.nat>,
    line = new LineInfo(),
) => new Expression<MichelsonType.nat>(ExpressionAtom.lsr, left, right, line);

/**
 * Computes the median of a list of integers.
 *
 * ```typescript
 * Median(List([Nat(2), Nat(1), Nat(3)]); // Nat(2)
 * ```
 *
 * @category | Math
 *
 * @param list Expression
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression that evaluates to `TNat()` or `TInt` depending on the input type.
 */
export const Median = (list: IExpression<MichelsonType.list>, line = new LineInfo()) => {
    return CallLambda(
        Lambda().code((arg) => [
            NewVariable('hist', Map()),
            ForEachOf(arg).Do((x) => [
                If(MapContainsKey(GetVariable('hist'), x))
                    .Then([
                        SetValue(
                            AccessMapByKey(GetVariable('hist'), x),
                            Add(AccessMapByKey(GetVariable('hist'), x), Nat(1)),
                        ),
                    ])
                    .Else([SetValue(AccessMapByKey(GetVariable('hist'), x), Nat(1))]),
            ]),
            NewVariable('list_size', SizeOf(arg)),
            NewVariable('result', Nat(0)),
            NewVariable('half', Divide(GetVariable('list_size'), Nat(2))),
            NewVariable('use_average', Equal(Multiply(GetVariable('half'), Nat(2)), GetVariable('list_size'))),
            NewVariable('i', Nat(0)),
            ForEachOf(GetMapEntries(GetVariable('hist'))).Do((entry) => [
                If(GetVariable('use_average'))
                    .Then([
                        If(LessThan(GetVariable('i'), GetVariable('half')))
                            .Then([
                                SetValue(GetVariable('result'), GetProperty(entry, 'key')),
                                SetValue(GetVariable('i'), Add(GetVariable('i'), GetProperty(entry, 'value'))),
                                If(GreaterThan(GetVariable('i'), GetVariable('half'))).Then([
                                    SetValue(GetVariable('use_average'), Bool(false)),
                                ]),
                            ])
                            .Else([
                                SetValue(GetVariable('result'), Add(GetVariable('result'), GetProperty(entry, 'key'))),
                                SetValue(GetVariable('result'), Divide(GetVariable('result'), Nat(2))),
                                SetValue(GetVariable('use_average'), Bool(false)),
                                SetValue(GetVariable('i'), Add(GetVariable('i'), GetProperty(entry, 'value'))),
                            ]),
                    ])
                    .Else([
                        If(LessThanOrEqual(GetVariable('i'), GetVariable('half'))).Then([
                            SetValue(GetVariable('result'), GetProperty(entry, 'key')),
                            SetValue(GetVariable('i'), Add(GetVariable('i'), GetProperty(entry, 'value'))),
                        ]),
                    ]),
            ]),
            Return(GetVariable('result')),
        ]),
        list,
        line,
    );
};

export const Math = {
    Add,
    Multiply,
    Subtract,
    Divide,
    EuclideanDivision,
    Mod,
    ShiftLeft,
    ShiftRight,
    Median,
};

export default Math;
