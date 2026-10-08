import type { ComponentType } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { formatDate, POSTS } from '../../data/blog';
import { PROFILE } from '../../data/profile';
import { useTitle } from '../../lib/ui';
import NotFound from '../NotFound';
import Backpropagation from './posts/Backpropagation';
import '../pages.css';

const BODIES: Record<string, ComponentType> = {
    'neural-network-backpropagation': Backpropagation,
};

export default function BlogPost() {
    const { slug = '' } = useParams();
    const post = POSTS.find((item) => item.slug === slug);
    const Body = BODIES[slug];
    useTitle(post?.title ?? 'Not found');

    if (!post || !Body) return <NotFound />;

    return (
        <article className="container page post">
            <Link to="/blog" className="back-link">
                <Icon name="arrowLeft" size={16} /> All writing
            </Link>

            <header className="post__head">
                <p className="post__meta mono">
                    {formatDate(post.date)} · {post.readMinutes} min read
                </p>
                <h1>{post.title}</h1>
                <ul className="chips">
                    {post.tags.map((tag) => (
                        <li key={tag} className="chip">
                            {tag}
                        </li>
                    ))}
                </ul>
            </header>

            {post.cover && <img className="post__cover" src={post.cover} alt="" />}

            <Body />

            <footer className="post__foot">
                <p>Questions, corrections or a better explanation? I’d like to hear it.</p>
                <div className="post__foot-actions">
                    <a href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(`Re: ${post.title}`)}`} className="btn btn--sm">
                        <Icon name="mail" size={16} /> Email me
                    </a>
                    <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn btn--sm">
                        <Icon name="linkedin" size={15} /> Discuss on LinkedIn
                    </a>
                </div>
            </footer>
        </article>
    );
}
