import { MichelsonType } from '../core/enums/type';
import { CallMichelson, InlinedMichelson } from '../expression';
import { TBool, TString } from '../type';
import { IExpression } from '../typings/expression';

/**
 * Check if a string starts with a given prefix
 *
 * @param text
 * @param prefix
 *
 * @returns {IExpression} An expression of types `TBool()`.
 */
export const StartsWith = (text: IExpression<MichelsonType.string>, prefix: IExpression<MichelsonType.string>) => {
    const inlinedMichelson = InlinedMichelson(
        `
        DUP;
        SIZE;
        DIG 2;
        SWAP;
        PUSH nat 0;
        SLICE;
        IF_NONE
            {
                DROP;
                PUSH bool False;
            }
            {
                COMPARE;
                EQ;
            };
        `,
        [TString(), TString()],
        [TBool()],
    );
    return CallMichelson(inlinedMichelson, text, prefix);
};
