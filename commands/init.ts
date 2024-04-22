import * as fs from 'fs';
import CLICommand from '../modules/commands';

const action = (project: string, options : {path?: string | undefined}): void => {
    const dirUri: string = `${options?.path || '.'}/${project}`
    fs.access(dirUri, fs.constants.F_OK, (fileSystemAccesError) => {
        
        if(!fileSystemAccesError) {
            console.log('directory is already exting!')
            return;
        }

        fs.mkdir(dirUri, (fileSysemMakeDirError) => {
            if(fileSysemMakeDirError) {
                console.log(`Error accured! ${fileSysemMakeDirError.message}`);
                return;
            } 

            console.log('project initalize succssefuly!');
        })
    })
}

const initCommand: CLICommand<string> = {
    action,
    commandName: 'init',
    arguments: [{
        argumentName: 'project',
        description: 'Initalize the project dir'
    }],
    options: {
        'path': {
            shourtCut: 'p',
            description: 'Path to create directory'
        } 
    }
};

export default initCommand