// getPomXmlData.test.ts
import * as fs from 'fs';
import * as xml2js from 'xml2js';
import getPomXmlData  from '../../src/commands/updateto-version-files-support/pom-xml';

jest.mock('fs');
jest.mock('xml2js');

describe('getPomXmlData', () => {
  const pomXmlContent = `<project>
                            <groupId>com.example</groupId>
                            <artifactId>example-service</artifactId>
                            <version>1.0.0</version>
                            <!-- other pom.xml content -->
                        </project>`;

    beforeEach(() => {
        jest.clearAllMocks()
    });

    test('returns correct data when pom.xml is valid', async () => {
        const pomFilePath = '/path/to/pom.xml';
        (fs.readFileSync as jest.Mock).mockReturnValueOnce(pomXmlContent);
        (xml2js.parseStringPromise as jest.Mock).mockResolvedValueOnce({
            project: {
                artifactId: ['example-service'],
                version: ['1.0.0'],
            },
        });

        const result = await getPomXmlData(pomFilePath);

        expect(result).toEqual({ version: '1.0.0', name: 'example-service' });
        expect(fs.readFileSync).toHaveBeenCalledWith(pomFilePath, 'utf-8');
        expect(xml2js.parseStringPromise).toHaveBeenCalledWith(pomXmlContent);
    });

    test('throws error when file reading fails', async () => {
        const pomFilePath = '/path/to/pom.xml';
        const error = new Error('File read error');
        (fs.readFileSync as jest.Mock).mockImplementationOnce(() => {
            throw error;
        });

        await expect(getPomXmlData(pomFilePath)).rejects.toBe(`cannot read file ${pomFilePath}`);
        expect(fs.readFileSync).toHaveBeenCalledWith(pomFilePath, 'utf-8');
        expect(xml2js.parseStringPromise).not.toHaveBeenCalled();
    });

    test('throws error when xml parsing fails', async () => {
        const pomFilePath = '/path/to/pom.xml';
        (fs.readFileSync as jest.Mock).mockReturnValueOnce(pomXmlContent);
        const error = new Error('XML parsing error');
        (xml2js.parseStringPromise as jest.Mock).mockRejectedValueOnce(error);

        await expect(getPomXmlData(pomFilePath)).rejects.toThrow(error);
        expect(fs.readFileSync).toHaveBeenCalledWith(pomFilePath, 'utf-8');
        expect(xml2js.parseStringPromise).toHaveBeenCalledWith(pomXmlContent);
    });
});