import { CommandResult } from '../types';
import { skillsArt } from '../ascii-art';

interface Skill {
    name: string;
    level: number;
}

interface Category {
    name: string;
    skills: Skill[];
}

const categories: Category[] = [
    {
        name: 'Frontend',
        skills: [
            { name: 'TypeScript', level: 9 },
            { name: 'React / Next.js', level: 9 },
            { name: 'Three.js / R3F', level: 8 },
            { name: 'Tailwind CSS', level: 9 },
            { name: 'Framer Motion', level: 8 },
        ],
    },
    {
        name: 'Backend',
        skills: [
            { name: 'Node.js', level: 8 },
            { name: '.NET Core', level: 7 },
            { name: 'PostgreSQL', level: 7 },
            { name: 'Redis', level: 6 },
        ],
    },
    {
        name: 'AI / ML',
        skills: [
            { name: 'OpenAI / LLMs', level: 8 },
            { name: 'LangChain', level: 7 },
            { name: 'Prompt Engineering', level: 8 },
        ],
    },
    {
        name: 'DevOps',
        skills: [
            { name: 'Docker', level: 7 },
            { name: 'CI/CD', level: 7 },
            { name: 'AWS / GCP', level: 6 },
        ],
    },
];

const bar = (level: number): string => {
    const filled = '#'.repeat(level);
    const empty = '-'.repeat(10 - level);
    return '[' + filled + empty + ']';
};

export const skillsCommand = (): CommandResult => {
    let output = `${skillsArt}\n`;

    for (const cat of categories) {
        output += `\n  ${cat.name.toUpperCase()}\n`;
        output += `  --------------------------------------------------------------\n`;

        for (const skill of cat.skills) {
            output += `    ${skill.name.padEnd(22)} ${bar(skill.level)}  ${skill.level * 10}%\n`;
        }
    }

    output += '\n  Type: projects\n';

    return { output, type: 'output' };
};
