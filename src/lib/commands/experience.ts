import { CommandResult } from '../types';
import { experienceArt } from '../ascii-art';

interface Experience {
    company: string;
    role: string;
    period: string;
    highlights: string[];
}

const experiences: Experience[] = [
    {
        company: 'Tech Innovators Inc.',
        role: 'Senior Full-Stack Developer',
        period: '2022 - Present',
        highlights: [
            'Led development of AI-powered customer service platform',
            'Architected microservices handling 10M+ daily requests',
            'Mentored team of 5 junior developers',
        ],
    },
    {
        company: 'Creative Digital Agency',
        role: 'Frontend Developer',
        period: '2020 - 2022',
        highlights: [
            'Built interactive 3D web experiences using Three.js',
            'Improved site performance by 60% through optimization',
            'Developed reusable component library used across 20+ projects',
        ],
    },
    {
        company: 'Startup Labs',
        role: 'Junior Developer',
        period: '2018 - 2020',
        highlights: [
            'Contributed to MVP development for 3 startups',
            'Gained full-stack experience with React and Node.js',
            'Implemented CI/CD pipelines reducing deployment time by 80%',
        ],
    },
];

export const experienceCommand = (): CommandResult => {
    let output = `${experienceArt}\n`;

    for (const exp of experiences) {
        output += `\n  ┌─────────────────────────────────────────────────────────────────────┐\n`;
        output += `  │  ${exp.role.padEnd(67)}│\n`;
        output += `  │  ${exp.company.padEnd(67)}│\n`;
        output += `  │  ${exp.period.padEnd(67)}│\n`;
        output += `  └─────────────────────────────────────────────────────────────────────┘\n`;

        exp.highlights.forEach(highlight => {
            output += `    • ${highlight}\n`;
        });
    }

    output += '\n  ──────────────────────────────────────────────────────────────────────\n';
    output += '  Type: contact\n';

    return { output, type: 'output' };
};
