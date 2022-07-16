import ExpressionAtom from '../core/enums/expression';
import { MichelsonType } from '../core/enums/type';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Int } from './literal';
import { Multiply } from './math';

/**
 * Add seconds to a timestamp.
 *
 * ```typescript
 * AddSeconds(Timestamp(), Int(10));
 * ```
 *
 * @category | Timestamp
 *
 * @param timestamp
 * @param seconds The seconds to be added.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} A value of type `TTimestamp`.
 */
export const AddSeconds = (
    timestamp: IExpression<MichelsonType.timestamp>,
    seconds: IExpression<MichelsonType.int>,
    line = new LineInfo(),
) => {
    return new Expression(ExpressionAtom.add_seconds, timestamp, seconds, line);
};

/**
 * Add minutes to a timestamp.
 *
 * ```typescript
 * AddMinutes(Timestamp(), 10);
 * ```
 *
 * @category | Timestamp
 *
 * @param timestamp
 * @param minutes The minutes to be added.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} A value of type `TTimestamp`.
 */
export const AddMinutes = (
    timestamp: IExpression<MichelsonType.timestamp>,
    minutes: IExpression<MichelsonType.int>,
    line = new LineInfo(),
) => {
    return AddSeconds(timestamp, Multiply(minutes, Int(60)), line);
};

/**
 * Add minutes to a timestamp.
 *
 * ```typescript
 * AddHours(Timestamp(), 10);
 * ```
 *
 * @category | Timestamp
 *
 * @param timestamp
 * @param hours The minutes to be added.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} A value of type `TTimestamp`.
 */
export const AddHours = (
    timestamp: IExpression<MichelsonType.timestamp>,
    hours: IExpression<MichelsonType.int>,
    line = new LineInfo(),
) => {
    return AddSeconds(timestamp, Multiply(hours, Int(120)), line);
};
