import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { IType } from '../typings/type';

/**
 * Inline michelson code.
 *
 * ```typescript
 * InlinedMichelson(
 *  `
 *   DUP;
 *   SIZE;
 *   DIG 2;
 *   SWAP;
 *   PUSH nat 0;
 *   SLICE;
 *   IF_NONE
 *       {
 *           DROP;
 *           PUSH bool False;
 *       }
 *       {
 *           COMPARE;
 *           EQ;
 *       };
 *  `,
 *  [TString(), TString()],
 *  [TBool()]
 * )
 * ```
 *
 * @category Michelson
 *
 * @param micheline Micheline code
 * @param left The type of the inputs (stack)
 * @param right The type of the ouputs (stack)
 *
 * @returns {IExpression} An expression
 */
export const InlinedMichelson = (micheline: string, inputTypes: IType[], outTypes: IType[]): IExpression => {
    return new Expression(ExpressionAtom.op, `"${micheline}"`, ...inputTypes, 'out', ...outTypes);
};

/**
 * Call inlined michelson.
 *
 * @category Michelson
 *
 * @param inlinedMicheline Inlined michelson
 * @param args Arguments
 *
 * @returns {IExpression} An expression
 */
export const CallMichelson = (inlinedMicheline: IExpression, line = new LineInfo(), ...args: IExpression[]) => {
    return new Expression(ExpressionAtom.call_michelson, inlinedMicheline, line, ...args);
};
