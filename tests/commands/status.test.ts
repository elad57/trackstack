import * as fs from 'fs';
import command from '../../src/commands/status';

jest.mock('fs');

describe('status', () => {
    const pathToProject = '/path/to/project';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should log an error if the project is not initialized', () => {
        jest.spyOn(fs, 'accessSync').mockImplementation(() => { throw new Error('Project not found'); });
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        command.action(pathToProject);

        expect(consoleSpy).toHaveBeenCalledWith(`Project not initialized!, try using trackstack init -p ${pathToProject}`);
        expect(fs.existsSync).not.toHaveBeenCalled();
        consoleSpy.mockRestore();
    });

    test('should log a message if there is no next version file', () => {
        jest.spyOn(fs, 'accessSync').mockImplementation(() => {});
        jest.spyOn(fs, 'existsSync').mockReturnValue(false);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        command.action(pathToProject);

        expect(consoleSpy).toHaveBeenCalledWith(`Project has no changes to next version!`);
        expect(fs.readFileSync).not.toHaveBeenCalled();
        consoleSpy.mockRestore();
    });

    test('should log changes to the next version if the next version file exists and has changes', () => {
        const nextVersionData = {
            serviceA: '1.0.0',
            serviceB: '2.0.0'
        };

        jest.spyOn(fs, 'accessSync').mockImplementation(() => {});
        jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        jest.spyOn(fs, 'readFileSync').mockReturnValue(Buffer.from(JSON.stringify(nextVersionData)));
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        
        command.action(pathToProject);
        
        expect(consoleSpy).toHaveBeenCalledTimes(3);
        expect(consoleSpy).toHaveBeenCalledWith('Changes to next version: ');
        expect(consoleSpy).toHaveBeenCalledWith('serviceA: 1.0.0');
        expect(consoleSpy).toHaveBeenCalledWith('serviceB: 2.0.0');
        consoleSpy.mockRestore();
    });

    test('log one micro service change', () => {
        const nextVersionData = {
            serviceA: '1.0.0',
        };

        jest.spyOn(fs, 'accessSync').mockImplementation(() => {});
        jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        jest.spyOn(fs, 'readFileSync').mockReturnValue(Buffer.from(JSON.stringify(nextVersionData)));
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        command.action(pathToProject);

        expect(consoleSpy).toHaveBeenCalledTimes(2);
        expect(consoleSpy).toHaveBeenCalledWith('Changes to next version: ');
        expect(consoleSpy).toHaveBeenCalledWith('serviceA: 1.0.0');
        consoleSpy.mockRestore();
    });
});