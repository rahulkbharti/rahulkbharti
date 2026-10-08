import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CommandPalette } from '../components/CommandPalette';
import { Toaster } from '../components/Toaster';
import { Footer } from './Footer';
import { Header } from './Header';

/** Scroll to #hash targets (smoothly within a page, instantly across pages) and to the top on new pages. */
function ScrollManager() {
    const { pathname, hash, key } = useLocation();
    const lastPath = useRef(pathname);

    useEffect(() => {
        const samePage = lastPath.current === pathname;
        lastPath.current = pathname;

        if (!hash) {
            if (!samePage) window.scrollTo({ top: 0 });
            return;
        }
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        target?.scrollIntoView({ behavior: samePage ? 'smooth' : 'auto', block: 'start' });
    }, [pathname, hash, key]);

    return null;
}

export default function Layout() {
    return (
        <>
            <a href="#main" className="skip-link">
                Skip to content
            </a>
            <ScrollManager />
            <Header />
            <main id="main">
                <Outlet />
            </main>
            <Footer />
            <CommandPalette />
            <Toaster />
        </>
    );
}
