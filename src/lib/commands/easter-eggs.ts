import { CommandResult } from '../types';
import { hireArt, neofetchArt, cowsay } from '../ascii-art';

export const sudoHireCommand = (): CommandResult => {
    return { output: hireArt, type: 'ascii' };
};

export const matrixCommand = (): CommandResult => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const width = 55;
    const height = 10;

    let output = `
  +------------------------------------------------------------------------+
  |  THE MATRIX HAS YOU...                                                 |
  +------------------------------------------------------------------------+

`;

    for (let y = 0; y < height; y++) {
        let line = '  ';
        for (let x = 0; x < width; x++) {
            line += Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : ' ';
        }
        output += line + '\n';
    }

    output += '\n  ----------------------\n  -> theme matrix\n';

    return { output, type: 'ascii' };
};

export const hackCommand = (): CommandResult => {
    const hex = () => Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const ip = () => Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.');

        const output = `
  +------------------------------------------------------------------------+
  |  HACK SEQUENCE INITIATED                                               |
  +------------------------------------------------------------------------+

  [####################] Bypassing firewall...     OK
  [####################] Decrypting mainframe...   OK
  [####################] Accessing database...     OK

  Memory Dump
  ----------------------
  0x${hex()}  0x${hex()}  0x${hex()}  0x${hex()}
  0x${hex()}  0x${hex()}  0x${hex()}  0x${hex()}

  Network Trace
  ----------------------
  ${ip()} -> ${ip()}  INTERCEPTED
  ${ip()} -> ${ip()}  REROUTED

  ------------------------------------------------------------------------
  Just kidding. This is a portfolio, not a hacking tool.
`;

    return { output, type: 'output' };
};

export const cowsayCommand = (args: string[]): CommandResult => {
    const message = args.length > 0 ? args.join(' ') : 'Moo!';
    return { output: '\n' + cowsay(message) + '\n', type: 'ascii' };
};

export const neofetchCommand = (): CommandResult => {
    return { output: neofetchArt, type: 'ascii' };
};

export const rmRfCommand = (): CommandResult => {
    return {
        output: '\n  Permission denied. Nice try though.\n',
        type: 'error'
    };
};

export const whoamiCommand = (): CommandResult => {
    return {
        output: '\n  visitor@portfolio -- Curious Explorer\n',
        type: 'output'
    };
};

export const dateCommand = (): CommandResult => {
    const now = new Date();
    return {
        output: `\n  ${now.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}\n`,
        type: 'output'
    };
};

export const echoCommand = (args: string[]): CommandResult => {
    return { output: '\n  ' + args.join(' ') + '\n', type: 'output' };
};

export const fortuneCommand = (): CommandResult => {
    const fortunes = [
        "Ship it. Perfect is the enemy of good.",
        "The best code is no code at all.",
        "First, solve the problem. Then, write the code.",
        "Talk is cheap. Show me the code.",
        "It works on my machine!",
        "There are only 10 types of people in the world.",
    ];

    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    return { output: `\n  "${fortune}"\n`, type: 'output' };
};
