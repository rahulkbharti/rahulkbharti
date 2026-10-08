import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useTitle, isMac, openPalette } from '../lib/ui';
import './pages.css';

export default function NotFound() {
    useTitle('Not found');
    const { pathname } = useLocation();

    return (
        <div className="container page not-found">
            <p className="eyebrow">
                <span className="eyebrow__index">404</span>Not found
            </p>
            <h1>
                This route isn’t in <span className="serif">any layer.</span>
            </h1>

            <pre className="not-found__trace mono" aria-label={`Request trace for ${pathname}: not found`}>
                <span className="tok-com">GET {pathname}</span>
                {'\n'}
                <span className="tok-str">✓</span> ui        rendered this page
                {'\n'}
                <span className="tok-tag">✗</span> router    no route matched
                {'\n'}
                <span className="tok-tag">✗</span> api       never called
                {'\n'}
                <span className="tok-prop">→</span> 404 Not Found
            </pre>

            <div className="not-found__actions">
                <Link to="/" className="btn btn--primary">
                    <Icon name="arrowLeft" /> Back home
                </Link>
                <button type="button" className="btn" onClick={openPalette}>
                    <Icon name="search" /> Search <kbd>{isMac() ? '⌘' : 'Ctrl'} K</kbd>
                </button>
            </div>
        </div>
    );
}
