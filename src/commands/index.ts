import CLICommands from "../modules/commands";
import initCommand from './init';
import updateto from './updateto';
import release from './release';
import get from './get';
import details from './details';

const commands: Record<string, CLICommands> = {
    init: initCommand,
    updateto,
    release,
    get,
    details
}

export default commands;