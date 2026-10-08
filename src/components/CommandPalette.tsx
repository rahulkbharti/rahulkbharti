import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { PROFILE } from '../data/profile';
import { toggleTheme } from '../lib/theme';
import { copyEmail, onOpenPalette } from '../lib/ui';
import { Icon, type IconName } from './Icon';

type Group = 'Go to' | 'Projects' | 'Actions' | 'Elsewhere';

interface Command {
    id: string;
    label: string;
    group: Group;
    icon: IconName;
    hint?: string;
    run: () => void;
}

const GROUP_ORDER: Group[] = ['Go to', 'Projects', 'Actions', 'Elsewhere'];

const isTypingTarget = (target: EventTarget | null) =>
    target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

export function CommandPalette() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const returnFocus = useRef<HTMLElement | null>(null);
    const openRef = useRef(open);

    useEffect(() => {
        openRef.current = open;
    }, [open]);

    useEffect(() => {
        const show = () => {
            if (openRef.current) return;
            returnFocus.current = document.activeElement as HTMLElement | null;
            setQuery('');
            setActive(0);
            setOpen(true);
        };
        const onKey = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                if (openRef.current) setOpen(false);
                else show();
            } else if (event.key === '/' && !isTypingTarget(event.target)) {
                event.preventDefault();
                show();
            }
        };
        window.addEventListener('keydown', onKey);
        const offOpen = onOpenPalette(show);
        return () => {
            window.removeEventListener('keydown', onKey);
            offOpen();
        };
    }, []);

    useEffect(() => {
        if (!open) {
            returnFocus.current?.focus?.();
            return;
        }
        inputRef.current?.focus();
        const { overflow } = document.body.style;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = overflow;
        };
    }, [open]);

    const commands = useMemo<Command[]>(() => {
        const go = (to: string) => () => navigate(to);
        return [
            { id: 'home', label: 'Home', group: 'Go to', icon: 'arrowRight', run: go('/') },
            { id: 'work', label: 'Selected work', group: 'Go to', icon: 'arrowRight', run: go('/#work') },
            { id: 'stack', label: 'The stack — one feature, every layer', group: 'Go to', icon: 'arrowRight', run: go('/#stack') },
            { id: 'experience', label: 'Experience', group: 'Go to', icon: 'arrowRight', run: go('/#experience') },
            { id: 'proof', label: 'Achievements & testimonials', group: 'Go to', icon: 'arrowRight', run: go('/#proof') },
            { id: 'services', label: 'Services', group: 'Go to', icon: 'arrowRight', run: go('/#services') },
            { id: 'writing', label: 'Writing', group: 'Go to', icon: 'arrowRight', run: go('/#writing') },
            { id: 'contact', label: 'Contact', group: 'Go to', icon: 'arrowRight', run: go('/#contact') },
            { id: 'projects', label: 'All projects', group: 'Go to', icon: 'arrowRight', run: go('/projects') },
            { id: 'about', label: 'About', group: 'Go to', icon: 'arrowRight', run: go('/about') },
            { id: 'blog', label: 'Blog', group: 'Go to', icon: 'arrowRight', run: go('/blog') },
            ...PROJECTS.map<Command>((project) => ({
                id: `project-${project.slug}`,
                label: project.title,
                hint: project.kind,
                group: 'Projects',
                icon: 'file',
                run: go(`/projects/${project.slug}`),
            })),
            { id: 'theme', label: 'Toggle light / dark theme', group: 'Actions', icon: 'moon', run: toggleTheme },
            { id: 'copy-email', label: 'Copy email address', hint: PROFILE.email, group: 'Actions', icon: 'copy', run: copyEmail },
            { id: 'resume', label: 'Open résumé', group: 'Actions', icon: 'download', run: () => openExternal(PROFILE.resume) },
            { id: 'github', label: 'GitHub', hint: '@rahulkbharti', group: 'Elsewhere', icon: 'github', run: () => openExternal(PROFILE.github) },
            { id: 'linkedin', label: 'LinkedIn', hint: 'rahul-kbharti', group: 'Elsewhere', icon: 'linkedin', run: () => openExternal(PROFILE.linkedin) },
            { id: 'email', label: 'Send an email', group: 'Elsewhere', icon: 'mail', run: () => (window.location.href = `mailto:${PROFILE.email}`) },
        ];
    }, [navigate]);

    const results = useMemo(() => {
        const words = query.toLowerCase().split(/\s+/).filter(Boolean);
        const matches = commands.filter((command) => {
            const haystack = `${command.label} ${command.hint ?? ''} ${command.group}`.toLowerCase();
            return words.every((word) => haystack.includes(word));
        });
        return GROUP_ORDER.flatMap((group) => matches.filter((command) => command.group === group));
    }, [commands, query]);

    useEffect(() => {
        listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
    }, [active, results]);

    if (!open) return null;

    const close = () => setOpen(false);
    const run = (command: Command | undefined) => {
        if (!command) return;
        close();
        command.run();
    };

    const onKeyDown = (event: ReactKeyboardEvent) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActive((index) => (index + 1) % Math.max(results.length, 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActive((index) => (index - 1 + results.length) % Math.max(results.length, 1));
        } else if (event.key === 'Enter') {
            event.preventDefault();
            run(results[active]);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            close();
        } else if (event.key === 'Tab') {
            event.preventDefault(); // keep focus inside the dialog
        }
    };

    return (
        <div className="palette-backdrop" onMouseDown={close}>
            <div
                className="palette"
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
                onMouseDown={(event) => event.stopPropagation()}
                onKeyDown={onKeyDown}
            >
                <div className="palette__input">
                    <Icon name="search" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setActive(0);
                        }}
                        placeholder="Search pages, projects, actions…"
                        role="combobox"
                        aria-expanded="true"
                        aria-controls="palette-list"
                        aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
                        autoComplete="off"
                        spellCheck={false}
                    />
                    <kbd>esc</kbd>
                </div>

                <ul id="palette-list" className="palette__list" role="listbox" ref={listRef}>
                    {results.length === 0 && <li className="palette__empty">No results for “{query}”.</li>}
                    {results.map((command, index) => (
                        <li key={command.id} role="presentation">
                            {(index === 0 || results[index - 1].group !== command.group) && (
                                <p className="palette__group">{command.group}</p>
                            )}
                            <div
                                id={`cmd-${command.id}`}
                                role="option"
                                aria-selected={index === active}
                                className="palette__item"
                                onMouseMove={() => setActive(index)}
                                onClick={() => run(command)}
                            >
                                <Icon name={command.icon} size={16} />
                                <span className="palette__label">{command.label}</span>
                                {command.hint && <span className="palette__hint">{command.hint}</span>}
                                <Icon name="enter" size={14} className="palette__enter" />
                            </div>
                        </li>
                    ))}
                </ul>

                <p className="palette__foot">
                    <span>
                        <kbd>↑</kbd> <kbd>↓</kbd> move
                    </span>
                    <span>
                        <kbd>↵</kbd> open
                    </span>
                    <span>
                        <kbd>esc</kbd> close
                    </span>
                </p>
            </div>
        </div>
    );
}
