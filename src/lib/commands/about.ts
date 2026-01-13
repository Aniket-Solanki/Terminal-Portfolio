import { CommandResult } from '../types';
import { aboutArt } from '../ascii-art';

export const aboutCommand = (): CommandResult => {
  const output = `${aboutArt}

  I'm a Creative Technologist and Full-Stack Developer passionate about
  building digital experiences that push the boundaries of what's possible.

  SPECIALIZATIONS
  ──────────────────────
    ◆ Interactive 3D Experiences    WebGL, Three.js, React Three Fiber
    ◆ AI-Powered Applications       OpenAI, LangChain, RAG, Voice AI
    ◆ High-Performance Systems      Next.js, .NET, Node.js, PostgreSQL

  CURRENTLY EXPLORING
  ──────────────────────
    → WebGPU for next-gen browser graphics
    → Autonomous AI agents and multi-agent systems
    → Creative coding and generative art

  ──────────────────────────────────────────────────────────────────────

  "Code is a tool. The craft is creating experiences that inspire."

  Type: skills │ projects │ contact
`;

  return { output, type: 'output' };
};
