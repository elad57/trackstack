import * as fs from 'fs';
import * as path from 'path';
import * as dayjs from 'dayjs';
import command from '../../src/commands/release';
import { getProjectPreviousVersionsByOrder } from '../../src/utils/direcories-utils';
import ProjectVersionData from '../../src/modules/project-version-data';

jest.mock('fs');
jest.mock('dayjs');
jest.mock('../../src/utils/direcories-utils');

describe('release', () => {
  const projectPath = '/path/to/project';
  const version = '1.0.0';
  const NEXT_VERSION_FILE = 'nextVersion.json';
  const pathToNextVersion = path.join(projectPath, NEXT_VERSION_FILE);
  
    beforeEach(() => {
      jest.clearAllMocks();
      (dayjs as any as jest.Mock).mockImplementation(() => {
        return {
            format: jest.fn().mockImplementation(() => 'timestamp')
        }
      })
    });
    
    it('should log an error and return if version is not semantic', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        command.action(projectPath, 'invalidVersion');

        expect(consoleSpy).toHaveBeenCalledWith('Use semantic version for new release!');
        expect(fs.readFileSync).not.toHaveBeenCalled();
        consoleSpy.mockRestore();
    });

    test('should log an error if next version file is missing', () => {
        (fs.readFileSync as jest.Mock).mockImplementation(() => { throw new Error('File not found'); });
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        
        
        command.action(projectPath, version);
        
        expect(consoleSpy).toHaveBeenCalledWith(`Couldn't find valid ${pathToNextVersion} in project directory`);
        consoleSpy.mockRestore();
    });
    
    test('should handle the first release correctly', () => {
        const changesInVersion = { serviceA: '1.0.0' };
        (fs.readFileSync as jest.Mock).mockReturnValueOnce(Buffer.from(JSON.stringify(changesInVersion)));
        (getProjectPreviousVersionsByOrder as jest.Mock).mockReturnValue([]);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        
        command.action(projectPath, version);
        
        const expectedData: ProjectVersionData = {
            projectVersion: '1.0.0',
            changes: {
                serviceA: '1.0.0'
            },
            allMicroservices: {
                serviceA:'1.0.0'
            },
            previousVersions: ['1.0.0'],
            publishTimestamp: 'timestamp'
        };
        
        expect(fs.writeFileSync).toHaveBeenCalledWith(`/path/to/project/1.0.0.json`, JSON.stringify(expectedData));
        expect(fs.unlinkSync).toHaveBeenCalledWith(`\\path\\to\\project\\nextVersion.json`);
        expect(consoleSpy).toHaveBeenCalledWith(`Release version 1.0.0!!`);
        consoleSpy.mockRestore();
    });
    
    test('should handle subsequent releases correctly', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        const changesInVersion = { serviceA: '1.1.0' };
        const previousVersion = '1.0.0';
        const previousData: ProjectVersionData = {
            projectVersion: previousVersion,
            changes: { serviceA: '1.0.0' },
            allMicroservices: { serviceA: '1.0.0' },
            previousVersions: [previousVersion],
            publishTimestamp: 'timestamp'
        };
        
        (fs.readFileSync as jest.Mock).mockImplementation((filePath) => {
            if (filePath === pathToNextVersion) {
                return Buffer.from(JSON.stringify(changesInVersion));
            }
            
            return Buffer.from(JSON.stringify(previousData));
        });
        
        (getProjectPreviousVersionsByOrder as jest.Mock).mockReturnValue([previousVersion]);
        
        command.action(projectPath, '1.1.0');
        
        const expectedData: ProjectVersionData = {
            projectVersion: '1.1.0',
            changes: {
                serviceA: '1.1.0'
            },
            allMicroservices: { 
                serviceA: '1.1.0'
            },
            previousVersions: ['1.1.0', '1.0.0'],
            publishTimestamp: 'timestamp'
        };
        
        expect(fs.writeFileSync).toHaveBeenCalledWith(`/path/to/project/1.1.0.json`, JSON.stringify(expectedData));
        expect(fs.unlinkSync).toHaveBeenCalledWith(pathToNextVersion);
        expect(consoleSpy).toHaveBeenCalledWith(`Release version 1.1.0!!`);
        consoleSpy.mockRestore();
    });
});