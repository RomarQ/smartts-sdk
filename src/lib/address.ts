import { MichelsonType } from '../core/enums/type';
import { Address, And, GreaterThanOrEqual, LessThanOrEqual } from '../expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';

/**
 * Check if address is an originated contract
 *
 * @param address
 *
 * @returns {IExpression} An expression of types `TBool()`.
 */
export const IsKT1 = (address: IExpression<MichelsonType.address>, line?: LineInfo) => {
    return And(
        GreaterThanOrEqual(Address('KT1XvNYseNDJJ6Kw27qhSEDF8ys8JhDopzfG'), address),
        LessThanOrEqual(Address('KT18amZmM5W7qDWVt2pH6uj7sCEd3kbzLrHT'), address),
        line,
    );
};
