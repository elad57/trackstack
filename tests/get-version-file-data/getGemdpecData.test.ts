import * as fs from 'fs';
import getGemspecData from '../../src/commands/updateto-version-files-support/gemspec';
import { READ_FILE_FORMAT } from '../../src/utils/string-utils';

jest.mock('fs');

describe('getGemspecData', () => {
    const pathToGemspec = '/path/to/gemspec';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('return microservice data for a valid gemspec file', async () => {
        const gemspecContent = `
            spec.name = 'my-service'
            spec.version = '1.0.0'
        `;
        jest.spyOn(fs, 'readFileSync').mockReturnValue(gemspecContent);

        const result = await getGemspecData(pathToGemspec);
        expect(result).toEqual({ name: 'my-service', version: '1.0.0' });
        expect(fs.readFileSync).toHaveBeenCalledWith(pathToGemspec, READ_FILE_FORMAT);
    });

    it('throw an error if the gemspec file cannot be read', async () => {
       (fs.readFileSync as jest.Mock).mockImplementation(() => { throw new Error('File read error'); });

        expect(getGemspecData(pathToGemspec)).rejects.toBe(`cannot read file ${pathToGemspec}`);
    });

    it('throw an error if the gemspec content is missing the name', async () => {
        const gemspecContent = `spec.version = '1.0.0'`;
        (fs.readFileSync as jest.Mock).mockReturnValue(gemspecContent);

        expect(getGemspecData(pathToGemspec)).rejects.toBe('Gemspec file content is unvalid by not having version or name');
    });

    it('throw an error if the gemspec content is missing the version',async () => {
        const gemspecContent = `spec.name = 'my-service'`;
        (fs.readFileSync as jest.Mock).mockReturnValue(gemspecContent);

        expect(getGemspecData(pathToGemspec)).rejects.toBe('Gemspec file content is unvalid by not having version or name');
    });

    it('throw an error if the gemspec content is missing both name and version', () => {
        const gemspecContent = `spec.summary = 'A service'`;
        (fs.readFileSync as jest.Mock).mockReturnValue(gemspecContent);

        expect(getGemspecData(pathToGemspec)).rejects.toBe('Gemspec file content is unvalid by not having version or name');
    });
});
