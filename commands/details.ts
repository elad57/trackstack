import * as fs from 'fs';
import { Command } from 'commander';
import CLICommand from '../modules/commands';
import ProjectVersionData from '../modules/project-version-data';
import { isString, isTrueNotString } from '../utils/string-utils';

const action = (pathToProject: string, version: string, options: Record<string, string>): void => {
    const isChanges: boolean = isTrueNotString(options[detailsCommand.options['changes'].shourtCut]);
    const isAllServices: boolean = isTrueNotString(options[detailsCommand.options['allServices'].shourtCut]);

    if (isChanges && isAllServices) {
        console.log('Cannot show only changes an all services. please use just one flag');
        return;
    }

    const pathToVersion: string = `${pathToProject}${pathToProject[pathToProject.length -1] == '\\' ? 
    version : `\\${version}`}.json`; 
    
    try {
        fs.accessSync(pathToVersion);
    } catch(fileNotExistError) {
        console.log(`Cannot find file ${pathToVersion}`)
        return;
    }

    const versionBuffer: Buffer = fs.readFileSync(pathToVersion);
    const projectVersionData: ProjectVersionData = JSON.parse(versionBuffer as any);
    
    let versionDetails: string = JSON.stringify(projectVersionData);

    if (isChanges || isAllServices) {
        console.log(`project version: ${projectVersionData.projectVersion}`);  
        
        
        if(isChanges) {
            versionDetails = `Changes in this version: \n`
            versionDetails += JSON.stringify(projectVersionData.changes)
        }
        
        if(isAllServices) {
            versionDetails = `All services in this version: \n`
            versionDetails += JSON.stringify(projectVersionData.allMicroservices)
        }
    }

    console.log(versionDetails)
}

const setupCommand = (program: Command, detailsCommand: CLICommand): Command => {
    const options: string[] = Object.keys(detailsCommand.options);
    const changes: string = options[0];
    const allServices: string = options[1];

    program.command(detailsCommand.commandName)
    .argument(detailsCommand.arguments[0].argumentName, detailsCommand.arguments[0].description)
    .argument(detailsCommand.arguments[1].argumentName, detailsCommand.arguments[0].description)
    .option(`-${detailsCommand.options[changes].shourtCut}`, `--${changes}`, detailsCommand.options[changes].description)
    .option(`-${detailsCommand.options[allServices].shourtCut}`, `--${allServices}`, detailsCommand.options[allServices].description)
    .action(detailsCommand.action);

    return program;
}

const detailsCommand: CLICommand = {
    action,
    commandName: 'details',
    arguments: [
        {
            argumentName: 'pathToProject',
            description: 'Path to project folder'
        },
        {
            argumentName: 'version',
            description: 'this service version'
        },
    ],
    options: {
        'changes': {
            description:'Show only changes in this version',
            shourtCut: 'c'
        },
        'allServices': {
            description: 'Show all services version',
            shourtCut: 'a'
        }
    },
    setupCommand
};

export default detailsCommand