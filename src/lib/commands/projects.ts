import { CommandResult } from '../types';
import { projectsArt } from '../ascii-art';

interface Project {
    id: string;
    name: string;
    description: string;
    tech: string[];
    url?: string;
    github?: string;
}

const projects: Project[] = [
    {
        id: '1',
        name: 'AI Voice Assistant',
        description: 'Real-time voice AI agent for customer service automation',
        tech: ['Python', 'OpenAI', 'Twilio', 'FastAPI'],
        github: 'https://github.com/example/voice-ai',
    },
    {
        id: '2',
        name: '3D Portfolio Experience',
        description: 'Interactive WebGL portfolio with Three.js and React',
        tech: ['React', 'Three.js', 'GSAP', 'TypeScript'],
        url: 'https://example.com/portfolio',
    },
    {
        id: '3',
        name: 'Terminal Portfolio',
        description: 'This CLI-style portfolio you are using right now!',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        github: 'https://github.com/example/terminal-portfolio',
    },
    {
        id: '4',
        name: 'RAG Knowledge Base',
        description: 'Retrieval-augmented generation system for document Q&A',
        tech: ['LangChain', 'Pinecone', 'OpenAI', 'Next.js'],
    },
];

export const projectsCommand = (): CommandResult => {
    let output = `${projectsArt}\n`;

    for (const project of projects) {
        output += `\n  [${project.id}] ${project.name}\n`;
        output += `      ${project.description}\n`;
        output += `      Tech: ${project.tech.join(' • ')}\n`;
        if (project.url) output += `      🔗 ${project.url}\n`;
        if (project.github) output += `      📦 ${project.github}\n`;
    }

    output += '\n  ──────────────────────────────────────────────────────────────────────\n';
    output += '  Type: open <id> to view project details\n';

    return { output, type: 'output' };
};

export const openProjectCommand = (args: string[]): CommandResult => {
    if (args.length === 0) {
        return { output: '  Usage: open <project-id>\n  Example: open 1', type: 'error' };
    }

    const projectId = args[0];
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        return {
            output: `  Project '${projectId}' not found. Type 'projects' to see available projects.`,
            type: 'error',
        };
    }

    let output = `\n  ══════════════════════════════════════════════════════════════════════\n`;
    output += `  ${project.name.toUpperCase()}\n`;
    output += `  ══════════════════════════════════════════════════════════════════════\n\n`;
    output += `  ${project.description}\n\n`;
    output += `  TECH STACK\n`;
    output += `  ──────────────────────────────────────────────────────────────────────\n`;
    project.tech.forEach(tech => {
        output += `    • ${tech}\n`;
    });
    output += '\n';
    if (project.url) output += `  🌐 Live Demo: ${project.url}\n`;
    if (project.github) output += `  📦 Repository: ${project.github}\n`;
    output += '\n';

    return { output, type: 'output' };
};
