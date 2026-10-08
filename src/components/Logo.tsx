/** Three stacked layers — UI, API, Data — the site's mark. */
export function LogoMark({ size = 30 }: { size?: number }) {
    return (
        <svg className="logo-mark" viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
            <rect width="32" height="32" rx="9" fill="var(--ink)" />
            <path d="M16 6 26 11 16 16 6 11Z" fill="var(--l-ui)" />
            <path d="M6 15.5 16 20.5 26 15.5" fill="none" stroke="var(--l-api)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M6 20.5 16 25.5 26 20.5" fill="none" stroke="var(--l-data)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
    );
}
