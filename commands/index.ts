import { Command } from 'commander';
import CLICommands from "../modules/commands";
import initCommand from './init'
import updateto from './updateto'
import release from './release'

const commands: Record<string, CLICommands> = {
    init: initCommand,
    updateto,
    release
}

export default commands;