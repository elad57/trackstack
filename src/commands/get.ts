import CLICommand from '../modules/commands';
import { Command } from 'commander';
import { getProjectPreviousVersionsByOrder } from "../utils/direcories-utils";

const action = (pathToProject: string): void => {
    const projectVersions: string[] = getProjectPreviousVersionsByOrder(pathToProject);
    projectVersions.forEach(version => console.log(version))
}

const setupCommand = (program: Command, getCommand: CLICommand): Command => {
    program.command(getCommand.commandName)
    .argument(getCommand.arguments[0].argumentName, getCommand.arguments[0].description)
    .action(getCommand.action);

    return program;
}

const getCommand: CLICommand = {
    action,
    commandName: 'getVersions',
    arguments: [{
        argumentName: 'pathToProject',
        description: 'Path to project folder'
    }],
    options: {},
    setupCommand
};

export default getCommand