import { m, useMotionValueEvent, useReducedMotion, useSpring, type MotionValue } from 'framer-motion';
import { useState, type PointerEvent } from 'react';
import { LAYERS, type LayerId } from '../../data/layers';
import { layerVar } from '../../lib/ui';
import { TRACE, TRACE_DONE, TRACE_TOTAL_MS } from './trace';

interface RequestTraceProps {
    step: MotionValue<number>;
    focus: MotionValue<string | null>;
    onPick: (layer: LayerId) => void;
}

const TILT = { stiffness: 160, damping: 18, mass: 0.6 };
const EASE = [0.2, 0.8, 0.2, 1] as const;

const layerName = (id: LayerId) => LAYERS.find((layer) => layer.id === id)?.name ?? id;

/** A trace waterfall for the request the hero's packet is carrying; each span opens as the packet reaches it. */
export function RequestTrace({ step, focus, onPick }: RequestTraceProps) {
    const [progress, setProgress] = useState(() => step.get());
    const [focused, setFocused] = useState<string | null>(() => focus.get());
    useMotionValueEvent(step, 'change', (value) => setProgress(value));
    useMotionValueEvent(focus, 'change', (id) => setFocused(id));

    const reducedMotion = useReducedMotion();
    const rotateX = useSpring(0, TILT);
    const rotateY = useSpring(0, TILT);

    const tilt = (event: PointerEvent<HTMLElement>) => {
        if (reducedMotion || event.pointerType !== 'mouse') return;
        const box = event.currentTarget.getBoundingClientRect();
        rotateY.set(((event.clientX - box.left) / box.width - 0.5) * 7);
        rotateX.set(-((event.clientY - box.top) / box.height - 0.5) * 7);
    };
    const settle = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    const done = progress >= TRACE_DONE;
    const state = done ? 'done' : progress > 0 ? 'live' : 'idle';

    return (
        <m.figure className="trace" data-state={state} style={{ rotateX, rotateY, transformPerspective: 900 }} onPointerMove={tilt} onPointerLeave={settle}>
            <header className="trace__head">
                <span className="trace__method">POST</span>
                <span className="trace__path">/v1/seats/:id/book</span>
                <span className="trace__status">
                    <span className="trace__led" aria-hidden="true" />
                    {done ? '201 Created' : progress > 0 ? 'in flight' : 'waiting'}
                </span>
            </header>

            <div className="trace__ruler" aria-hidden="true">
                <span>span</span>
                <span className="trace__ticks">
                    <span>0</span>
                    <span>{TRACE_TOTAL_MS / 2}</span>
                    <span>{TRACE_TOTAL_MS}</span>
                </span>
                <span>ms</span>
            </div>

            <ol className="trace__spans">
                {TRACE.map((span, index) => {
                    const open = progress > index;
                    return (
                        <li key={span.node}>
                            <button
                                type="button"
                                className="trace__span"
                                style={layerVar(span.layer)}
                                data-open={open || undefined}
                                data-focus={focused === span.node || undefined}
                                aria-label={`${span.service}: ${span.op}, ${span.ms} ms. Open the ${layerName(span.layer)} layer.`}
                                onPointerEnter={() => focus.set(span.node)}
                                onPointerLeave={() => focus.set(null)}
                                onFocus={() => focus.set(span.node)}
                                onBlur={() => focus.set(null)}
                                onClick={() => onPick(span.layer)}
                            >
                                <span className="trace__svc">{span.service}</span>
                                <span className="trace__op">{span.op}</span>
                                <span className="trace__track">
                                    <m.span
                                        className="trace__bar"
                                        style={{
                                            left: `${(span.start / TRACE_TOTAL_MS) * 100}%`,
                                            width: `${(span.ms / TRACE_TOTAL_MS) * 100}%`,
                                        }}
                                        initial={false}
                                        animate={{ scaleX: open ? 1 : 0, opacity: open ? 1 : 0 }}
                                        transition={{ duration: open ? 0.5 : 0.3, ease: EASE }}
                                    />
                                </span>
                                <span className="trace__ms">{span.ms.toFixed(1)}</span>
                            </button>
                        </li>
                    );
                })}
            </ol>

            <figcaption className="trace__foot">
                <span>Example trace · seat booking</span>
                <span className="trace__hint">
                    Pick a span to explore <span aria-hidden="true">↓</span>
                </span>
            </figcaption>
        </m.figure>
    );
}
