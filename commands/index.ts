import { Command } from 'commander';
import CLICommands from "../modules/commands";
import initCommand from './init'
import updateto from './updateto'
import release from './release'
import get from './get'

const commands: Record<string, CLICommands> = {
    init: initCommand,
    updateto,
    release,
    get
}

export default commands;