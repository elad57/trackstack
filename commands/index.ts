import { Command } from 'commander';
import CLICommands from "../modules/commands";
import initCommand from './init'
import updateto from './updateto'

const commands: Record<string, CLICommands> = {
    init: initCommand,
    updateto
}

export default commands;