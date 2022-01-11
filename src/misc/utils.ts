import { IToString } from '../typings/shared';

export const capitalizeBoolean = (bool: boolean): string => (bool ? 'True' : 'False');

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

const Utils = {
    capitalizeBoolean,
};

export default Utils;
