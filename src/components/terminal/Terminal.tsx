'use client';

import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { TerminalLine } from '@/lib/types';
import { themes, defaultTheme } from '@/lib/themes';
import { welcomeBanner, bootSequence } from '@/lib/ascii-art';
import { executeCommand, CommandContext } from '@/lib/commands';

// Memoized line component to prevent unnecessary re-renders
const TerminalLineComponent = memo(function TerminalLineComponent({
    line
}: {
    line: TerminalLine
}) {
    return (
        <div className={`terminal-line ${line.type}`}>
            {line.type === 'input' && <span className="prompt">❯</span>}
            <span className="line-content">{line.content}</span>
        </div>
    );
});

// Memoized title bar
const TitleBar = memo(function TitleBar() {
    return (
        <div className="terminal-titlebar">
            <div className="terminal-buttons">
                <span className="terminal-btn close" />
                <span className="terminal-btn minimize" />
                <span className="terminal-btn maximize" />
            </div>
            <span className="terminal-title">visitor@portfolio — zsh</span>
        </div>
    );
});

// Utility function for generating IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

export function Terminal() {
    const [lines, setLines] = useState<TerminalLine[]>([]);
    const [input, setInput] = useState('');
    const [cursorPos, setCursorPos] = useState(0);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [currentTheme, setCurrentTheme] = useState(defaultTheme);
    const [bootPhase, setBootPhase] = useState(0);
    const [isBooting, setIsBooting] = useState(true);

    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    // Memoize theme object to prevent recalculation
    const theme = useMemo(() => themes[currentTheme], [currentTheme]);

    // Memoize CSS variables object
    const themeStyles = useMemo(() => ({
        '--bg': theme.background,
        '--fg': theme.foreground,
        '--prompt': theme.prompt,
        '--accent': theme.accent,
        '--error': theme.error,
        '--comment': theme.comment,
        '--selection': theme.selection,
    } as React.CSSProperties), [theme]);

    // Memoized add line function
    const addLine = useCallback((type: TerminalLine['type'], content: string) => {
        const newLine: TerminalLine = {
            id: generateId(),
            type,
            content,
            timestamp: new Date(),
        };
        setLines(prev => [...prev, newLine]);
    }, []);

    // Memoized clear function
    const clearTerminal = useCallback(() => {
        setLines([]);
    }, []);

    // Boot sequence effect with cleanup
    useEffect(() => {
        if (!isBooting) return;

        const timer = setTimeout(() => {
            if (bootPhase < bootSequence.length) {
                if (bootSequence[bootPhase]) {
                    addLine('system', bootSequence[bootPhase]);
                }
                setBootPhase(prev => prev + 1);
            } else {
                addLine('ascii', welcomeBanner);
                setIsBooting(false);
                inputRef.current?.focus();
            }
        }, bootPhase < bootSequence.length ? 200 : 400);

        return () => clearTimeout(timer);
    }, [bootPhase, isBooting, addLine]);

    // Optimized auto-scroll using requestAnimationFrame
    useEffect(() => {
        if (terminalRef.current) {
            const scrollToBottom = () => {
                if (terminalRef.current) {
                    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
                }
            };
            requestAnimationFrame(scrollToBottom);
        }
    }, [lines]);

    // Memoized focus handler
    const focusInput = useCallback(() => {
        if (!isBooting) {
            inputRef.current?.focus();
        }
    }, [isBooting]);

    // Memoized command context
    const commandContext = useMemo((): Omit<CommandContext, 'history'> => ({
        setTheme: setCurrentTheme,
        clearTerminal,
        currentTheme,
    }), [clearTerminal, currentTheme]);

    // Memoized submit handler
    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        if (isBooting || !input.trim()) {
            if (!input.trim()) addLine('input', '');
            return;
        }

        addLine('input', input);

        const newHistory = [...history, input];
        setHistory(newHistory);
        setHistoryIndex(-1);

        const context: CommandContext = {
            ...commandContext,
            history: newHistory,
        };

        const result = executeCommand(input, context);

        if (result.output) {
            addLine(result.type || 'output', result.output);
        }

        setInput('');
    }, [isBooting, input, history, addLine, commandContext]);

    // Command names for tab completion (static)
    const commandNames = useMemo(() =>
        ['help', 'about', 'skills', 'projects', 'experience', 'contact', 'clear', 'theme', 'themes', 'history', 'cowsay', 'neofetch', 'hack', 'fortune', 'sudo', 'matrix', 'whoami', 'date', 'echo'],
        []
    );

    // Ghost text for autocomplete hint
    const ghostText = useMemo(() => {
        if (!input || input.includes(' ')) return '';
        const matches = commandNames.filter(cmd => cmd.startsWith(input.toLowerCase()) && cmd !== input.toLowerCase());
        if (matches.length === 1) return matches[0].slice(input.length);
        return '';
    }, [input, commandNames]);

    // Memoized keydown handler
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (isBooting) return;

        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                if (history.length > 0) {
                    const newIndex = historyIndex === -1
                        ? history.length - 1
                        : Math.max(0, historyIndex - 1);
                    setHistoryIndex(newIndex);
                    setInput(history[newIndex]);
                    setCursorPos(history[newIndex].length);
                }
                break;

            case 'ArrowDown':
                e.preventDefault();
                if (historyIndex !== -1) {
                    const newIndex = historyIndex + 1;
                    if (newIndex >= history.length) {
                        setHistoryIndex(-1);
                        setInput('');
                        setCursorPos(0);
                    } else {
                        setHistoryIndex(newIndex);
                        setInput(history[newIndex]);
                        setCursorPos(history[newIndex].length);
                    }
                }
                break;

            case 'Tab':
                e.preventDefault();
                const matches = commandNames.filter(cmd => cmd.startsWith(input.toLowerCase()));
                if (matches.length === 1) {
                    setInput(matches[0]);
                }
                break;

            case 'l':
                if (e.ctrlKey) {
                    e.preventDefault();
                    clearTerminal();
                }
                break;
        }
    }, [isBooting, history, historyIndex, input, commandNames, clearTerminal]);

    // Memoized input change handler
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setCursorPos(e.target.selectionStart ?? e.target.value.length);
    }, []);

    return (
        <div
            className="terminal-container"
            style={themeStyles}
            onClick={focusInput}
        >
            <div className="crt-overlay" />
            <div className="scanlines" />

            <div className="terminal-window">
                <TitleBar />

                <div className="terminal-content" ref={terminalRef}>
                    {lines.map((line) => (
                        <TerminalLineComponent key={line.id} line={line} />
                    ))}

                    {!isBooting && (
                        <form onSubmit={handleSubmit} className="terminal-input-line">
                            <span className="prompt">❯</span>
                            <div className="input-wrapper">
                                <span className="input-display">
                                    <span className="text-before">{input.slice(0, cursorPos)}</span>
                                    <span className="cursor" />
                                    <span className="text-after">{input.slice(cursorPos)}</span>
                                </span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    onSelect={(e) => setCursorPos((e.target as HTMLInputElement).selectionStart ?? 0)}
                                    onClick={(e) => setCursorPos((e.target as HTMLInputElement).selectionStart ?? 0)}
                                    className="terminal-input"
                                    spellCheck={false}
                                    autoComplete="off"
                                    autoFocus
                                />
                                {ghostText && <span className="ghost-text">{ghostText}</span>}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default memo(Terminal);
