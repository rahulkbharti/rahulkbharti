import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { PROFILE } from '../data/profile';
import { isMac, openPalette } from '../lib/ui';

const SITE_LINKS = [
    { to: '/#work', label: 'Work' },
    { to: '/#stack', label: 'The stack' },
    { to: '/projects', label: 'All projects' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Writing' },
    { to: '/#contact', label: 'Contact' },
];

export function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="site-footer__top">
                    <p className="site-footer__mark">
                        Pixel <span className="serif">to</span> Postgres.
                    </p>
                    <Link to="/#contact" className="btn btn--primary">
                        Start a project <Icon name="arrowRight" />
                    </Link>
                </div>

                <div className="site-footer__grid">
                    <div>
                        <p className="mini-title">Site</p>
                        <ul>
                            {SITE_LINKS.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="mini-title">Elsewhere</p>
                        <ul>
                            <li>
                                <a href={PROFILE.github} target="_blank" rel="noreferrer">
                                    GitHub <Icon name="arrowUpRight" size={14} />
                                </a>
                            </li>
                            <li>
                                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                                    LinkedIn <Icon name="arrowUpRight" size={14} />
                                </a>
                            </li>
                            <li>
                                <a href={PROFILE.resume} target="_blank" rel="noreferrer">
                                    Résumé <Icon name="arrowUpRight" size={14} />
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${PROFILE.email}`}>Email</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="mini-title">Colophon</p>
                        <p className="site-footer__note">
                            Built by hand with React, TypeScript and Vite — no UI kit. Deployed to GitHub Pages by GitHub
                            Actions. Type set in Bricolage Grotesque, Geist and Instrument Serif.
                        </p>
                        <button type="button" className="link-button" onClick={openPalette}>
                            Press <kbd>{isMac() ? '⌘' : 'Ctrl'} K</kbd> to jump anywhere
                        </button>
                    </div>
                </div>

                <div className="site-footer__bottom">
                    <span>
                        © {new Date().getFullYear()} {PROFILE.name}
                    </span>
                    <span className="mono">UI · API · Data · Realtime · AI · Infra</span>
                </div>
            </div>
        </footer>
    );
}
