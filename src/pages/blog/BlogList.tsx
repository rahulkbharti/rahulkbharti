import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { DRAFTS, formatDate, POSTS } from '../../data/blog';
import { useTitle } from '../../lib/ui';
import '../pages.css';

export default function BlogList() {
    useTitle('Writing');
    const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div className="container page">
            <header className="page-head">
                <p className="eyebrow">
                    <span className="eyebrow__index">log</span>Writing
                </p>
                <h1>
                    Notes from <span className="serif">the workbench.</span>
                </h1>
                <p className="page-head__lede">Long-form explanations of things I had to understand properly to build.</p>
            </header>

            <ul className="post-list">
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link to={`/blog/${post.slug}`} className="post-row">
                            <span className="post-row__date mono">{formatDate(post.date)}</span>
                            <span className="post-row__main">
                                <span className="post-row__title">{post.title}</span>
                                <span className="post-row__excerpt">{post.excerpt}</span>
                                <span className="chips">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="chip">
                                            {tag}
                                        </span>
                                    ))}
                                </span>
                            </span>
                            <Icon name="arrowRight" className="post-row__arrow" />
                        </Link>
                    </li>
                ))}
                {DRAFTS.map((draft) => (
                    <li key={draft} className="post-row post-row--draft">
                        <span className="post-row__date mono">Coming soon</span>
                        <span className="post-row__main">
                            <span className="post-row__title">{draft}</span>
                        </span>
                        <span className="chip">draft</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
