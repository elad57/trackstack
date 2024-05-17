import * as fs from 'fs';
import { Command } from 'commander';
import initCommand from '../../src/commands/init';

jest.mock('fs')

describe('initCommand', () => {
    it('should create directory if it does not exist', () => {
        (fs.access as unknown as jest.Mock).mockImplementation((_path, _mode, callback) => callback(new Error('Directory does not exist')));
        (fs.mkdir as unknown as jest.Mock).mockImplementation((_path, callback) => callback(null));

        const logSpy = jest.spyOn(console, 'log');

        initCommand.action('testProject', { path: './testDir' });

        expect(fs.mkdir).toHaveBeenCalledWith('./testDir/testProject', expect.any(Function));
        expect(logSpy).toHaveBeenCalledWith('project initialized successfully!');

        logSpy.mockRestore();
    });

    it('should log if directory already exists', () => {
        (fs.access as unknown as jest.Mock).mockImplementation((_path, _mode, callback) => callback(null));

        const logSpy = jest.spyOn(console, 'log');

        initCommand.action('testProject', { path: './testDir' });

        expect(logSpy).toHaveBeenCalledWith('directory is already existing!');

        logSpy.mockRestore();
    });

    it('should log error if mkdir fails', () => {
        (fs.access as unknown as jest.Mock).mockImplementation((_path, _mode, callback) => callback(new Error('Directory does not exist')));
        (fs.mkdir as unknown as jest.Mock).mockImplementation((_path, callback) => callback(new Error('Failed to create directory')));

        const logSpy = jest.spyOn(console, 'log');

        initCommand.action('testProject', { path: './testDir' });

        expect(logSpy).toHaveBeenCalledWith('Error occurred! Failed to create directory');

        logSpy.mockRestore();
    });
});