/** Resolve a file in /public against the deploy base (GitHub Pages serves under /rahulkbharti/). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
