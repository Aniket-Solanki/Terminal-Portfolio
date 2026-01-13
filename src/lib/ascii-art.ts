// ASCII Art banners and graphics for the terminal

export const welcomeBanner = `
+----------------------------------------------------------------------+
|                                                                      |
|                    TERMINAL PORTFOLIO                                |
|                                                                      |
|   Welcome to my interactive portfolio!                               |
|                                                                      |
|   -> Type 'help' to see available commands                           |
|   -> Type 'about' to learn more about me                             |
|   -> Use Tab for autocomplete, Arrow keys for history                |
|                                                                      |
+----------------------------------------------------------------------+
`;

export const bootSequence = [
  '> Initializing terminal...',
  '> Loading modules...',
  '> Connecting...',
  '> Ready!',
  '',
];

export const aboutArt = `
+------------------------------------------------------------+
|                         ABOUT ME                           |
+------------------------------------------------------------+
`;

export const skillsArt = `
+------------------------------------------------------------+
|                          SKILLS                            |
+------------------------------------------------------------+
`;

export const projectsArt = `
+------------------------------------------------------------+
|                         PROJECTS                           |
+------------------------------------------------------------+
`;

export const experienceArt = `
+------------------------------------------------------------+
|                        EXPERIENCE                          |
+------------------------------------------------------------+
`;

export const contactArt = `
+------------------------------------------------------------+
|                         CONTACT                            |
+------------------------------------------------------------+
`;

export const hireArt = `
+----------------------------------------------------------------------+
|                                                                      |
|                         HIRE ME!                                     |
|                                                                      |
|   Access Granted! You've discovered the secret command.              |
|                                                                      |
|   I'm currently open to new opportunities!                           |
|                                                                      |
|   Let's build something amazing together.                            |
|   -> Type 'contact' to reach out                                     |
|                                                                      |
+----------------------------------------------------------------------+
`;

export const neofetchArt = `
       ████████████████████████       visitor@portfolio
     ██                        ██     -----------------
   ██    ████████████████████    ██   OS: Terminal Portfolio v1.0
  ██  ██                      ██  ██  Host: Next.js 16
  ██  ██  ████  ██████  ████  ██  ██  Kernel: React 19
  ██  ██  ████  ██████  ████  ██  ██  Uptime: Since you arrived
  ██  ██                      ██  ██  Shell: zsh
  ██  ██████████████████████████  ██  Resolution: Responsive
   ██                            ██   Theme: Cyberpunk
     ████████████████████████████     Terminal: Custom CLI
                                      CPU: Your Brain
   ██████████████████████████████     Memory: ∞ Possibilities
   ██  ████████  ██  ████████  ██
   ██████████████████████████████     Type 'help' for commands
`;

export const cowsay = (message: string): string => {
  const topBorder = ' ' + '_'.repeat(message.length + 2);
  const bottomBorder = ' ' + '-'.repeat(message.length + 2);

  return `
${topBorder}
< ${message} >
${bottomBorder}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`;
};

