import { asset } from '../lib/asset';

export interface Post {
    slug: string;
    title: string;
    date: string; // ISO date
    readMinutes: number;
    tags: string[];
    excerpt: string;
    cover?: string;
}

export const POSTS: Post[] = [
    {
        slug: 'neural-network-backpropagation',
        title: 'Understanding backpropagation: a mathematical perspective',
        date: '2025-10-15',
        readMinutes: 12,
        tags: ['Neural networks', 'Backpropagation', 'Machine learning'],
        excerpt:
            'Deriving the gradient equations from scratch for a four-layer network — the "magic" that lets a network learn from its mistakes.',
        cover: asset('blogs/Neural Network Original.png'),
    },
];

/** Posts in progress — shown as drafts so visitors know what is coming. */
export const DRAFTS = [
    'Architecting true multi-tenancy in Node.js with Prisma and PostgreSQL',
    'Resilient video pipelines without breaking the bank: a Bunny.net + FFmpeg guide',
];

export const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
