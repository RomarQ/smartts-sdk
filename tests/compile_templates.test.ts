import fs from 'fs';
import { verifyMichelsonOutput } from './util';

jest.setTimeout(50000);

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
