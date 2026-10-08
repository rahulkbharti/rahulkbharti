import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import type { LayerId } from '../../data/layers';
import { PROFILE } from '../../data/profile';
import { PROJECTS } from '../../data/projects';
import { IsoStack } from './IsoStack';

export function Hero({ onPickLayer }: { onPickLayer: (id: LayerId) => void }) {
    return (
        <section className="hero container" aria-labelledby="hero-title">
            <div className="hero__copy">
                <p className="hero__status">
                    <span className="pulse" aria-hidden="true" />
                    {PROFILE.role} at {PROFILE.company}
                </p>

                <h1 id="hero-title" className="hero__title">
                    I build the whole thing —{' '}
                    <span className="serif hero__title-accent">from pixel to Postgres.</span>
                </h1>

                <p className="hero__lede">
                    I’m {PROFILE.name}. I design the interface, write the API, model the data and ship the container —
                    multi-tenant SaaS, video pipelines, realtime apps and AI features, built end to end.
                </p>

                <div className="hero__ctas">
                    <Link to="/#work" className="btn btn--primary">
                        See the work <Icon name="arrowRight" />
                    </Link>
                    <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="btn">
                        <Icon name="download" /> Résumé
                    </a>
                </div>

                <dl className="hero__facts">
                    <div>
                        <dt>Founded</dt>
                        <dd>LibSpace — a SaaS with paying customers</dd>
                    </div>
                    <div>
                        <dt>Ranked</dt>
                        <dd>Top 0.5% worldwide, TCS CodeVita</dd>
                    </div>
                    <div>
                        <dt>Shipped</dt>
                        <dd>{PROJECTS.length} projects across six layers</dd>
                    </div>
                </dl>
            </div>

            <div className="hero__visual">
                <IsoStack onPick={onPickLayer} />
            </div>
        </section>
    );
}
