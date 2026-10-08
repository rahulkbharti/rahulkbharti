import type { LayerId } from './layers';

export interface Service {
    title: string;
    detail: string;
    layers: LayerId[];
}

export const SERVICES: Service[] = [
    {
        title: 'Your MVP, end to end',
        detail: 'From a rough idea to a deployed product: data model, API, UI, auth, billing and the boring-but-critical parts in between.',
        layers: ['ui', 'api', 'data', 'infra'],
    },
    {
        title: 'Multi-tenant SaaS',
        detail: 'Tenant isolation, roles and permissions, per-tenant config and billing — the architecture LibSpace runs on.',
        layers: ['api', 'data'],
    },
    {
        title: 'Frontends that feel fast',
        detail: 'React / Next.js apps with real loading states, optimistic updates, responsive layouts and accessible components.',
        layers: ['ui'],
    },
    {
        title: 'Realtime & video',
        detail: 'Live updates over WebSockets, WebRTC calls, FFmpeg transcoding and HLS streaming through a CDN.',
        layers: ['realtime', 'api', 'infra'],
    },
    {
        title: 'AI inside your product',
        detail: 'Gemini / LLM features with tool calling and structured output that respect your existing rules and permissions.',
        layers: ['ai', 'api'],
    },
    {
        title: 'Performance & deploys',
        detail: 'Slow pages and slow queries fixed: indexing, caching, connection pooling, Docker images and CI pipelines.',
        layers: ['data', 'infra'],
    },
];
