export const PROFILE = {
    name: 'Rahul Bharti',
    role: 'Full Stack Developer',
    company: 'Nexteir Technologies',
    email: 'rahul.kbharti2002@gmail.com',
    github: 'https://github.com/rahulkbharti',
    linkedin: 'https://www.linkedin.com/in/rahul-kbharti',
    resume: 'https://drive.google.com/file/d/1EmUKATJ4TNC5cv098bKfTxZuttCY5Ukw/view?usp=drive_link',
    libspace: 'https://www.libspace.in',
};

export interface Release {
    version: string;
    period: string;
    role: string;
    org: string;
    orgUrl?: string;
    note?: string;
    points: string[];
    stack: string[];
}

/** Career, written as release notes — newest first. */
export const RELEASES: Release[] = [
    {
        version: 'v4.0',
        period: 'Apr 2026 — Present',
        role: 'Full Stack Developer',
        org: 'Nexteir Technologies',
        note: 'Promoted from intern',
        points: [
            'Own and optimise core backend services, microservice boundaries and database schemas.',
            'Help scale system infrastructure to handle growing user load securely.',
        ],
        stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Microservices'],
    },
    {
        version: 'v3.0',
        period: 'Jan 2026 — Apr 2026',
        role: 'Full Stack Engineering Intern',
        org: 'Nexteir Technologies',
        points: [
            'Shipped end-to-end features across the TypeScript / Node.js stack.',
            'Optimised database queries and API response times — led to a fast full-time offer.',
        ],
        stack: ['TypeScript', 'Node.js', 'SQL'],
    },
    {
        version: 'v2.0',
        period: 'May 2025 — Nov 2025',
        role: 'Founder & Lead Architect',
        org: 'LibSpace',
        orgUrl: 'https://www.libspace.in',
        note: 'Self-started SaaS',
        points: [
            'Designed a multi-tenant architecture with Prisma + PostgreSQL that keeps every institution’s data isolated.',
            'Built QR-code attendance, seat booking, billing and role-based access control (RBAC).',
            'Took the product from zero to paying institutional customers.',
        ],
        stack: ['Next.js', 'Node.js', 'Prisma', 'PostgreSQL', 'Docker'],
    },
    {
        version: 'v1.0',
        period: 'Oct 2023 — Dec 2023',
        role: 'Web Developer Intern',
        org: 'Ekalsutra Edtech Pvt. Ltd.',
        points: [
            'Built a 15-module admin panel from Figma designs.',
            'Secured 20+ routes with JWT authentication.',
            'Peer reviews in a 4-person team raised pre-deployment issue detection by 15%; added lazy loading for faster pages.',
        ],
        stack: ['React', 'JWT', 'REST APIs'],
    },
];

export const ACHIEVEMENTS = [
    {
        title: 'Global rank 1,961 — TCS CodeVita S12',
        detail: 'Top 0.5% of 537,000+ competitive programmers worldwide (2024).',
    },
    {
        title: 'Built and sold a SaaS from scratch',
        detail: 'LibSpace went from an empty repo to paying institutional clients.',
    },
    {
        title: 'Google Cloud Generative AI internship',
        detail: 'Two-month, project-based virtual internship building GenAI solutions on GCP.',
    },
    {
        title: 'Shipped to the Play Store',
        detail: 'Cleared Google Play’s 20-tester closed-testing process for a student app.',
    },
    {
        title: 'Production media pipeline',
        detail: 'Realtime transcoding and streaming for live classrooms with automated FFmpeg processing.',
    },
    {
        title: 'Intern → full-time',
        detail: 'Fast-tracked to a permanent engineering role at Nexteir Technologies.',
    },
];

export const TESTIMONIALS = [
    {
        quote:
            'Rahul has an exceptional ability to take complex system requirements and turn them into clean, scalable backend reality. He doesn’t just write code — he thinks deeply about architecture and future scale.',
        name: 'Engineering Lead',
        org: 'Nexteir Technologies',
    },
    {
        quote:
            'He bridges the gap between technical complexity — video engineering, multi-tenancy — and actual business value, seamlessly.',
        name: 'Manish Kumar',
        org: 'Startup COO & Partner',
    },
];

export const EDUCATION = [
    {
        school: 'Rajkiya Engineering College, Ambedkar Nagar',
        program: 'B.Tech, Information Technology',
        period: 'Graduated 2025',
    },
    {
        school: 'Board of Technical Education, Uttar Pradesh',
        program: 'Diploma, Electrical Engineering',
        period: '2020 — 2022',
        note: 'Honours',
    },
    {
        school: 'Adarsh Inter College, Mahubag, Ghazipur',
        program: 'Secondary education, Mathematics',
        period: '2017 — 2019',
        note: 'First topper',
    },
];

export const CURRENTLY = [
    'Multi-agent systems with LangGraph',
    'An autonomous marketing agent on the Gemini API',
    'Deep agent architectures and tool-calling patterns',
    'Model Context Protocol (MCP) integrations',
];
