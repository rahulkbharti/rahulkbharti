import { Icon } from '../../components/Icon';
import { SectionHead } from '../../components/SectionHead';
import { PROFILE, RELEASES } from '../../data/profile';

export function Experience() {
    return (
        <section id="experience" className="section container">
            <SectionHead
                index="03"
                label="Experience"
                title={
                    <>
                        Release notes <span className="serif">for my career.</span>
                    </>
                }
                lede="Versioned like software, newest first. Every release shipped something real."
            />

            <ol className="releases">
                {RELEASES.map((release, index) => (
                    <li key={release.version} className="release">
                        <div className="release__tag">
                            <span className="release__version mono">{release.version}</span>
                            {index === 0 && <span className="release__latest">Latest</span>}
                            <span className="release__period">{release.period}</span>
                        </div>

                        <div className="release__body">
                            <h3 className="release__role">
                                {release.role}
                                <span className="release__at"> @ </span>
                                {release.orgUrl ? (
                                    <a href={release.orgUrl} target="_blank" rel="noreferrer" className="release__org">
                                        {release.org} <Icon name="arrowUpRight" size={16} />
                                    </a>
                                ) : (
                                    <span className="release__org">{release.org}</span>
                                )}
                            </h3>
                            {release.note && <p className="release__note mono">{release.note}</p>}
                            <ul className="release__points">
                                {release.points.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                            <ul className="chips">
                                {release.stack.map((tech) => (
                                    <li key={tech} className="chip">
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ol>

            <div className="section-foot">
                <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="btn">
                    <Icon name="download" /> Full résumé
                </a>
            </div>
        </section>
    );
}
