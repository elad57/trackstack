import CLICommands from "../modules/commands";
import initCommand from './init';
import updateto from './updateto';
import release from './release';
import get from './get';
import details from './details';
import status from './status'

const commands: Record<string, CLICommands> = {
    init: initCommand,
    updateto,
    release,
    get,
    details,
    status,
}

export default commands;