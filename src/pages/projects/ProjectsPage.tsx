import { Link, useSearchParams } from 'react-router-dom';
import { Coverage } from '../../components/Coverage';
import { Icon } from '../../components/Icon';
import { LAYERS, type LayerId } from '../../data/layers';
import { PROJECTS } from '../../data/projects';
import { layerVar, useTitle } from '../../lib/ui';
import '../pages.css';

const isLayer = (value: string | null): value is LayerId => LAYERS.some((layer) => layer.id === value);

export default function ProjectsPage() {
    useTitle('Projects');
    const [params, setParams] = useSearchParams();
    const raw = params.get('layer');
    const filter = isLayer(raw) ? raw : null;
    const visible = filter ? PROJECTS.filter((project) => project.layers.includes(filter)) : PROJECTS;

    const setFilter = (layer: LayerId | null) => setParams(layer ? { layer } : {}, { replace: true });

    return (
        <div className="container page">
            <header className="page-head">
                <p className="eyebrow">
                    <span className="eyebrow__index">idx</span>Every project
                </p>
                <h1>
                    The index <span className="page-head__count mono">{PROJECTS.length}</span>
                </h1>
                <p className="page-head__lede">
                    Every repo I’ve documented, mapped to the layers of the stack it touches. Filter by layer to see where
                    I’ve done the work.
                </p>
            </header>

            <div className="filter-bar" role="group" aria-label="Filter by layer">
                <button type="button" className="filter" aria-pressed={!filter} onClick={() => setFilter(null)}>
                    All <span className="filter__count">{PROJECTS.length}</span>
                </button>
                {LAYERS.map((layer) => (
                    <button
                        key={layer.id}
                        type="button"
                        className="filter"
                        style={layerVar(layer.id)}
                        aria-pressed={filter === layer.id}
                        onClick={() => setFilter(filter === layer.id ? null : layer.id)}
                    >
                        <i className="dot" />
                        {layer.short}
                        <span className="filter__count">{PROJECTS.filter((project) => project.layers.includes(layer.id)).length}</span>
                    </button>
                ))}
            </div>

            <div className="index-head" aria-hidden="true">
                <span>#</span>
                <span>Project</span>
                <span>Type</span>
                <span>Layers</span>
                <span />
            </div>

            <ul className="index-list" aria-live="polite">
                {visible.map((project, index) => (
                    <li key={project.slug} className="index-row">
                        <span className="index-row__num mono">{String(index + 1).padStart(2, '0')}</span>
                        <div className="index-row__main">
                            <Link to={`/projects/${project.slug}`} className="index-row__title mono">
                                {project.title}
                            </Link>
                            <p>{project.overview}</p>
                        </div>
                        <span className="index-row__kind">{project.kind}</span>
                        <Coverage layers={project.layers} size="sm" />
                        <div className="index-row__links">
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="icon-button icon-button--sm" aria-label={`${project.title} live site`}>
                                    <Icon name="arrowUpRight" size={16} />
                                </a>
                            )}
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="icon-button icon-button--sm" aria-label={`${project.title} on GitHub`}>
                                    <Icon name="github" size={15} />
                                </a>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
