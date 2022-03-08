import SmartML from '../src/compiler';
import { Contract } from '../src/core';
import TypeAtom from '../src/core/enums/type';
import { ILiteral } from '../src/typings/literal';

export const verifyLambdaCompilationOutput = (lambda: ILiteral<TypeAtom.lambda>) => {
    const result = SmartML.compileLambda(lambda);

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
