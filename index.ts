#!/usr/bin/env node
import { Command } from 'commander';
import initCommand from './commands/init';

const program: Command = new Command();

const initPathOption: string = Object.keys(initCommand.options)[0]; 
program.command(initCommand.commandName)
.option(`-${initCommand.options[initPathOption].shourtCut}, --${initPathOption} <${initPathOption}>`, initCommand.options[initPathOption].description)
.argument(`<${initCommand.arguments[0].argumentName}>`)
.action(initCommand.action);

program.parse(process.argv)

