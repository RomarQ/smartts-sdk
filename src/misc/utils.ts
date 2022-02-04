import { Prim } from '../core/enums/prim';
import { ILayout } from '../typings/literal';
import { IToString } from '../typings/shared';

export const parenthesis = (str: string) => `(${str})`;
export const quote = (str: string) => `"${str}"`;
export const capitalizeBoolean = (bool: boolean): string => (bool ? Prim.True : Prim.False);

export class LineInfo implements IToString {
    constructor(public fileName = '', public lineNumber = '-1') {
        const stack = new Error().stack || '';
        const matches = stack.match(/Object.*[(](.+):(\d+):(\d+)[)]/);
        if (matches) {
            if (matches.length > 0) {
                this.fileName = matches[1].split('/').reverse()[0];
            }
            if (matches.length > 1) {
                this.lineNumber = matches[2];
            }
        }
    }

    toString() {
        return `("${this.fileName}" ${this.lineNumber})`;
    }
}

/**
 * @description Build right aligned nested binary pairs
 * @see https://tezos.gitlab.io/active/michelson.html#operations-on-pairs-and-right-combs
 * @param fields A sequence of strings
 * @returns {ILayout}
 */
export const composeRightCombLayout = (fields: string[]): ILayout => {
    if (fields.length > 2) {
        return [fields[0], composeRightCombLayout(fields.slice(1))];
    }
    return fields;
};

const Utils = {
    capitalizeBoolean,
    composeRightCombLayout,
    parenthesis,
    quote,
};

export default Utils;
