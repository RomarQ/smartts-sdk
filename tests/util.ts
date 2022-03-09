import SmartML from '../src/compiler';
import { Contract } from '../src/core';
import { ILiteral } from '../src/typings/literal';

export const verifyValueCompilationOutput = (lambda: ILiteral) => {
    const result = SmartML.compileValue(lambda);

    expect(lambda.toString()).toMatchSnapshot();
    // Check snapshot
    expect(JSON.stringify(result, null, 4)).toMatchSnapshot();
    // No errors expected
    expect(JSON.stringify(result).match(/[Ee][Rr][Rr][Oo][rR]/)).toBeFalsy();
};

export const verifyContractCompilationOutput = (contract: Contract) => {
    const michelson = SmartML.compileContract(contract);

    expect(contract.toString()).toMatchSnapshot();
    // Check snapshot
    expect(JSON.stringify(michelson, null, 4)).toMatchSnapshot();
    // No errors expected
    expect(JSON.stringify(michelson).match(/[Ee][Rr][Rr][Oo][rR]/)).toBeFalsy();
};
