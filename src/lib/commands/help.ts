import { CommandResult } from '../types';
import { themes } from '../themes';

export const helpCommand = (): CommandResult => {
  const output = `
  ╭─────────────────────────────────────────────────────────────────╮
  │                    📖  AVAILABLE COMMANDS                       │
  ╰─────────────────────────────────────────────────────────────────╯

  🧭 NAVIGATION
  ─────────────────────────────────────────
    about         Learn about me
    skills        View my technical skills
    projects      Browse my portfolio
    experience    Career history
    contact       Get in touch

  ⚙️  SYSTEM
  ─────────────────────────────────────────
    help          Show this message
    clear         Clear terminal
    theme <name>  Change color theme
    themes        List all themes

  🎮 FUN STUFF
  ─────────────────────────────────────────
    neofetch      System info
    cowsay <msg>  ASCII cow says...
    matrix        Enter the Matrix
    sudo hire     Secret command 👀

  💡 TIPS: Tab = autocomplete │ ↑↓ = history │ Ctrl+L = clear
`;

  return { output, type: 'output' };
};

export const themesCommand = (): CommandResult => {
  const themeList = Object.entries(themes)
    .map(([key, theme]) => `    ${key.padEnd(12)} ${theme.name}`)
    .join('\n');

  const output = `
  AVAILABLE THEMES
  ──────────────────────────────────────────────────────────────────────

${themeList}

  ──────────────────────────────────────────────────────────────────────

  Usage: theme <name>
  Example: theme dracula
`;

  return { output, type: 'output' };
};
