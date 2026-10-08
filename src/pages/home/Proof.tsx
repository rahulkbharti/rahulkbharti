import { SectionHead } from '../../components/SectionHead';
import { ACHIEVEMENTS, TESTIMONIALS } from '../../data/profile';
import { PROJECTS } from '../../data/projects';

const STATS = [
    { value: '1,961', label: 'Global rank in TCS CodeVita S12 — top 0.5% of 537k+' },
    { value: '0 → paid', label: 'LibSpace, from empty repo to paying institutions' },
    { value: '3 mo', label: 'From intern to full-time engineer at Nexteir' },
    { value: String(PROJECTS.length), label: 'Projects documented, across all six layers' },
];

export function Proof() {
    return (
        <section id="proof" className="section proof">
            <div className="container">
                <SectionHead
                    index="04"
                    label="Proof"
                    title={
                        <>
                            Receipts, <span className="serif">not adjectives.</span>
                        </>
                    }
                />

                <dl className="stats">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="stat">
                            <dt>{stat.label}</dt>
                            <dd>{stat.value}</dd>
                        </div>
                    ))}
                </dl>

                <div className="proof__grid">
                    <ol className="achievements">
                        {ACHIEVEMENTS.map((item, index) => (
                            <li key={item.title}>
                                <span className="achievements__index mono">{String(index + 1).padStart(2, '0')}</span>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.detail}</p>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <div className="quotes">
                        {TESTIMONIALS.map((item) => (
                            <figure key={item.name} className="quote">
                                <blockquote>“{item.quote}”</blockquote>
                                <figcaption>
                                    <strong>{item.name}</strong>
                                    <span>{item.org}</span>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
