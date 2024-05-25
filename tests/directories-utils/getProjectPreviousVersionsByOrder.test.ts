import * as fs from 'fs';
import { getProjectPreviousVersionsByOrder } from '../../src/utils/direcories-utils';

jest.mock('fs');

describe('getProjectPreviousVersionsByOrder', () => {
    test('returns versions in descending order', () => {
        (fs.readdirSync as jest.Mock).mockReturnValueOnce(['1.0.0.json', '2.0.0.json', '0.1.0.json']);
        expect(getProjectPreviousVersionsByOrder('/path/to/project')).toEqual(['2.0.0', '1.0.0', '0.1.0']);
    });

    test('returns empty array when no version files found', () => {
        (fs.readdirSync as jest.Mock).mockReturnValueOnce([]);
        expect(getProjectPreviousVersionsByOrder('/path/to/project')).toEqual([]);
    });
    
    test('return one version file found', () => {
        (fs.readdirSync as jest.Mock).mockReturnValueOnce(['1.0.0.json']);
        expect(getProjectPreviousVersionsByOrder('/path/to/project')).toEqual(['1.0.0']);
    });
    
    test('returns no .json when versions are already decending', () => {
        (fs.readdirSync as jest.Mock).mockReturnValueOnce(['2.0.0.json','1.0.0.json', '0.1.0.json']);
        expect(getProjectPreviousVersionsByOrder('/path/to/project')).toEqual(['2.0.0','1.0.0', '0.1.0']);
    });
    
    test('fillter files not semntic versions', () => {
        (fs.readdirSync as jest.Mock).mockReturnValueOnce(['1.0.0.json', '2.0.0.json', 'my-file.json' ,'0.1.0.json', 'someother-file.yaml']);
        expect(getProjectPreviousVersionsByOrder('/path/to/project')).toEqual(['2.0.0', '1.0.0', '0.1.0']);
    });
});