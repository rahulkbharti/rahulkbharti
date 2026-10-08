import { Icon } from '../../components/Icon';
import { CURRENTLY, EDUCATION, PROFILE } from '../../data/profile';
import { LAYERS } from '../../data/layers';
import { layerVar, useTitle } from '../../lib/ui';
import '../pages.css';

const PRINCIPLES = [
    {
        title: 'Model the business first',
        text: 'Good systems start from a data model that matches how the business actually works. Get that right and the API and UI almost write themselves.',
    },
    {
        title: 'Boring in production',
        text: 'Reliable, observable, predictable. The best compliment a system can get is that nobody has to think about it.',
    },
    {
        title: 'Simple beats clever',
        text: 'Simplicity is the ultimate sophistication in system design. Build it clean, make it scalable, and design for the person using it.',
    },
    {
        title: 'Write it down',
        text: 'I work from a “second brain”: organised notes, mapped systems and clear architecture docs. It’s how I adapt fast and keep delivery clean.',
    },
];

export default function About() {
    useTitle('About');

    return (
        <div className="container page about">
            <aside className="about__card">
                <div className="about__avatar" aria-hidden="true">
                    <span>RB</span>
                    <i style={layerVar('ui')} />
                    <i style={layerVar('api')} />
                    <i style={layerVar('data')} />
                </div>
                <h1>{PROFILE.name}</h1>
                <p>
                    {PROFILE.role}
                    <br />
                    at {PROFILE.company}
                </p>
                <div className="about__links">
                    <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="btn btn--primary btn--sm">
                        <Icon name="download" size={16} /> Résumé
                    </a>
                    <a href={PROFILE.github} target="_blank" rel="noreferrer" className="icon-button" aria-label="GitHub">
                        <Icon name="github" />
                    </a>
                    <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="icon-button" aria-label="LinkedIn">
                        <Icon name="linkedin" />
                    </a>
                    <a href={`mailto:${PROFILE.email}`} className="icon-button" aria-label="Email">
                        <Icon name="mail" />
                    </a>
                </div>
            </aside>

            <div className="about__main">
                <p className="about__lede">
                    I like owning a feature from the first sketch to the production dashboard — and{' '}
                    <span className="serif">every layer in between.</span>
                </p>

                <div className="prose-plain">
                    <p>
                        I started on the backend — databases, APIs, data pipelines — and grew outward until I could own
                        whole products. I built <a href={PROFILE.libspace}>LibSpace</a>, a multi-tenant library ERP, on my
                        own and took it to paying institutions. Shipping real software taught me as much about product–market
                        fit, cloud costs and operational efficiency as it did about code.
                    </p>
                    <p>
                        Today I’m a {PROFILE.role.toLowerCase()} at {PROFILE.company}, where I joined as an intern and was
                        moved to full-time within three months. Outside work I go deep on realtime video, WebRTC and AI
                        agents — usually by building a small project around whatever I’m trying to understand.
                    </p>
                </div>

                <section className="about__section">
                    <h2>How I work</h2>
                    <ol className="principles">
                        {PRINCIPLES.map((principle, index) => (
                            <li key={principle.title}>
                                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                                <h3>{principle.title}</h3>
                                <p>{principle.text}</p>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="about__section">
                    <h2>Right now I’m exploring</h2>
                    <ul className="now-list">
                        {CURRENTLY.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section className="about__section">
                    <h2>Toolbox, by layer</h2>
                    <dl className="toolbox">
                        {LAYERS.map((layer) => (
                            <div key={layer.id} style={layerVar(layer.id)}>
                                <dt>
                                    <i className="dot" />
                                    {layer.name}
                                </dt>
                                <dd>{layer.tools.join(', ')}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section className="about__section">
                    <h2>Education</h2>
                    <ol className="education">
                        {EDUCATION.map((item) => (
                            <li key={item.school}>
                                <span className="mono">{item.period}</span>
                                <div>
                                    <h3>{item.program}</h3>
                                    <p>
                                        {item.school}
                                        {item.note && <span className="chip">{item.note}</span>}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>
            </div>
        </div>
    );
}
