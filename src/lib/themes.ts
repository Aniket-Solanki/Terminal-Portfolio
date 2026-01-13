import { Theme } from './types';

export const themes: Record<string, Theme> = {
    // Default - Professional Dark
    dracula: {
        name: 'Dracula',
        background: 'rgba(12, 12, 15, 0.95)',
        foreground: '#e4e4e7',
        prompt: '#22c55e',
        accent: '#a78bfa',
        error: '#ef4444',
        comment: '#52525b',
        selection: 'rgba(139, 92, 246, 0.3)',
    },

    // Warm Classic
    monokai: {
        name: 'Monokai',
        background: 'rgba(17, 16, 18, 0.95)',
        foreground: '#f8f8f2',
        prompt: '#a6e22e',
        accent: '#fd971f',
        error: '#f92672',
        comment: '#75715e',
        selection: 'rgba(253, 151, 31, 0.2)',
    },

    // Hacker
    matrix: {
        name: 'Matrix',
        background: 'rgba(5, 10, 8, 0.95)',
        foreground: '#00ff41',
        prompt: '#00ff41',
        accent: '#00bb33',
        error: '#ff3333',
        comment: '#005500',
        selection: 'rgba(0, 255, 65, 0.2)',
    },

    // Cool Arctic
    nord: {
        name: 'Nord',
        background: 'rgba(36, 41, 51, 0.95)',
        foreground: '#eceff4',
        prompt: '#88c0d0',
        accent: '#81a1c1',
        error: '#bf616a',
        comment: '#4c566a',
        selection: 'rgba(136, 192, 208, 0.2)',
    },

    // Soft Pastels
    catppuccin: {
        name: 'Catppuccin',
        background: 'rgba(24, 24, 37, 0.95)',
        foreground: '#cdd6f4',
        prompt: '#a6e3a1',
        accent: '#cba6f7',
        error: '#f38ba8',
        comment: '#6c7086',
        selection: 'rgba(203, 166, 247, 0.2)',
    },

    // Neon Future
    cyberpunk: {
        name: 'Cyberpunk',
        background: 'rgba(8, 8, 16, 0.95)',
        foreground: '#00ffff',
        prompt: '#ff00ff',
        accent: '#ffff00',
        error: '#ff0055',
        comment: '#445566',
        selection: 'rgba(255, 0, 255, 0.2)',
    },

    // Minimal Dark
    tokyo: {
        name: 'Tokyo Night',
        background: 'rgba(22, 23, 34, 0.95)',
        foreground: '#a9b1d6',
        prompt: '#9ece6a',
        accent: '#7aa2f7',
        error: '#f7768e',
        comment: '#565f89',
        selection: 'rgba(122, 162, 247, 0.2)',
    },

    // Ocean Deep
    ocean: {
        name: 'Ocean',
        background: 'rgba(10, 20, 30, 0.95)',
        foreground: '#d4e5f7',
        prompt: '#5fb3b3',
        accent: '#6699cc',
        error: '#ec5f67',
        comment: '#65737e',
        selection: 'rgba(102, 153, 204, 0.2)',
    },
};

export const defaultTheme = 'tokyo';
