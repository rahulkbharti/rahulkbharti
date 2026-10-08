import { useMemo, type ReactNode } from 'react';
import { highlightLine } from '../lib/highlight';

interface CodeWindowProps {
    file: string;
    code: string;
    lang: 'ts' | 'yaml';
    /** Extra content for the right side of the title bar. */
    aside?: ReactNode;
}

export function CodeWindow({ file, code, lang, aside }: CodeWindowProps) {
    const lines = useMemo(() => code.split('\n').map((line) => highlightLine(line, lang)), [code, lang]);

    return (
        <figure className="code-window">
            <figcaption className="code-window__bar">
                <span className="window-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                </span>
                <span className="code-window__file">{file}</span>
                {aside && <span className="code-window__aside">{aside}</span>}
            </figcaption>
            <pre className="code-window__body">
                <code>
                    {lines.map((html, index) => (
                        <span key={index} className="code-line" dangerouslySetInnerHTML={{ __html: html || ' ' }} />
                    ))}
                </code>
            </pre>
        </figure>
    );
}
