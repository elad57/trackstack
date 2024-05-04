#!/usr/bin/env node
import { Command } from 'commander';
import commands from './commands/index'

const program: Command = new Command();

for (const command in commands) {
  commands[command].setupCommand(program, commands[command]);
}

program.parse(process.argv)

