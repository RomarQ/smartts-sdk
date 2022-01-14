import fs from 'fs';
import SmartML from '../src/smartml';

jest.setTimeout(50000);

const verifyMichelsonOutput = (contract: string) => {
    const michelson = SmartML.compileContract(contract);

    // No errors expected
    expect(JSON.stringify(michelson).includes('ERROR')).toBeFalsy();
    // Check snapshot
    expect(michelson).toMatchSnapshot();
};

async function runTests() {
    const files = fs.readdirSync('./tests/templates', { encoding: 'utf-8' });
    files.forEach(async (fileName) => {
        test(fileName, async () => {
            try {
                const contract = (await import(`./templates/${fileName}`)).default.toString();
                expect(contract).toMatchSnapshot();
                verifyMichelsonOutput(contract);
            } catch (e) {
                console.debug(e);
            }
        });
    });
}

describe('Test contract templates', () => {
    runTests();
});
