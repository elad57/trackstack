import * as fs from 'fs';
import * as path from 'path'
import { Command } from 'commander';
import CLICommand from '../modules/commands';
import MicroserviceData from '../modules/microservice-data'
import { 
    microserviceVersionFileToMicroServiceDataMap, 
    optionToVersionFileName 
} from './updateto-version-files-support/index'

const READ_FILE_FORMAT = 'utf-8'

const getMicroserviceVersionData = (pathToMicroserviceVersionFile?: string, versionFileOption?: string) : MicroserviceData => {
    let versionFileName: string = optionToVersionFileName[versionFileOption ?? ''] ?? 'package.json';
    
    if(pathToMicroserviceVersionFile) {
        const splittedPathToVersionFile: string[] = pathToMicroserviceVersionFile.split('\\');
        versionFileName = splittedPathToVersionFile[splittedPathToVersionFile.length - 1];  
    }

    return microserviceVersionFileToMicroServiceDataMap[versionFileName](pathToMicroserviceVersionFile);
}

const isNextVersionFileExist=(pathToNextVersionFile: string): boolean => {    
    try {
        fs.accessSync(pathToNextVersionFile, fs.constants.F_OK);
        return true;
    } catch(errorNoNextVersionFile) {
        return false;
    }
} 


const action = (pathToProject: string, options: {path?: string}):void => {
    const splittedPathToProject: string[] = pathToProject.split('\\');
    const projectName = splittedPathToProject[splittedPathToProject.length - 1];
    const pathNoProject = path.join(pathToProject, '../');
    
    try {
        fs.accessSync(pathToProject, fs.constants.F_OK);
    } catch (fileSystemAccesError) {
        console.log(`Project not initalize!, try using trackstack init -p ${pathNoProject} ${projectName}`);
        return;
    }

    const nextVersionFile: string = 'nextVersion.json'
    const pathToNextVersionFile =`${pathToProject}${pathToProject[pathToProject.length -1] == '\\' ? 
    nextVersionFile : `\\${nextVersionFile}`}`; 
    
    if(!isNextVersionFileExist(pathToNextVersionFile)) {
        fs.writeFileSync(pathToNextVersionFile, JSON.stringify({}));
    }
    
    try {
        const nextVersionBuffer = fs.readFileSync(pathToNextVersionFile, READ_FILE_FORMAT);
        const nextVersionData: Record<string,string> = JSON.parse(nextVersionBuffer);
        const microserviceVersionData = getMicroserviceVersionData(options.path);

        if(!microserviceVersionData.name) {
            console.log('No name mentioned on version file');
            return;
        }

        if(!microserviceVersionData.version) {
            console.log('No version mentioned on version file');
            return
        }

        nextVersionData[microserviceVersionData.name] = microserviceVersionData.version
        fs.writeFileSync(pathToNextVersionFile, JSON.stringify(nextVersionData));
        console.log(`added ${microserviceVersionData.name}:${microserviceVersionData.version} to next version!`)
    } catch (nextVersionReadError) {
        console.log(`unable to read nextVersion.json in ${pathToNextVersionFile}`);
        return;
    }
    
}

const setupCommand = (program: Command, updatetoCommand: CLICommand): Command => {
    const pathProjectVersionFile: string = Object.keys(updatetoCommand.options)[0]; 
    program.command(updatetoCommand.commandName)
    .option(`-${updatetoCommand.options[pathProjectVersionFile].shourtCut}, --${pathProjectVersionFile} <${pathProjectVersionFile}>`, 
    updatetoCommand.options[pathProjectVersionFile].description)
    .argument(`<${updatetoCommand.arguments[0].argumentName}>`)
    .action(updatetoCommand.action)

    return program;
}

const updatetoCommand: CLICommand = {
    action,
    commandName: 'updateto',
    arguments: [{
        argumentName: 'pathToProject',
        description: 'Path to project folder'
    }],
    options: {
        'path': {
            shourtCut: 'p',
            description: 'Path to version file of microservice'
        } 
    },
    setupCommand
};

export default updatetoCommand