import { CommandResult } from '../types';
import { contactArt } from '../ascii-art';

export const contactCommand = (): CommandResult => {
    const output = `${contactArt}

  LET'S CONNECT!
  ──────────────────────────────────────────────────────────────────────

  📧 EMAIL
     hello@example.com

  🔗 SOCIAL
     GitHub      github.com/yourusername
     LinkedIn    linkedin.com/in/yourusername
     Twitter     twitter.com/yourusername

  🌐 WEBSITE
     example.com

  ──────────────────────────────────────────────────────────────────────

  💡 TIP: Type 'sudo hire' for a special message!

`;

    return { output, type: 'output' };
};
