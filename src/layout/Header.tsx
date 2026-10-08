import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { LogoMark } from '../components/Logo';
import { PROFILE } from '../data/profile';
import { toggleTheme, useTheme } from '../lib/theme';
import { isMac, openPalette } from '../lib/ui';

const NAV = [
    { to: '/#work', id: 'work', label: 'Work' },
    { to: '/#stack', id: 'stack', label: 'Stack' },
    { to: '/#experience', id: 'experience', label: 'Experience' },
    { to: '/blog', id: 'writing', label: 'Writing' },
    { to: '/about', id: 'about', label: 'About' },
];

/** Every home section, including ones without a nav link, so the highlight clears between them. */
const HOME_SECTIONS = ['work', 'stack', 'experience', 'proof', 'services', 'writing', 'contact'];

/** Which home section is in the middle of the viewport. */
function useActiveSection(enabled: boolean) {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled) return;
        const sections = HOME_SECTIONS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-45% 0px -50% 0px' },
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [enabled]);

    return enabled ? active : null;
}

export function Header() {
    const { pathname } = useLocation();
    const theme = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const progressRef = useRef<HTMLDivElement>(null);
    const activeSection = useActiveSection(pathname === '/');

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? window.scrollY / max : 0;
            progressRef.current?.style.setProperty('transform', `scaleX(${progress})`);
            setScrolled(window.scrollY > 8);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [pathname]);

    // Close the mobile menu whenever the route changes.
    const [menuPath, setMenuPath] = useState(pathname);
    if (menuPath !== pathname) {
        setMenuPath(pathname);
        setMenuOpen(false);
    }

    const isCurrent = (item: (typeof NAV)[number]) =>
        activeSection === item.id || (item.to !== '/' && !item.to.startsWith('/#') && pathname.startsWith(item.to));

    return (
        <header className={`site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}>
            <div className="container site-header__inner">
                <Link to="/" className="brand" aria-label={`${PROFILE.name} — home`}>
                    <LogoMark />
                    <span className="brand__text">
                        <strong>{PROFILE.name}</strong>
                        <span>{PROFILE.role}</span>
                    </span>
                </Link>

                <nav className="site-nav" aria-label="Primary">
                    {NAV.map((item) => (
                        <Link key={item.id} to={item.to} className="site-nav__link" aria-current={isCurrent(item) ? 'true' : undefined}>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="site-header__actions">
                    <button type="button" className="kbd-button" onClick={openPalette} aria-label="Open command palette">
                        <Icon name="search" size={16} />
                        <kbd>{isMac() ? '⌘' : 'Ctrl'} K</kbd>
                    </button>
                    <button
                        type="button"
                        className="icon-button"
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                    >
                        <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
                    </button>
                    <Link to="/#contact" className="btn btn--primary btn--sm site-header__cta">
                        Let’s talk
                    </Link>
                    <button
                        type="button"
                        className="icon-button site-header__menu"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-nav"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    >
                        <Icon name={menuOpen ? 'close' : 'menu'} />
                    </button>
                </div>
            </div>

            <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile" hidden={!menuOpen}>
                <div className="container">
                    {[...NAV, { to: '/projects', id: 'projects', label: 'All projects' }, { to: '/#contact', id: 'contact', label: 'Contact' }].map(
                        (item, index) => (
                            <Link key={item.id} to={item.to} className="mobile-nav__link" onClick={() => setMenuOpen(false)}>
                                <span className="mono">0{index + 1}</span>
                                {item.label}
                            </Link>
                        ),
                    )}
                </div>
            </nav>

            <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
        </header>
    );
}
