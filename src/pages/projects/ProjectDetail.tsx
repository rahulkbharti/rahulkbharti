import { Link, useParams } from 'react-router-dom';
import { BrowserFrame } from '../../components/BrowserFrame';
import { Coverage } from '../../components/Coverage';
import { Icon } from '../../components/Icon';
import { getProject, PROJECTS } from '../../data/projects';
import { useTitle } from '../../lib/ui';
import NotFound from '../NotFound';
import '../pages.css';

export default function ProjectDetail() {
    const { slug = '' } = useParams();
    const project = getProject(slug);
    useTitle(project?.title ?? 'Not found');

    if (!project) return <NotFound />;

    const index = PROJECTS.indexOf(project);
    const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
    const next = PROJECTS[(index + 1) % PROJECTS.length];
    const paired = project.pairedWith ? getProject(project.pairedWith) : undefined;
    const steps = project.architecture.split('->').map((step) => step.trim());

    return (
        <article className="container page case">
            <Link to="/projects" className="back-link">
                <Icon name="arrowLeft" size={16} /> All projects
            </Link>

            <header className="case__head">
                <p className="eyebrow">
                    <span className="eyebrow__index">{String(index + 1).padStart(2, '0')}</span>
                    {project.kind}
                </p>
                <h1 className="case__title mono">{project.title}</h1>
                <p className="page-head__lede">{project.overview}</p>
                <div className="case__actions">
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn--primary">
                            Live site <Icon name="arrowUpRight" />
                        </a>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn">
                            <Icon name="github" /> Source
                        </a>
                    )}
                </div>
            </header>

            {project.images && project.images.length > 0 && (
                <div className="case__gallery">
                    <BrowserFrame key={project.slug} images={project.images} alt={project.title} url={project.liveUrl} large />
                </div>
            )}

            <div className="case__grid">
                <aside className="case__aside">
                    <div>
                        <p className="mini-title">Layers</p>
                        <Coverage layers={project.layers} labeled />
                    </div>
                    <div>
                        <p className="mini-title">Stack</p>
                        <ul className="chips">
                            {project.stack.map((tech) => (
                                <li key={tech} className="chip">
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {paired && (
                        <div>
                            <p className="mini-title">The other half</p>
                            <Link to={`/projects/${paired.slug}`} className="paired">
                                <span className="mono">{paired.title}</span>
                                <span>{paired.kind}</span>
                                <Icon name="arrowRight" size={16} />
                            </Link>
                        </div>
                    )}
                </aside>

                <div className="case__story">
                    <section>
                        <h2>The problem</h2>
                        <p>{project.problem}</p>
                    </section>
                    <section>
                        <h2>The solution</h2>
                        <p>{project.solution}</p>
                    </section>
                    <section>
                        <h2>Architecture</h2>
                        <ol className="flow">
                            {steps.map((step, i) => (
                                <li key={`${step}-${i}`}>
                                    <span className="flow__num mono">{i + 1}</span>
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </section>
                    <section>
                        <h2>What I learned</h2>
                        <p>{project.learnings}</p>
                    </section>
                </div>
            </div>

            <nav className="pager" aria-label="More projects">
                <Link to={`/projects/${prev.slug}`} className="pager__link">
                    <span className="mini-title">
                        <Icon name="arrowLeft" size={14} /> Previous
                    </span>
                    <span className="mono">{prev.title}</span>
                </Link>
                <Link to={`/projects/${next.slug}`} className="pager__link pager__link--next">
                    <span className="mini-title">
                        Next <Icon name="arrowRight" size={14} />
                    </span>
                    <span className="mono">{next.title}</span>
                </Link>
            </nav>
        </article>
    );
}
