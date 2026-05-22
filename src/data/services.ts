export interface ServiceOffering {
    id: string;
    title: string;
    detail: string;
    skills: string[];
    featured?: boolean;
}

export const SERVICES: ServiceOffering[] = [
    {
        id: 'backend-api-engineering',
        title: 'Backend API Engineering',
        detail: 'Designing secure REST APIs, authentication, RBAC, service boundaries, and production-ready Node.js backends.',
        skills: ['Node.js', 'TypeScript', 'Express', 'NestJS', 'RBAC'],
        featured: true,
    },
    {
        id: 'saas-mvp-development',
        title: 'SaaS MVP Development',
        detail: 'Building multi-tenant SaaS products from idea to usable MVP with clean data models and scalable product flows.',
        skills: ['Multi-tenancy', 'PostgreSQL', 'Prisma', 'Product scoping'],
    },
    {
        id: 'database-performance',
        title: 'Database Performance',
        detail: 'Improving slow APIs through schema design, query optimization, indexing, connection pooling, and caching.',
        skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Indexing'],
    },
    {
        id: 'ai-workflow-integration',
        title: 'AI Workflow Integration',
        detail: 'Adding practical AI features, tool-calling flows, Gemini API integrations, and automation inside existing products.',
        skills: ['Gemini API', 'Tool calling', 'Agentic automation'],
    },
    {
        id: 'media-streaming-pipelines',
        title: 'Media Streaming Pipelines',
        detail: 'Setting up video transcoding, live streaming, HLS delivery, and CDN-ready media infrastructure.',
        skills: ['FFmpeg', 'SRS', 'HLS', 'Bunny.net CDN'],
    },
    {
        id: 'full-stack-product-delivery',
        title: 'Full Stack Product Delivery',
        detail: 'Shipping complete product features with React frontends, reliable backends, and database-backed workflows.',
        skills: ['React', 'Next.js', 'REST APIs', 'Tailwind CSS'],
    },
    {
        id: 'deployment-ops',
        title: 'Deployment and Ops',
        detail: 'Deploying apps to VPS/cloud environments with Docker, environment setup, monitoring basics, and cost-aware operations.',
        skills: ['Docker', 'VPS', 'Cloud cost control', 'CI/CD'],
    },
];
