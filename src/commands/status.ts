import * as fs from 'fs';
import { Command } from 'commander';
import CLICommand from "../modules/commands";
import { READ_FILE_FORMAT } from '../utils/string-utils';

const action = (pathToProject: string): void => {
    try {
        fs.accessSync(pathToProject, fs.constants.F_OK);
    } catch (fileSystemAccesError) {
        console.log(`Project not initialized!, try using trackstack init -p ${pathToProject}`);
        return;
    }

    const nextVersionFile: string = 'nextVersion.json';
    const pathToNextVersionFile = `${pathToProject}/${nextVersionFile}`;
    if (!fs.existsSync(pathToNextVersionFile)) {
        console.log(`Project has no changes to next version!`);
        return;
    }

    const nextVersionBuffer = fs.readFileSync(pathToNextVersionFile, READ_FILE_FORMAT);
    const nextVersionData: Record<string, string> = JSON.parse(nextVersionBuffer);
    if (nextVersionData) {
        console.log(`Changes to next version: `);
        for (const microservice in nextVersionData) {
            console.log(`${microservice}: ${nextVersionData[microservice]}`);
        }
    }   
}
const setupCommand = (program: Command, initCommand: CLICommand): Command => {
    const initPathOption: string = Object.keys(initCommand.options)[0]; 
    program.command(initCommand.commandName)
    .argument(`<${initCommand.arguments[0].argumentName}>`)
    .action(initCommand.action)
    
    return program;
}

const command: CLICommand = {
    action,
    commandName: 'status',
    arguments: [{
        argumentName: 'pathToProject',
        description: 'Path to project folder'
    }],
    options: {},
    setupCommand
};

export default command;