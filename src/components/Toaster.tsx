import { useEffect, useState } from 'react';
import { onToast } from '../lib/ui';
import { Icon } from './Icon';

export function Toaster() {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        let timer: number | undefined;
        const off = onToast((next) => {
            setMessage(next);
            window.clearTimeout(timer);
            timer = window.setTimeout(() => setMessage(null), 2400);
        });
        return () => {
            off();
            window.clearTimeout(timer);
        };
    }, []);

    // The live region stays mounted so screen readers announce each message.
    return (
        <div className="toast" role="status" aria-live="polite" data-show={message ? 'true' : 'false'}>
            {message && (
                <>
                    <Icon name="check" size={16} />
                    {message}
                </>
            )}
        </div>
    );
}
