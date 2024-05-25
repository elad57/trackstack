import * as fs from 'fs';
import command from '../../src/commands/updateto';
import { microserviceVersionFileToMicroServiceDataMap } from '../../src/commands/updateto-version-files-support';
import { json } from 'stream/consumers';


jest.mock('fs');
jest.mock('../../src/commands/updateto-version-files-support')

describe('updateto command', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should handle project not initialized error', () => {
        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
        const pathToProject = '/path/to/project';
        const options = { path: '/path/to/version/file' };
        (fs.accessSync as jest.Mock ).mockImplementation(() => {
            throw new Error('Project not initialized');
        });

        command.action(pathToProject, options);

        expect(mockConsoleLog).toHaveBeenCalledWith(
            `Project not initialized!, try using trackstack init -p /path/to/ project`
        );

        mockConsoleLog.mockRestore();
    });

    test('should handle nextVersion.json read error', () => {
        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
        const pathToProject = '/path/to/project';
        const options = { path: '/path/to/version/file' };
        (fs.accessSync as jest.Mock).mockImplementation(() => {}); 
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {}); 
        (fs.readFileSync as jest.Mock).mockImplementation(() => {
            throw new Error('Unable to read nextVersion.json');
        });

        command.action(pathToProject, options);
        expect(mockConsoleLog).toHaveBeenCalledWith(
            `unable to read nextVersion.json in /path/to/project/nextVersion.json`
        );
        mockConsoleLog.mockRestore();
    });

   test('should handle getMicroserviceVersionData error',async () => {
        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
        const pathToProject = '/path/to/project';
        const options = { path: '/path/to/version/file/package.json' };

        (fs.accessSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue('{}'); 
        jest.spyOn(microserviceVersionFileToMicroServiceDataMap, 'package.json').mockImplementation(() => {throw 'Error fetching version data'})
        
        await command.action(pathToProject, options);
        expect(mockConsoleLog).toHaveBeenCalledWith('Error fetching version data');
        mockConsoleLog.mockRestore();
    });
    
    test('No name in package.json',async () => {
        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
        const pathToProject = '/path/to/project';
        const options = { path: '/path/to/version/file/package.json' };
        
        (fs.accessSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue('{}'); 
        jest.spyOn(microserviceVersionFileToMicroServiceDataMap, 'package.json').mockImplementation(async () =>  {return {name: '', version:'1.0.0'}})
        
        await command.action(pathToProject, options);
        expect(mockConsoleLog).toHaveBeenCalledWith('No name mentioned on version file');
        mockConsoleLog.mockRestore();
    });
    
    test('valid package.json',async () => {
        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
        const pathToProject = '/path/to/project';
        const options = { path: '/path/to/version/file/package.json' };
        
        (fs.accessSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue('{}'); 
        jest.spyOn(microserviceVersionFileToMicroServiceDataMap, 'package.json').mockImplementation(async () =>  {return {name: 'test', version:'1.0.0'}})
        
        await command.action(pathToProject, options);
        expect(mockConsoleLog).toHaveBeenCalledWith('added test:1.0.0 to next version!');
        mockConsoleLog.mockRestore();
    });
    
    test('No version in package.json',async () => {
        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
        const pathToProject = '/path/to/project';
        const options = { path: '/path/to/version/file/package.json' };
        
        (fs.accessSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue('{}'); 
        jest.spyOn(microserviceVersionFileToMicroServiceDataMap, 'package.json').mockImplementation(async () =>  {return {name: 'test', version:''}})
        
        await command.action(pathToProject, options);
        expect(mockConsoleLog).toHaveBeenCalledWith('No version mentioned on version file');
        mockConsoleLog.mockRestore();
    });
    
    test('valid pom.xml',async () => {
        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
        const pathToProject = '/path/to/project';
        const options = { path: '/path/to/version/file/pom.xml' };
        
        (fs.accessSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue('{}'); 
        jest.spyOn(microserviceVersionFileToMicroServiceDataMap, 'pom.xml').mockImplementation(async () =>  {return {name: 'test', version:'1.0.0'}})
        
        await command.action(pathToProject, options);
        expect(mockConsoleLog).toHaveBeenCalledWith('added test:1.0.0 to next version!');
        mockConsoleLog.mockRestore();
    });
    
    test('No name in pom.xml',async () => {
        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
        const pathToProject = '/path/to/project';
        const options = { path: '/path/to/version/file/pom.xml' };
        
        (fs.accessSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue('{}'); 
        jest.spyOn(microserviceVersionFileToMicroServiceDataMap, 'pom.xml').mockImplementation(async () =>  {return {name: '', version:'1.0.0'}})
        
        await command.action(pathToProject, options);
        expect(mockConsoleLog).toHaveBeenCalledWith('No name mentioned on version file');
        mockConsoleLog.mockRestore();
    });
    
    test('No version in pom.xml',async () => {
        const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
        const pathToProject = '/path/to/project';
        const options = { path: '/path/to/version/file/pom.xml' };
        
        (fs.accessSync as jest.Mock).mockImplementation(() => {});
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
        (fs.readFileSync as jest.Mock).mockReturnValue('{}'); 
        jest.spyOn(microserviceVersionFileToMicroServiceDataMap, 'pom.xml').mockImplementation(async () =>  {return {name: 'test', version:''}})
        
        await command.action(pathToProject, options);
        expect(mockConsoleLog).toHaveBeenCalledWith('No version mentioned on version file');
        mockConsoleLog.mockRestore();
    });
    
    test('no next version file exist',async () => {
         const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
         const pathToProject = '/path/to/project';
         const options = { path: '/path/to/version/file/package.json' };
    
         (fs.accessSync as jest.Mock)
         .mockImplementationOnce(() => {})
         .mockImplementationOnce(() => {throw new Error('test 2')})
         .mockImplementation(() => {});

         (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
         (fs.readFileSync as jest.Mock).mockReturnValue('{}'); 
         jest.spyOn(microserviceVersionFileToMicroServiceDataMap, 'package.json').mockImplementation(async () => { return {name: 'test', version: '1.0.0'}})
         
         await command.action(pathToProject, options);
         expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
         expect(fs.writeFileSync).toHaveBeenNthCalledWith(1,"/path/to/project/nextVersion.json", JSON.stringify({}));
         expect(fs.writeFileSync).toHaveBeenNthCalledWith(2,"/path/to/project/nextVersion.json", JSON.stringify({"test":"1.0.0"}));
         mockConsoleLog.mockRestore();
     });
})