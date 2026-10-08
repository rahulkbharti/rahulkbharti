import { Link } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { SectionHead } from '../../components/SectionHead';
import { DRAFTS, formatDate, POSTS } from '../../data/blog';

export function Writing() {
    return (
        <section id="writing" className="section container">
            <SectionHead
                index="06"
                label="Writing"
                title={
                    <>
                        Notes from <span className="serif">the workbench.</span>
                    </>
                }
                lede="Long-form explanations of things I had to understand properly to build."
            />

            <div className="writing">
                {POSTS.map((post) => (
                    <Link key={post.slug} to={`/blog/${post.slug}`} className="post-card">
                        {post.cover && (
                            <div className="post-card__cover">
                                <img src={post.cover} alt="" loading="lazy" />
                            </div>
                        )}
                        <div className="post-card__body">
                            <p className="post-card__meta mono">
                                {formatDate(post.date)} · {post.readMinutes} min read
                            </p>
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                            <span className="link-arrow">
                                Read the post <Icon name="arrowRight" size={16} />
                            </span>
                        </div>
                    </Link>
                ))}

                <div className="drafts">
                    <p className="mini-title">In the drafts folder</p>
                    <ul>
                        {DRAFTS.map((draft) => (
                            <li key={draft}>
                                <span className="chip">draft</span>
                                {draft}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
