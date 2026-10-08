import { asset } from '../lib/asset';
import type { LayerId } from './layers';

export type ProjectKind = 'Full stack' | 'Backend' | 'Frontend' | 'Realtime' | 'AI / ML';

export interface Project {
    slug: string;
    title: string;
    kind: ProjectKind;
    /** Stack layers this project touches. */
    layers: LayerId[];
    overview: string;
    stack: string[];
    problem: string;
    solution: string;
    /** Steps separated by "->", rendered as a flow diagram. */
    architecture: string;
    learnings: string;
    images?: string[];
    githubUrl?: string;
    liveUrl?: string;
    /** The other half of a product (frontend <-> backend repo). */
    pairedWith?: string;
}

export const PROJECTS: Project[] = [
    {
        slug: 'nexus-core-backend',
        title: 'nexus-core-backend',
        kind: 'Backend',
        layers: ['api', 'data', 'infra'],
        overview: 'Multi-tenant library ERP backend with RBAC, tenant isolation and automated billing.',
        stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'Docker', 'JWT'],
        problem:
            'Libraries need completely separate data, separate admins and separate billing — but one deployment per library doesn’t scale.',
        solution:
            'Tenant isolation in PostgreSQL. Every request carries a tenant context via JWT middleware, and all queries go through a tenant-scoped Prisma client.',
        architecture: 'React -> Express API -> Tenant middleware -> Prisma (row-level isolation) -> PostgreSQL + Redis cache',
        learnings: 'Multi-tenancy patterns, RBAC design, complex relational models in Prisma, and Redis caching for tenant config.',
        images: [asset('projects/nexuscore1-dark.png'), asset('projects/nexuscore2-light.png'), asset('projects/nexuscore3.png')],
        githubUrl: 'https://github.com/rahulkbharti/nexus-core-backend',
        liveUrl: 'https://nexuscore.rahulkbharti.me',
        pairedWith: 'nexus-core-frontend',
    },
    {
        slug: 'nexus-core-frontend',
        title: 'nexus-core-frontend',
        kind: 'Frontend',
        layers: ['ui'],
        overview: 'The NexusCore web app: tenant-aware UI, RBAC-driven screens, dashboards and seat booking.',
        stack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'React'],
        problem: 'A multi-tenant SaaS needs a UI that adapts per tenant — different branding, roles and feature access.',
        solution:
            'Next.js App Router with tenant-aware layouts and middleware renders the right role-based UI from one shared component library.',
        architecture: 'Next.js App Router -> Tenant middleware -> Role-based layout -> Shared UI components -> API layer',
        learnings: 'App Router patterns, dynamic tenant theming, RBAC-driven rendering and strict TypeScript.',
        images: [asset('projects/nexuscore2-light.png'), asset('projects/nexuscore1-dark.png')],
        githubUrl: 'https://github.com/rahulkbharti/nexus-core-frontend',
        liveUrl: 'https://nexuscore.rahulkbharti.me',
        pairedWith: 'nexus-core-backend',
    },
    {
        slug: 'streamlet-microservices',
        title: 'streamlet-microservices',
        kind: 'Backend',
        layers: ['api', 'data', 'realtime', 'infra'],
        overview: 'Microservice video platform: async transcoding with BullMQ, FFmpeg HLS output and adaptive bitrate delivery.',
        stack: ['Node.js', 'Express', 'BullMQ', 'FFmpeg', 'HLS', 'MongoDB', 'Docker'],
        problem: 'In a monolith, transcoding blocks everything — one large upload can freeze the whole service.',
        solution:
            'Upload, transcoding and delivery are separate services. BullMQ queues the jobs, FFmpeg workers produce multi-resolution HLS, and delivery streams independently.',
        architecture: 'Upload service -> BullMQ queue -> FFmpeg worker -> HLS storage -> Streaming service -> Next.js player',
        learnings: 'Service boundaries, async job processing, adaptive bitrate streaming and Docker networking between services.',
        images: [asset('projects/streamlet1-home.png'), asset('projects/streamlet2-player.png')],
        githubUrl: 'https://github.com/rahulkbharti/streamlet-microservices',
        liveUrl: 'https://streamlet.rahulkbharti.me',
        pairedWith: 'streamlet-frontend',
    },
    {
        slug: 'streamlet-frontend',
        title: 'streamlet-frontend',
        kind: 'Frontend',
        layers: ['ui', 'realtime'],
        overview: 'The Streamlet web app: upload, browse and watch, with an adaptive HLS player and live upload progress.',
        stack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Video.js', 'HLS.js'],
        problem: 'Video platforms need a UI that handles heavy media without blocking the main thread.',
        solution:
            'Lazy-loaded video components, HLS.js for adaptive streaming, and an upload flow that reports backend transcoding progress over WebSockets.',
        architecture: 'Next.js pages -> HLS.js player -> REST API (upload + stream) -> WebSocket progress updates',
        learnings: 'HLS.js integration, lazy loading for media-heavy pages, upload-progress UX and typed API responses.',
        images: [asset('projects/streamlet2-player.png'), asset('projects/streamlet1-home.png')],
        githubUrl: 'https://github.com/rahulkbharti/streamlet-frontend',
        liveUrl: 'https://streamlet.rahulkbharti.me',
        pairedWith: 'streamlet-microservices',
    },
    {
        slug: 'mesh-talk',
        title: 'mesh-talk',
        kind: 'Full stack',
        layers: ['ui', 'api', 'realtime'],
        overview: 'Peer-to-peer video calls and realtime chat — media goes browser to browser, no media server.',
        stack: ['React', 'Node.js', 'Express', 'Socket.io', 'WebRTC', 'MongoDB'],
        problem: 'Most call apps route video through a media server, adding latency and cost even when two people could connect directly.',
        solution:
            'WebRTC carries the media directly between peers; Socket.io only handles the SDP offer/answer signalling. STUN servers handle NAT traversal.',
        architecture: 'Browser A -> Socket.io signalling -> Browser B -> Direct WebRTC media stream',
        learnings: 'The WebRTC offer/answer flow, ICE candidates, STUN vs TURN, and signalling with Socket.io.',
        images: [asset('projects/mesh-talk.png'), asset('projects/mesh-talk3.png'), asset('projects/mesh-talk4.png')],
        githubUrl: 'https://github.com/rahulkbharti/mesh-talk',
        liveUrl: 'https://rahulkbharti.github.io/mesh-talk/',
    },
    {
        slug: 'ai-career-assistant',
        title: 'ai-career-assistant',
        kind: 'Full stack',
        layers: ['ui', 'api', 'data', 'ai'],
        overview: 'LLM-powered resume tailoring: matches a resume against a job description and rewrites it section by section.',
        stack: ['TypeScript', 'Next.js', 'Gemini API', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
        problem: 'People send one generic resume everywhere, and ATS filters drop it when keywords don’t match.',
        solution:
            'Gemini compares the job description with the resume, suggests targeted rewrites per section, and keeps multiple role-specific versions.',
        architecture: 'Next.js UI -> API routes -> Gemini API (JD + resume prompt) -> Diff suggestions -> PostgreSQL',
        learnings: 'Prompting for structured output, LLM document comparison, multi-version state and Prisma schema design.',
        githubUrl: 'https://github.com/rahulkbharti/ai-career-assistant',
    },
    {
        slug: 'library-management-system',
        title: 'library-management-system',
        kind: 'Full stack',
        layers: ['ui', 'api', 'data'],
        overview: 'Library management with separate student and librarian portals, book tracking and return reminders.',
        stack: ['React', 'Node.js', 'Express', 'MariaDB', 'JavaScript'],
        problem: 'Manual library management means lost records, missed returns and no visibility for students.',
        solution:
            'Students browse, borrow and get reminders in their portal; librarians manage inventory, transactions and reports in theirs.',
        architecture: 'React frontend -> Express REST API -> MariaDB (transactions, catalogue, users)',
        learnings: 'Role-based portals, transaction handling, SQL joins for reports and scheduled reminders with node-cron.',
        githubUrl: 'https://github.com/rahulkbharti',
    },
    {
        slug: 'm3u8-video-streaming',
        title: 'm3u8-video-streaming',
        kind: 'Backend',
        layers: ['ui', 'api', 'realtime'],
        overview: 'HLS video hosting server that serves m3u8 playlists to an adaptive browser player.',
        stack: ['Node.js', 'Express', 'FFmpeg', 'HLS / m3u8', 'Video.js'],
        problem: 'Raw video downloads are slow, heavy, and can’t adapt to changing network speeds.',
        solution: 'FFmpeg segments video into HLS chunks; the server serves m3u8 playlists; Video.js streams them adaptively.',
        architecture: 'FFmpeg -> .ts segments + .m3u8 playlist -> Express static server -> Video.js HLS player',
        learnings: 'HLS internals, FFmpeg segmentation flags, CORS for media and adaptive bitrate concepts.',
        githubUrl: 'https://github.com/rahulkbharti/m3u8-video-streaming',
    },
    {
        slug: 'real-time-video-chat',
        title: 'real-time-video-chat',
        kind: 'Realtime',
        layers: ['ui', 'realtime'],
        overview: 'Bare-metal WebRTC video chat using Google STUN servers — no SDKs.',
        stack: ['WebRTC', 'JavaScript', 'HTML5', 'CSS3', 'Node.js'],
        problem: 'How does browser-native realtime communication actually work without a third-party video SDK?',
        solution: 'Raw WebRTC: getUserMedia for camera and mic, RTCPeerConnection for the streams, Google STUN for NAT traversal.',
        architecture: 'getUserMedia -> RTCPeerConnection -> Google STUN -> P2P media stream',
        learnings: 'Raw WebRTC APIs, media constraints, NAT traversal and cross-browser quirks.',
        githubUrl: 'https://github.com/rahulkbharti/real-time-video-chat',
    },
    {
        slug: 'college-chatbot-gemini',
        title: 'college-chatbot (Gemini)',
        kind: 'AI / ML',
        layers: ['api', 'ai'],
        overview: 'Gemini-powered college assistant for academic queries, course information and events.',
        stack: ['Python', 'FastAPI', 'Gemini API', 'NLP'],
        problem: 'Students ask the same questions about schedules, courses and events over and over, eating admin time.',
        solution: 'Gemini gets a system prompt with college-specific knowledge; FastAPI handles routing and conversation history.',
        architecture: 'Chat UI -> FastAPI -> Gemini API (system prompt + college context) -> Structured response',
        learnings: 'System-prompt design, injecting domain context, async FastAPI and conversation history management.',
        githubUrl: 'https://github.com/rahulkbharti',
    },
    {
        slug: 'nutrition-advisor',
        title: 'nutrition-advisor',
        kind: 'AI / ML',
        layers: ['ui', 'ai'],
        overview: 'Generative AI nutrition advisor that builds personalised meal and diet plans.',
        stack: ['Python', 'Streamlit', 'Gemini API'],
        problem: 'Generic nutrition advice ignores individual goals, allergies and dietary restrictions.',
        solution: 'Users enter goals and preferences; Gemini generates a context-aware plan with meals and macro breakdowns.',
        architecture: 'Streamlit UI -> Python handler -> Gemini API (structured prompt) -> Formatted nutrition plan',
        learnings: 'Structured prompting, the Google GenAI SDK, rapid prototyping with Streamlit and API key handling.',
        githubUrl: 'https://github.com/rahulkbharti/nutrition-advisor',
    },
    {
        slug: 'college-chatbot-deep-learning',
        title: 'college-chatbot (Deep Learning)',
        kind: 'AI / ML',
        layers: ['ai'],
        overview: 'A chatbot trained from scratch — LSTM, then a Transformer — for intent classification.',
        stack: ['Python', 'PyTorch', 'LSTM', 'Transformers', 'NLP'],
        problem: 'Calling an API teaches you little about how language models work. This builds the pipeline by hand.',
        solution:
            'An LSTM intent classifier trained on a custom college Q&A dataset, later upgraded to a Transformer with tokenisation, embeddings and softmax routing.',
        architecture: 'User query -> Tokeniser -> LSTM / Transformer encoder -> Intent classification -> Response mapping',
        learnings: 'Sequence modelling, attention, building a dataset, PyTorch training loops, intents vs entities.',
        githubUrl: 'https://github.com/rahulkbharti',
    },
    {
        slug: 'portfolio',
        title: 'rahulkbharti (this site)',
        kind: 'Frontend',
        layers: ['ui', 'infra'],
        overview: 'This portfolio — hand-written CSS, a 3D CSS stack, a command palette and light/dark themes.',
        stack: ['React', 'TypeScript', 'Vite', 'CSS', 'GitHub Actions'],
        problem: 'A developer portfolio should show the work and also be a piece of work itself — fast, accessible and free to host.',
        solution:
            'A dependency-light React + Vite app with no UI kit, deployed to GitHub Pages by a GitHub Actions workflow on every push.',
        architecture: 'React + Vite build -> GitHub Actions -> GitHub Pages CDN',
        learnings: 'CSS 3D transforms, design tokens for theming, accessible keyboard UI and SPA routing on static hosting.',
        githubUrl: 'https://github.com/rahulkbharti/rahulkbharti',
        liveUrl: 'https://rahulkbharti.github.io/rahulkbharti',
    },
];

export interface Product {
    name: string;
    tagline: string;
    summary: string;
    /** Repos that make up the product, primary first. */
    slugs: string[];
}

/** The flagship work, presented as whole products rather than single repos. */
export const PRODUCTS: Product[] = [
    {
        name: 'NexusCore',
        tagline: 'Multi-tenant library ERP',
        summary:
            'One deployment, many libraries — each with isolated data, its own admins, roles, seat booking and billing. Built front to back: Next.js app, Express API, Prisma on PostgreSQL, Redis and Docker.',
        slugs: ['nexus-core-backend', 'nexus-core-frontend'],
    },
    {
        name: 'Streamlet',
        tagline: 'Video platform on microservices',
        summary:
            'Upload a video, watch it adapt to your connection. Uploads queue through BullMQ, FFmpeg workers produce multi-bitrate HLS, and a Next.js player streams it — with live transcoding progress.',
        slugs: ['streamlet-microservices', 'streamlet-frontend'],
    },
    {
        name: 'MeshTalk',
        tagline: 'Peer-to-peer video calling',
        summary:
            'Video calls and chat where the media never touches a server. Socket.io does the signalling, WebRTC does the rest — lower latency and almost zero infrastructure cost.',
        slugs: ['mesh-talk'],
    },
];

export const getProject = (slug: string) => PROJECTS.find((project) => project.slug === slug);
