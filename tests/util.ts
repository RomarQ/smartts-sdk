import SmartML from '../src/compiler';

export const verifyLambdaCompilationOutput = (lambda: string) => {
    const result = SmartML.compileLambda(lambda);

    // Check snapshot
    expect(JSON.stringify(result, null, 4)).toMatchSnapshot();
    // No errors expected
    expect(JSON.stringify(result).match(/[Ee][Rr][Rr][Oo][rR]/)).toBeFalsy();
};

export const verifyContractCompilationOutput = (contract: string) => {
    const michelson = SmartML.compileContract(contract);

    // Check snapshot
    expect(JSON.stringify(michelson, null, 4)).toMatchSnapshot();
    // No errors expected
    expect(JSON.stringify(michelson).match(/[Ee][Rr][Rr][Oo][rR]/)).toBeFalsy();
};
