import { useState, type CSSProperties } from 'react';
import type { LayerId } from '../../data/layers';
import { layerVar } from '../../lib/ui';

const PLATES: { id: LayerId; label: string; tech: string }[] = [
    { id: 'ui', label: 'UI', tech: 'React · Next.js · Tailwind' },
    { id: 'api', label: 'API', tech: 'Node · Express · NestJS' },
    { id: 'data', label: 'Data', tech: 'Postgres · Prisma · Redis' },
    { id: 'infra', label: 'Infra', tech: 'Docker · CI/CD · Cloud' },
];

interface IsoStackProps {
    onPick: (id: LayerId) => void;
}

/** An exploded isometric view of the stack, drawn with CSS 3D transforms. */
export function IsoStack({ onPick }: IsoStackProps) {
    const [hovered, setHovered] = useState<LayerId | null>(null);

    return (
        <div className="iso" data-active={hovered ?? undefined}>
            <div className="iso__scene" aria-hidden="true">
                <div className="iso__stack">
                    {PLATES.map((plate, index) => (
                        <div
                            key={plate.id}
                            className={`iso__plate${hovered === plate.id ? ' is-on' : ''}`}
                            style={{ ...layerVar(plate.id), '--i': PLATES.length - 1 - index } as CSSProperties}
                            onMouseEnter={() => setHovered(plate.id)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => onPick(plate.id)}
                        >
                            <div className="iso__face">
                                <span className="iso__label">{plate.label}</span>
                                <span className="iso__tech">{plate.tech}</span>
                            </div>
                        </div>
                    ))}
                    <span className="iso__packet" />
                </div>
            </div>

            <ul className="iso__legend" aria-label="Layers of the stack">
                {PLATES.map((plate, index) => (
                    <li key={plate.id}>
                        <button
                            type="button"
                            style={layerVar(plate.id)}
                            className={hovered === plate.id ? 'is-on' : undefined}
                            onMouseEnter={() => setHovered(plate.id)}
                            onMouseLeave={() => setHovered(null)}
                            onFocus={() => setHovered(plate.id)}
                            onBlur={() => setHovered(null)}
                            onClick={() => onPick(plate.id)}
                        >
                            <span className="iso__legend-index mono">L{PLATES.length - index}</span>
                            <span className="iso__legend-name">{plate.label}</span>
                            <span className="iso__legend-tech">{plate.tech}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
