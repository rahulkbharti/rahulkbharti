import type { ReactNode } from 'react';

interface SectionHeadProps {
    index: string;
    label: string;
    title: ReactNode;
    lede?: ReactNode;
}

export function SectionHead({ index, label, title, lede }: SectionHeadProps) {
    return (
        <header className="section-head">
            <p className="eyebrow">
                <span className="eyebrow__index">{index}</span>
                {label}
            </p>
            <h2>{title}</h2>
            {lede && <p className="section-head__lede">{lede}</p>}
        </header>
    );
}
