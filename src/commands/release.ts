import * as fs from 'fs';
import * as path from 'path';
import * as dayjs from 'dayjs'
import { Command } from 'commander';

import CLICommand from '../modules/commands';
import ProjectVersionData from '../modules/project-version-data'
import { isSemanticVersion } from '../utils/string-utils'
import { getProjectPreviousVersionsByOrder } from '../utils/direcories-utils'

const NEXT_VERSION_FILE = 'nextVersion.json'

const action = (projectPath: string, version: string): void => {
    if(!isSemanticVersion(version)) {
        console.log(`Use semantic version for new release!`)
        return;
    }

    let changesInVersion: Record<string, string>
    
    let projectVersionData: ProjectVersionData = {
        projectVersion: version,
        changes: {},
        allMicroservices: {},
        previousVersions:[],
        publishTimestamp: dayjs().format('YYYY-MM-DD HH:mm:ss.SSSZ').toString()    
    }
    
    const pathToNextVersionFile: string = path.join(projectPath, NEXT_VERSION_FILE);
    
    try {
        const data: Buffer = fs.readFileSync(pathToNextVersionFile);
        changesInVersion = JSON.parse(data as any);
    } catch (readFileError) {
        console.log(`Couldn't find valid ${pathToNextVersionFile} in project directory`);
        return;
    }
    
    const previousVersions: string[] = getProjectPreviousVersionsByOrder(projectPath);    
    
    projectVersionData.projectVersion = version;
    projectVersionData.changes = changesInVersion;
    
    if(!previousVersions.length) {
        projectVersionData.allMicroservices = changesInVersion;
        projectVersionData.previousVersions = [version];
    } else {
        const data: Buffer = fs.readFileSync(`${projectPath}/${previousVersions[0]}.json`);
        const previousVersion: ProjectVersionData = JSON.parse(data as any);
                
        projectVersionData.allMicroservices = {
            ...projectVersionData.allMicroservices,
            ...changesInVersion
        }

        projectVersionData.previousVersions = [version, ...previousVersion.previousVersions];
    }

    fs.writeFileSync(`${projectPath}/${version}.json`, JSON.stringify(projectVersionData));

    fs.unlinkSync(pathToNextVersionFile)
    
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