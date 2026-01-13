// Command Registry - Central hub for all terminal commands

import { CommandResult } from '../types';
import { themes } from '../themes';
import { welcomeBanner } from '../ascii-art';

import { helpCommand, themesCommand } from './help';
import { aboutCommand } from './about';
import { skillsCommand } from './skills';
import { projectsCommand, openProjectCommand } from './projects';
import { experienceCommand } from './experience';
import { contactCommand } from './contact';
import {
    sudoHireCommand,
    matrixCommand,
    hackCommand,
    cowsayCommand,
    neofetchCommand,
    rmRfCommand,
    whoamiCommand,
    dateCommand,
    echoCommand,
    fortuneCommand,
} from './easter-eggs';

export interface CommandContext {
    history: string[];
    setTheme: (theme: string) => void;
    clearTerminal: () => void;
    currentTheme: string;
}

export const executeCommand = (
    input: string,
    context: CommandContext
): CommandResult => {
    const trimmed = input.trim();
    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Handle empty input
    if (!command) {
        return { output: '', type: 'output' };
    }

    // Command routing
    switch (command) {
        case 'help':
        case '?':
            return helpCommand();

        case 'about':
        case 'whoami':
            if (command === 'whoami') return whoamiCommand();
            return aboutCommand();

        case 'skills':
        case 'tech':
        case 'stack':
            return skillsCommand();

        case 'projects':
        case 'work':
        case 'portfolio':
            return projectsCommand();

        case 'open':
        case 'view':
            return openProjectCommand(args);

        case 'experience':
        case 'exp':
        case 'jobs':
        case 'career':
            return experienceCommand();

        case 'contact':
        case 'email':
        case 'socials':
            return contactCommand();

        case 'clear':
        case 'cls':
            context.clearTerminal();
            return { output: '', type: 'output', clear: true };

        case 'theme':
            if (args.length === 0) {
                return {
                    output: `Current theme: ${context.currentTheme}\nUsage: theme <name>\nType 'themes' to see available themes.`,
                    type: 'output',
                };
            }
            const themeName = args[0].toLowerCase();
            if (themes[themeName]) {
                context.setTheme(themeName);
                return {
                    output: `✓ Theme changed to '${themes[themeName].name}'`,
                    type: 'output',
                };
            }
            return {
                output: `Theme '${args[0]}' not found. Type 'themes' to see available themes.`,
                type: 'error',
            };

        case 'themes':
            return themesCommand();

        case 'history':
            if (context.history.length === 0) {
                return { output: '  No commands in history.', type: 'output' };
            }
            const historyOutput = context.history
                .slice(-20) // Last 20 commands
                .map((cmd, i) => `  ${(i + 1).toString().padStart(3)} ${cmd}`)
                .join('\n');
            return { output: `\n${historyOutput}\n`, type: 'output' };

        // Easter eggs
        case 'sudo':
            if (args[0] === 'hire') return sudoHireCommand();
            return {
                output: `  sudo: command not found. Did you mean 'sudo hire'? 😉`,
                type: 'error',
            };

        case 'matrix':
            return matrixCommand();

        case 'hack':
            return hackCommand();

        case 'cowsay':
            return cowsayCommand(args);

        case 'neofetch':
        case 'fetch':
            return neofetchCommand();

        case 'rm':
            if (args.includes('-rf') || args.includes('-rf/')) {
                return rmRfCommand();
            }
            return { output: '  rm: missing operand', type: 'error' };

        case 'date':
        case 'time':
            return dateCommand();

        case 'echo':
            return echoCommand(args);

        case 'fortune':
            return fortuneCommand();

        case 'welcome':
        case 'banner':
            return { output: welcomeBanner, type: 'ascii' };

        case 'exit':
        case 'quit':
            return {
                output: "  Nice try! But you can't escape that easily. 😏\n  Type 'contact' if you want to reach out!",
                type: 'output',
            };

        case 'ls':
        case 'dir':
            return {
                output: `
  drwxr-xr-x  about/
  drwxr-xr-x  skills/
  drwxr-xr-x  projects/
  drwxr-xr-x  experience/
  drwxr-xr-x  contact/
  -rw-r--r--  README.md

  Use 'about', 'skills', 'projects', 'experience', or 'contact' to explore.
`,
                type: 'output',
            };

        case 'cd':
            const dir = args[0]?.toLowerCase();
            if (!dir) return { output: '  Usage: cd <directory>', type: 'output' };
            const validDirs = ['about', 'skills', 'projects', 'experience', 'contact'];
            if (validDirs.includes(dir)) {
                return executeCommand(dir, context);
            }
            return { output: `  bash: cd: ${args[0]}: No such file or directory`, type: 'error' };

        case 'cat':
            return {
                output: `
    /\\_/\\  
   ( o.o ) 
    > ^ <
  
  Meow! 🐱 Did you mean to read a file? Try 'about' or 'projects' instead!
`,
                type: 'ascii',
            };

        case 'pwd':
            return { output: '  /home/visitor/portfolio', type: 'output' };

        case 'man':
            return { output: '  Try \'help\' for a list of commands.', type: 'output' };

        case 'ping':
            return { output: '  PONG! 🏓', type: 'output' };

        case 'hello':
        case 'hi':
        case 'hey':
            return { output: '  Hello there! 👋 Type \'help\' to get started.', type: 'output' };

        default:
            return {
                output: `  Command not found: ${command}\n  Type 'help' for available commands.`,
                type: 'error',
            };
    }
};
