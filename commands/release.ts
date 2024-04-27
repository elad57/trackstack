import * as fs from 'fs';
import * as path from 'path';
import { Command } from 'commander';
import CLICommand from '../modules/commands';
import ProjectVersionData from '../modules/project-version-data'

const NEXT_VERSION_FILE = 'nextVersion.json'

const stringSort = (firstFile: string, secondFile: string): number => firstFile > secondFile ? -1 : 1

const isSemanticVersion = (version: string): boolean => {
    const regex = /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;
    return regex.test(version);
}

const getProjectPreviousVersionsByOrder = (projectPath: string): string[] => {    
    const projectFiles = fs.readdirSync(projectPath);
    const versionFiles = projectFiles.filter(isSemanticVersion)

    return versionFiles.sort(stringSort);
};


const action = (projectPath: string, version: string): void => {
    if(!isSemanticVersion(version)) {
        console.log(`Use sementic version for new release!`)
        return;
    }

    let changesInVersion: Record<string, string>
    
    let projectVersionData: ProjectVersionData = {
        projectVersion: version,
        changes: {},
        allMicroservices: {},
        previousVersions:[]    
    }
    
    const pathToNextVersion: string = path.join(projectPath, NEXT_VERSION_FILE);
    
    try {
        const data: Buffer = fs.readFileSync(pathToNextVersion);
        changesInVersion = JSON.parse(data as any);
    } catch (readFileError) {
        console.log(`Couldn't find vaid ${pathToNextVersion} in project directory`);
        return;
    }
    
    console.log(changesInVersion)
    const previousVersions: string[] = getProjectPreviousVersionsByOrder(projectPath);
    console.log(previousVersions)
    
    
    projectVersionData.projectVersion = version;
    projectVersionData.changes = changesInVersion;
    
    if(!previousVersions.length) {
        projectVersionData.allMicroservices = changesInVersion;
        projectVersionData.previousVersions = [version];
    } else {
        const data: Buffer = fs.readFileSync(`${projectPath}/${previousVersions[0]}.json`);
        const previousVersion: ProjectVersionData = JSON.parse(data as any);
        
        projectVersionData = previousVersion;
        
        projectVersionData.allMicroservices = {
            ...projectVersionData.allMicroservices,
            ...changesInVersion
        }

        projectVersionData.previousVersions.unshift(version);
    }

    fs.writeFileSync(`${projectPath}/${version}.json`, JSON.stringify(projectVersionData));

    fs.unlinkSync(pathToNextVersion)
    
    console.log(`Release version ${version}!!`)
}

const setupCommand = (program: Command, releaseCommand: CLICommand) => {
    program.command(releaseCommand.commandName)
    .argument(`<${releaseCommand.arguments[0].argumentName}>`)
    .argument(`<${releaseCommand.arguments[1].argumentName}>`)
    .action(releaseCommand.action)

    return program;
}

const releaseCommand: CLICommand = {
    action,
    commandName: 'release',
    arguments: [
        {
            argumentName: 'pathToProject',
            description: 'Path to project folder'
        },
        {
            argumentName: 'version',
            description: 'New project version '
        }
    ],
    options: {},
    setupCommand
};

export default releaseCommand