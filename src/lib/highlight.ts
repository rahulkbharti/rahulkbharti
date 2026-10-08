/**
 * A deliberately tiny syntax highlighter for the short TS / YAML snippets on this site.
 * Works line by line, so it never has to track tokens that span lines.
 */

const TS_KEYWORDS = new Set([
    'async', 'await', 'const', 'else', 'export', 'false', 'for', 'from', 'function', 'if', 'import',
    'in', 'interface', 'let', 'new', 'null', 'of', 'return', 'throw', 'true', 'type', 'typeof', 'undefined',
]);

const TS_TOKENS = /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(<\/?[A-Za-z][\w.]*)|([A-Za-z_$][\w$]*)|(\d+)/g;
const YAML_TOKENS = /(#.*$)|("(?:[^"\\]|\\.)*"|'[^']*')|^(\s*-?\s*)([\w.-]+)(?=:)|(\d+(?::\d+)?)/g;

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const wrap = (kind: string, text: string) => `<span class="tok-${kind}">${escape(text)}</span>`;

function tsToken(match: RegExpExecArray, line: string): string {
    const [text, comment, string, tag, ident, num] = match;
    if (comment) return wrap('com', text);
    if (string) return wrap('str', text);
    if (tag) {
        const open = text.startsWith('</') ? '</' : '<';
        return escape(open) + wrap('tag', text.slice(open.length));
    }
    if (ident) {
        const next = line[match.index + text.length];
        if (TS_KEYWORDS.has(text)) return wrap('kw', text);
        if (next === '(') return wrap('fn', text);
        if (next === ':') return wrap('prop', text);
        if (/^[A-Z]/.test(text)) return wrap('type', text);
        return escape(text);
    }
    if (num) return wrap('num', text);
    return escape(text);
}

function yamlToken(match: RegExpExecArray): string {
    const [text, comment, string, indent, key, num] = match;
    if (comment) return wrap('com', text);
    if (string) return wrap('str', text);
    if (key) return escape(indent ?? '') + wrap('prop', key);
    if (num) return wrap('num', text);
    return escape(text);
}

export function highlightLine(line: string, lang: 'ts' | 'yaml'): string {
    const pattern = lang === 'yaml' ? YAML_TOKENS : TS_TOKENS;
    let html = '';
    let last = 0;
    for (const match of line.matchAll(pattern)) {
        html += escape(line.slice(last, match.index));
        html += lang === 'yaml' ? yamlToken(match) : tsToken(match, line);
        last = match.index + match[0].length;
    }
    return html + escape(line.slice(last));
}
