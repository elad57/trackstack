import * as fs from 'fs';
import * as path from 'path';
import command from '../../src/commands/details';
import ProjectVersionData from '../../src/modules/project-version-data';

jest.mock('fs');

describe('action', () => {
  const pathToProject = '/path/to/project';
  const version = '1.0.0';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log an error and return if both flags are true', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    command.action(pathToProject, version, {
        c: true,
        a: true
    });

    expect(consoleSpy).toHaveBeenCalledWith('Cannot show only changes and all services. please use just one flag');
    expect(fs.accessSync).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should log an error if the version file does not exist', () => {
    (fs.accessSync as jest.Mock).mockImplementation(() => { throw new Error('File not found'); });
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    command.action(pathToProject, version, {});

    expect(consoleSpy).toHaveBeenCalledWith(`Cannot find file /path/to/project\\1.0.0.json`);
    consoleSpy.mockRestore();
  });

  it('should log changes details if isChanges flag is true', () => {
    const changesInVersion = { serviceA: '1.0.0' };
    const projectVersionData: ProjectVersionData = {
      projectVersion: version,
      changes: changesInVersion,
      allMicroservices: changesInVersion,
      previousVersions: [version],
      publishTimestamp: 'timeStamp'
    };
    
    (fs.accessSync as jest.Mock).mockImplementation(() => {});
    (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from(JSON.stringify(projectVersionData)));
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    command.action(pathToProject, version, { c: true });

    expect(consoleSpy).toHaveBeenCalledWith(`project version: ${projectVersionData.projectVersion}`);
    expect(consoleSpy).toHaveBeenCalledWith(`Changes in this version: \n${JSON.stringify(changesInVersion)}`);
    consoleSpy.mockRestore();
  });

  it('should log all services details if isAllServices flag is true', () => {
    const changesInVersion = { serviceA: '1.0.0' };
    const projectVersionData: ProjectVersionData = {
      projectVersion: version,
      changes: changesInVersion,
      allMicroservices: changesInVersion,
      previousVersions: [version],
      publishTimestamp: 'timestamp'
    };
    
    (fs.accessSync as jest.Mock).mockImplementation(() => {});
    (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from(JSON.stringify(projectVersionData)));
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    command.action(pathToProject, version, { a: true });

    expect(consoleSpy).toHaveBeenCalledWith(`project version: ${projectVersionData.projectVersion}`);
    expect(consoleSpy).toHaveBeenCalledWith(`All services in this version: \n${JSON.stringify(changesInVersion)}`);
    consoleSpy.mockRestore();
  });

  it('should log the entire project version data if no flags are provided', () => {
    const changesInVersion = { serviceA: '1.0.0' };
    const projectVersionData: ProjectVersionData = {
      projectVersion: version,
      changes: changesInVersion,
      allMicroservices: changesInVersion,
      previousVersions: [version],
      publishTimestamp: 'timestamp'
    };
    
    (fs.accessSync as jest.Mock).mockImplementation(() => {});
    (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from(JSON.stringify(projectVersionData)));
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    command.action(pathToProject, version, {});

    expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify(projectVersionData));
    consoleSpy.mockRestore();
  });
});