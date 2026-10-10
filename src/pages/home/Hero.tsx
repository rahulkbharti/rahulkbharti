import {
    LazyMotion,
    MotionConfig,
    domAnimation,
    m,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useTransform,
    type Variants,
} from 'framer-motion';
import { Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import type { LayerId } from '../../data/layers';
import { PROFILE } from '../../data/profile';
import { PROJECTS } from '../../data/projects';
import { useMediaQuery } from '../../lib/ui';
import { RequestTrace } from './RequestTrace';
import { SystemCanvas } from './SystemCanvas';

const EASE = [0.2, 0.8, 0.2, 1] as const;

const LEAD = ['I', 'build', 'the', 'whole', 'thing', '—'];
const ACCENT = ['from', 'pixel', 'to', 'Postgres.'];

const reveal: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const rise: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const title: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } },
};

const word: Variants = {
    hidden: { opacity: 0, y: '0.35em', filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
};

export function Hero({ onPickLayer }: { onPickLayer: (id: LayerId) => void }) {
    const sectionRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();
    // Scroll effects only suit the two-column layout; stacked, the hero is too tall for them.
    const wide = useMediaQuery('(min-width: 961px)');
    const parallax = wide && !reducedMotion;

    // Shared between the canvas and the trace card.
    const traceStep = useMotionValue(0);
    const focus = useMotionValue<string | null>(null);

    // 0 with the hero at the top of the viewport, 1 once it has scrolled out.
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
    const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
    const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
    const traceY = useTransform(scrollYProgress, [0, 1], [0, -160]);
    const traceOpacity = useTransform(scrollYProgress, [0.1, 0.75], [1, 0]);
    const backdropOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.1]);

    return (
        <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">
                <section ref={sectionRef} className="hero" aria-labelledby="hero-title">
                    <m.div className="hero__backdrop" style={{ opacity: wide ? backdropOpacity : 1 }} aria-hidden="true">
                        <SystemCanvas
                            stageRef={stageRef}
                            scroll={scrollYProgress}
                            step={traceStep}
                            focus={focus}
                            onPick={onPickLayer}
                        />
                    </m.div>

                    <div className="hero__inner container">
                        <m.div className="hero__copy" style={{ y: parallax ? copyY : 0, opacity: wide ? copyOpacity : 1 }}>
                            <m.div variants={reveal} initial="hidden" animate="show">
                                <m.p className="hero__status" variants={rise}>
                                    <span className="pulse" aria-hidden="true" />
                                    {PROFILE.role} at {PROFILE.company}
                                </m.p>

                                <m.h1 id="hero-title" className="hero__title" variants={title}>
                                    {LEAD.map((text, index) => (
                                        <Fragment key={text + index}>
                                            <m.span className="hero__word" variants={word}>
                                                {text}
                                            </m.span>{' '}
                                        </Fragment>
                                    ))}
                                    <span className="serif hero__title-accent">
                                        {ACCENT.map((text, index) => (
                                            <Fragment key={text}>
                                                {index > 0 && ' '}
                                                <m.span
                                                    className="hero__word hero__word--accent"
                                                    style={{ backgroundPosition: `${(index / (ACCENT.length - 1)) * 100}% 0` }}
                                                    variants={word}
                                                >
                                                    {text}
                                                </m.span>
                                            </Fragment>
                                        ))}
                                    </span>
                                </m.h1>

                                <m.p className="hero__lede" variants={rise}>
                                    I’m {PROFILE.name}. I design the APIs, model the data and scale the services — then ship
                                    the interface on top. Multi-tenant SaaS, video pipelines, realtime apps and AI features,
                                    built end to end.
                                </m.p>

                                <m.div className="hero__ctas" variants={rise}>
                                    <Link to="/#work" className="btn btn--primary hero__cta">
                                        See the work <Icon name="arrowRight" />
                                    </Link>
                                    <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="btn">
                                        <Icon name="download" /> Résumé
                                    </a>
                                </m.div>

                                <m.dl className="hero__facts" variants={reveal}>
                                    <m.div variants={rise}>
                                        <dt>Founded</dt>
                                        <dd>LibSpace — a SaaS with paying customers</dd>
                                    </m.div>
                                    <m.div variants={rise}>
                                        <dt>Ranked</dt>
                                        <dd>Top 0.5% worldwide, TCS CodeVita</dd>
                                    </m.div>
                                    <m.div variants={rise}>
                                        <dt>Shipped</dt>
                                        <dd>{PROJECTS.length} projects across six layers</dd>
                                    </m.div>
                                </m.dl>
                            </m.div>
                        </m.div>

                        <div className="hero__visual">
                            {/* Empty on purpose: the canvas centres the system graph on this box and takes hover/clicks through it. */}
                            <div ref={stageRef} className="hero__stage" aria-hidden="true" />

                            <m.div className="hero__trace" style={{ y: parallax ? traceY : 0, opacity: wide ? traceOpacity : 1 }}>
                                <m.div
                                    initial={{ opacity: 0, y: 40, rotateX: 16 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    transition={{ duration: 1, delay: 0.6, ease: EASE }}
                                >
                                    <m.div
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        <RequestTrace step={traceStep} focus={focus} onPick={onPickLayer} />
                                    </m.div>
                                </m.div>
                            </m.div>
                        </div>
                    </div>
                </section>
            </MotionConfig>
        </LazyMotion>
    );
}
