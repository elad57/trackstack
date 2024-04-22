export interface Argument {
    argumentName: string,
    description: string
}

export default interface CLICommand<T> {
    action: (...args: any[]) => void | Promise<void>,
    commandName: string,
    arguments: Argument[],
    options: Record<string, {shourtCut: string, description: string}>
}