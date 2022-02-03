import SmartML from '../src/smartml';

export const verifyMichelsonOutput = (contract: string) => {
    const michelson = SmartML.compileContract(contract);

    // Check snapshot
    expect(JSON.stringify(michelson, null, 4)).toMatchSnapshot();
    // No errors expected
    expect(JSON.stringify(michelson).match(/[Ee][Rr][Rr][Oo][rR]/)).toBeFalsy();
};
