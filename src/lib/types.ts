// Terminal types and interfaces

export interface TerminalLine {
    id: string;
    type: 'input' | 'output' | 'error' | 'system' | 'ascii';
    content: string;
    timestamp: Date;
}

export interface Command {
    name: string;
    description: string;
    usage?: string;
    action: (args: string[]) => CommandResult;
}

export interface CommandResult {
    output: string;
    type?: 'output' | 'error' | 'ascii';
    clear?: boolean;
}

export interface Theme {
    name: string;
    background: string;
    foreground: string;
    prompt: string;
    accent: string;
    error: string;
    comment: string;
    selection: string;
}
