import { Command } from "commander"

export interface Argument {
    argumentName: string,
    description: string
}

export default interface CLICommand {
    action: (...args: any[]) => void | Promise<void>,
    commandName: string,
    arguments: Argument[],
    options: Record<string, {shourtCut: string, description: string}>
    setupCommand: (program: Command, command: CLICommand) => Command
}