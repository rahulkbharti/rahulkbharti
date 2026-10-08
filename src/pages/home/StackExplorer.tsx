import { useEffect, useState, type Dispatch, type KeyboardEvent, type SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { CodeWindow } from '../../components/CodeWindow';
import { Icon } from '../../components/Icon';
import { SectionHead } from '../../components/SectionHead';
import { LAYERS, LAYER_BY_ID, type LayerId } from '../../data/layers';
import { PROJECTS } from '../../data/projects';
import { layerVar } from '../../lib/ui';

const TRACE_STEP_MS = 3600;
const ARROW_DELTA: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

interface StackExplorerProps {
    active: LayerId;
    onChange: Dispatch<SetStateAction<LayerId>>;
}

export function StackExplorer({ active, onChange }: StackExplorerProps) {
    const [tracing, setTracing] = useState(false);
    const layer = LAYER_BY_ID[active];
    const activeIndex = LAYERS.findIndex((item) => item.id === active);
    const shippedIn = PROJECTS.filter((project) => project.layers.includes(active));

    // While tracing, walk the request through each layer in turn.
    useEffect(() => {
        if (!tracing) return;
        const timer = window.setInterval(() => {
            onChange((current) => {
                const next = LAYERS.findIndex((item) => item.id === current) + 1;
                return LAYERS[next % LAYERS.length].id;
            });
        }, TRACE_STEP_MS);
        return () => window.clearInterval(timer);
    }, [tracing, onChange]);

    const select = (id: LayerId) => {
        setTracing(false);
        onChange(id);
    };

    const startTrace = () => {
        if (tracing) {
            setTracing(false);
            return;
        }
        onChange(LAYERS[0].id);
        setTracing(true);
    };

    const onKeyDown = (event: KeyboardEvent) => {
        const delta = ARROW_DELTA[event.key];
        if (!delta) return;
        event.preventDefault();
        const next = LAYERS[(activeIndex + delta + LAYERS.length) % LAYERS.length];
        select(next.id);
        document.getElementById(`layer-tab-${next.id}`)?.focus();
    };

    return (
        <section id="stack" className="section stack">
            <div className="container">
                <SectionHead
                    index="02"
                    label="The stack"
                    title={
                        <>
                            One feature, <span className="serif">every layer.</span>
                        </>
                    }
                    lede="Full stack isn’t a wall of logos. Here’s a seat-booking flow — the kind LibSpace handles every day — traced from the tap to the container, with the code I’d write at each step."
                />

                <div className="explorer" style={layerVar(active)}>
                    <div className="explorer__rail">
                        <div className="explorer__tabs" role="tablist" aria-label="Stack layers" aria-orientation="vertical" onKeyDown={onKeyDown}>
                            {LAYERS.map((item, index) => (
                                <button
                                    key={item.id}
                                    id={`layer-tab-${item.id}`}
                                    type="button"
                                    role="tab"
                                    aria-selected={item.id === active}
                                    aria-controls="layer-panel"
                                    tabIndex={item.id === active ? 0 : -1}
                                    className={`explorer__tab${index < activeIndex ? ' is-done' : ''}`}
                                    style={layerVar(item.id)}
                                    onClick={() => select(item.id)}
                                >
                                    <span className="explorer__tab-index mono">{String(index + 1).padStart(2, '0')}</span>
                                    <span className="explorer__tab-name">{item.name}</span>
                                    <span className="explorer__tab-tools">{item.tools.slice(0, 3).join(' · ')}</span>
                                    {tracing && item.id === active && (
                                        <span key={active} className="explorer__tab-timer" style={{ animationDuration: `${TRACE_STEP_MS}ms` }} />
                                    )}
                                </button>
                            ))}
                        </div>

                        <button type="button" className="btn btn--sm explorer__trace" onClick={startTrace} aria-pressed={tracing}>
                            <Icon name={tracing ? 'pause' : 'play'} size={15} />
                            {tracing ? 'Pause trace' : 'Trace the request'}
                        </button>
                    </div>

                    <div id="layer-panel" className="explorer__panel" role="tabpanel" aria-labelledby={`layer-tab-${active}`}>
                        <p className="explorer__step" key={`step-${active}`}>
                            <span className="chip chip--layer">
                                <i className="dot" /> {layer.short}
                            </span>
                            {layer.step}
                        </p>

                        <div className="explorer__code" key={`code-${active}`}>
                            <CodeWindow file={layer.file} code={layer.code} lang={layer.lang} aside={`${activeIndex + 1} / ${LAYERS.length}`} />
                        </div>

                        <div className="explorer__meta">
                            <div>
                                <p className="mini-title">What I do here</p>
                                <p>{layer.role}</p>
                            </div>
                            <div>
                                <p className="mini-title">Tools</p>
                                <ul className="chips">
                                    {layer.tools.map((tool) => (
                                        <li key={tool} className="chip">
                                            {tool}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="mini-title">Shipped in</p>
                                <ul className="chips">
                                    {shippedIn.map((project) => (
                                        <li key={project.slug}>
                                            <Link to={`/projects/${project.slug}`} className="chip chip--link">
                                                {project.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
