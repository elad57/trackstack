import * as fs from 'fs';
import CLICommand from '../modules/commands';
import { Command } from 'commander';

const action = (project: string, options : {path?: string}): void => {
    const dirUri: string = `${options?.path || '.'}/${project}`
    fs.access(dirUri, fs.constants.F_OK, (fileSystemAccesError) => {

        if(!fileSystemAccesError) {
            console.log('directory is already existing!')
            return;
        }

        fs.mkdir(dirUri, (fileSysemMakeDirError) => {
            if(fileSysemMakeDirError) {
                console.log(`Error occurred! ${fileSysemMakeDirError.message}`);
                return;
            } 

            console.log('project initialized successfully!');
        })
    })
}

const setupCommand = (program: Command, initCommand: CLICommand): Command => {
    const initPathOption: string = Object.keys(initCommand.options)[0]; 
    program.command(initCommand.commandName)
    .option(`-${initCommand.options[initPathOption].shourtCut}, --${initPathOption} <${initPathOption}>`, initCommand.options[initPathOption].description)
    .argument(`<${initCommand.arguments[0].argumentName}>`)
    .action(initCommand.action)

    return program;
}

const initCommand: CLICommand = {
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
    },
    setupCommand
};

export default initCommand