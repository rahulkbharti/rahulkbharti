export interface ProjectReport {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  role: string;
  stack: string[];
  highlights: string[];
  challenges: string[];
  architecture: string[];
  decisions: string[];
  outcomes: string[];
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const PROJECTS: ProjectReport[] = [
  {
    id: 1,
    slug: "streamlet",
    title: "Streamlet",
    subtitle:
      "Microservices learning project focused on scalable streaming architecture.",
    overview:
      "Streamlet was built to practice microservices architecture through a video streaming domain. The goal was to design clean service boundaries and scalable media workflows.",
    role: "Built the platform to learn microservices design, service boundaries, and streaming workflows.",
    stack: ["Node.js", "PostgreSQL", "MongoDB", "Docker", "Express", "Next.js"],
    highlights: [
      "Separated auth, catalog, playback, and analytics into independent services.",
      "Built upload pipeline with background processing for encoding.",
      "Explored scalable media delivery patterns with CDN-style routing.",
    ],
    challenges: [
      "Keeping playback latency low with increasing concurrent viewers.",
      "Coordinating media metadata across SQL and document stores.",
      "Ensuring stable streaming when files were still processing.",
    ],
    architecture: [
      "API gateway for auth and routing, service-per-domain architecture.",
      "PostgreSQL for relational data, MongoDB for flexible media metadata.",
      "Async workers for encoding and playlist generation.",
    ],
    decisions: [
      "Chose microservices to allow independent scaling of bandwidth-heavy workloads.",
      "Used background workers to offload heavy CPU encoding tasks.",
      "Adopted CDN-aware URLs to reduce origin load.",
    ],
    outcomes: [
      "Improved average playback startup time by reducing origin load.",
      "Enabled clean multi-tenant isolation with service-level ownership.",
      "Simplified future rollout for premium tiers and analytics features.",
    ],
    images: [
      "/rahulkbharti/projects/streamlet1-home.png",
      "/rahulkbharti/projects/streamlet2-player.png",
    ],
    githubUrl: "https://github.com/rahulkbharti/streamlet-microservices.git",
    liveUrl: "https://streamlet.rahulkbharti.me",
  },
  {
    id: 2,
    slug: "nexus-core",
    title: "Nexus Core",
    subtitle:
      "Multi-tenant SaaS learning project centered on RBAC and tenant isolation.",
    overview:
      "Nexus Core was built to learn multi-tenant SaaS architecture with strong RBAC. The focus was on tenant isolation, access control, and clean operational workflows.",
    role: "Designed the data model and RBAC system to practice multi-tenant SaaS patterns.",
    stack: ["Node.js", "React", "PostgreSQL", "Redis", "Prisma", "Docker"],
    highlights: [
      "Designed schema for multi-tenant isolation and RBAC boundaries.",
      "Implemented configurable RBAC with policy-driven permissions.",
      "Built operational views to validate tenant flows and access rules.",
    ],
    challenges: [
      "Handling tenant isolation without duplicating infrastructure.",
      "Balancing analytics queries with operational traffic.",
      "Maintaining predictable performance during peak hours.",
    ],
    architecture: [
      "Tenant-aware middleware for request scoping and auth.",
      "Redis cache for hot data and background job queues.",
      "PostgreSQL for transactional data and reporting views.",
    ],
    decisions: [
      "Applied a shared database with strict tenant filtering and row-level constraints.",
      "Used Prisma for reliable migrations and controlled schema evolution.",
      "Split analytics queries into background jobs with cached summaries.",
    ],
    outcomes: [
      "Stable multi-tenant experience for real institutional clients.",
      "Reduced query latency through caching and optimized indexes.",
      "Clear audit logs supporting admin-level compliance needs.",
    ],
    images: [
      "/rahulkbharti/projects/nexuscore1-dark.png",
      "/rahulkbharti/projects/nexuscore2-light.png",
    ],
    githubUrl: "https://github.com/rahulkbharti/nexus-core-backend.git",
    liveUrl: "https://nexuscore.rahulkbharti.me",
  },
  {
    id: 3,
    slug: "meshtalk",
    title: "MeshTalk",
    subtitle:
      "Realtime application built to explore WebRTC and live communication flows.",
    overview:
      "MeshTalk is a realtime video chat app built to learn WebRTC signaling, peer connection lifecycle, and live UI state management.",
    role: "Built the signaling layer and peer connection lifecycle for realtime calls.",
    stack: ["TypeScript", "React", "WebRTC", "Node.js", "Socket.io"],
    highlights: [
      "Implemented signaling server with room orchestration.",
      "Designed realtime UI states for connection and retry flows.",
      "Optimized media constraints for stable bandwidth usage.",
    ],
    challenges: [
      "Maintaining stable calls across inconsistent network conditions.",
      "Handling reconnections without leaving ghost peers.",
      "Managing UI state for multiple call transitions.",
    ],
    architecture: [
      "Socket.io signaling layer for offers, answers, and ICE exchange.",
      "Client-side state machine for call lifecycle.",
      "WebRTC peer connections with fallback constraints.",
    ],
    decisions: [
      "Kept signaling stateless to simplify horizontal scaling.",
      "Used lightweight connection state management instead of heavy libs.",
      "Focused on clear user feedback over complex auto-retry logic.",
    ],
    outcomes: [
      "Consistent call setup times with clear recovery messaging.",
      "Clean separation between signaling and UI state handling.",
      "Reusable WebRTC setup for future realtime experiments.",
    ],
    images: [
      "/rahulkbharti/projects/mesh-talk.png",
      "/rahulkbharti/projects/mesh-talk3.png",
      "/rahulkbharti/projects/mesh-talk4.png",
    ],
    githubUrl: "https://github.com/rahulkbharti/mesh-talk.git",
    liveUrl: "https://rahulkbharti.github.io/mesh-talk/",
  },
];
