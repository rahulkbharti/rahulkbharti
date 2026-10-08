import { Link } from 'react-router-dom';
import { BrowserFrame } from '../../components/BrowserFrame';
import { Coverage } from '../../components/Coverage';
import { Icon } from '../../components/Icon';
import { SectionHead } from '../../components/SectionHead';
import { LAYERS } from '../../data/layers';
import { getProject, PRODUCTS, PROJECTS, type Product, type Project } from '../../data/projects';

const repoLabel = (project: Project, total: number) => {
    if (total === 1) return 'Source';
    return project.kind === 'Frontend' ? 'Frontend repo' : 'Backend repo';
};

function ProductCard({ product, index }: { product: Product; index: number }) {
    const repos = product.slugs.map(getProject).filter((project): project is Project => project !== undefined);
    const [primary] = repos;
    if (!primary) return null;

    const layers = LAYERS.map((layer) => layer.id).filter((id) => repos.some((repo) => repo.layers.includes(id)));
    const stack = [...new Set(repos.flatMap((repo) => repo.stack))].slice(0, 9);
    const images = primary.images ?? [];

    return (
        <article className="product">
            <div className="product__media">
                <BrowserFrame images={images} alt={product.name} url={primary.liveUrl} />
            </div>

            <div className="product__body">
                <p className="product__index mono">
                    {String(index + 1).padStart(2, '0')} <span>/</span> {product.tagline}
                </p>
                <h3 className="product__name">{product.name}</h3>
                <p className="product__summary">{product.summary}</p>

                <div className="product__coverage">
                    <Coverage layers={layers} labeled />
                </div>

                <ul className="chips" aria-label="Tech stack">
                    {stack.map((tech) => (
                        <li key={tech} className="chip">
                            {tech}
                        </li>
                    ))}
                </ul>

                <div className="product__links">
                    <Link to={`/projects/${primary.slug}`} className="btn btn--primary btn--sm">
                        Case study <Icon name="arrowRight" size={16} />
                    </Link>
                    {primary.liveUrl && (
                        <a href={primary.liveUrl} target="_blank" rel="noreferrer" className="btn btn--sm">
                            Live <Icon name="arrowUpRight" size={16} />
                        </a>
                    )}
                    {repos.map(
                        (repo) =>
                            repo.githubUrl && (
                                <a key={repo.slug} href={repo.githubUrl} target="_blank" rel="noreferrer" className="btn btn--sm btn--ghost">
                                    <Icon name="github" size={15} /> {repoLabel(repo, repos.length)}
                                </a>
                            ),
                    )}
                </div>
            </div>
        </article>
    );
}

export function FeaturedWork() {
    return (
        <section id="work" className="section container">
            <SectionHead
                index="01"
                label="Selected work"
                title={
                    <>
                        Products, <span className="serif">not just repos.</span>
                    </>
                }
                lede="Each one is a whole product — interface, API, data and deployment — designed and built by me. The bar under each shows which layers of the stack it covers."
            />

            <div className="products">
                {PRODUCTS.map((product, index) => (
                    <ProductCard key={product.name} product={product} index={index} />
                ))}
            </div>

            <div className="section-foot">
                <Link to="/projects" className="btn">
                    All {PROJECTS.length} projects <Icon name="arrowRight" />
                </Link>
            </div>
        </section>
    );
}
