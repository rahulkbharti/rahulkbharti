export type ProjectCategory =
  | "backend"
  | "fullstack"
  | "frontend"
  | "ai"
  | "realtime";

export interface ProjectReport {
  id: number;
  slug: string;
  title: string;
  category: ProjectCategory;
  overview: string;
  stack: string[];
  problem: string;
  solution: string;
  architecture: string;
  keyLearnings: string;
  featured?: boolean;
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  backend: "Backend",
  fullstack: "Full Stack",
  frontend: "Frontend",
  ai: "AI / ML",
  realtime: "Real-Time",
};

export const PROJECTS: ProjectReport[] = [
  {
    id: 1,
    slug: "nexus-core-backend",
    title: "nexus-core-backend",
    category: "backend",
    overview:
      "Multi-tenant Library ERP backend with RBAC, tenant isolation, and automated billing.",
    stack: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Docker",
      "JWT",
    ],
    problem:
      "Libraries need completely separate data, separate admins, and separate billing, but running one deployment per library is not scalable.",
    solution:
      "Schema-level tenant isolation in PostgreSQL. Every API request carries a tenant context via JWT middleware, routing all database queries through a Prisma scoped client.",
    architecture:
      "React -> Express API -> Tenant Middleware -> Prisma (row-level isolation) -> PostgreSQL + Redis cache",
    keyLearnings:
      "Multi-tenancy patterns, RBAC design, Prisma complex relational models, and Redis caching for tenant config.",
    featured: true,
    images: [
      "/rahulkbharti/projects/nexuscore1-dark.png",
      "/rahulkbharti/projects/nexuscore2-light.png",
      "/rahulkbharti/projects/nexuscore3.png",
    ],
    githubUrl: "https://github.com/rahulkbharti/nexus-core-backend",
    liveUrl: "https://nexuscore.rahulkbharti.me",
  },
  {
    id: 2,
    slug: "streamlet-microservices",
    title: "streamlet-microservices",
    category: "backend",
    overview:
      "Microservices video platform with async transcoding via BullMQ, FFmpeg HLS output, and adaptive bitrate delivery.",
    stack: [
      "Node.js",
      "BullMQ",
      "FFmpeg",
      "HLS",
      "Docker",
      "MongoDB",
      "Express",
    ],
    problem:
      "Monolithic video apps block the main thread during transcoding. A large upload can freeze the entire service.",
    solution:
      "Separate microservices handle upload, transcoding, and delivery. BullMQ manages async jobs, FFmpeg creates multi-resolution HLS segments, and the delivery service streams independently.",
    architecture:
      "Upload Service -> BullMQ Queue -> FFmpeg Worker -> HLS Storage -> Streaming Service -> Next.js Player",
    keyLearnings:
      "Service boundary design, async job processing, adaptive bitrate streaming, and Docker networking between services.",
    featured: true,
    images: [
      "/rahulkbharti/projects/streamlet1-home.png",
      "/rahulkbharti/projects/streamlet2-player.png",
    ],
    githubUrl: "https://github.com/rahulkbharti/streamlet-microservices",
    liveUrl: "https://streamlet.rahulkbharti.me",
  },
  {
    id: 3,
    slug: "m3u8-video-streaming",
    title: "m3u8-video-streaming",
    category: "backend",
    overview:
      "HLS video hosting server that serves m3u8 playlists with a frontend adaptive player.",
    stack: ["Node.js", "Express", "FFmpeg", "HLS / m3u8", "Video.js"],
    problem:
      "Raw video file downloads are slow, bandwidth-heavy, and cannot adapt to changing network speeds.",
    solution:
      "FFmpeg segments video into HLS chunks. The backend serves m3u8 playlists, and Video.js streams them adaptively in the browser.",
    architecture:
      "FFmpeg -> .ts segments + .m3u8 playlist -> Express static server -> Video.js HLS player",
    keyLearnings:
      "HLS protocol internals, FFmpeg segmentation flags, CORS for media files, and adaptive bitrate concepts.",
    githubUrl: "https://github.com/rahulkbharti/m3u8-video-streaming",
  },
  {
    id: 4,
    slug: "library-management-system",
    title: "library-management-system",
    category: "fullstack",
    overview:
      "Full-stack LMS with student and librarian portals, book tracking, and return reminders.",
    stack: ["Node.js", "React.js", "MariaDB", "Express", "JavaScript"],
    problem:
      "Manual library management leads to lost records, missed returns, and no visibility for students on book availability.",
    solution:
      "Separate portals let students browse, borrow, and view reminders while librarians manage inventory, transactions, and reports.",
    architecture:
      "React frontend -> Express REST API -> MariaDB (transactions + book catalog + users)",
    keyLearnings:
      "Role-based portal design, transaction management, SQL joins for reports, and reminder scheduling with Node cron.",
    githubUrl: "https://github.com/rahulkbharti",
  },
  {
    id: 5,
    slug: "nexus-core-frontend",
    title: "nexus-core-frontend",
    category: "frontend",
    overview:
      "Enterprise-grade Library ERP frontend with a multi-tenant UI, RBAC, dashboards, and seat booking.",
    stack: ["TypeScript", "Next.js", "TailwindCSS", "React", "Prisma"],
    problem:
      "A multi-tenant SaaS product needs a UI that adapts per tenant with different branding, user roles, and feature access.",
    solution:
      "Next.js App Router uses tenant-aware layouts and middleware to render the correct role-based UI from a shared component library.",
    architecture:
      "Next.js App Router -> Tenant Middleware -> Role-based Layout -> Shared UI Components -> API layer",
    keyLearnings:
      "Next.js App Router patterns, dynamic tenant theming, RBAC-driven component rendering, and TypeScript strict mode.",
    githubUrl: "https://github.com/rahulkbharti/nexus-core-frontend",
  },
  {
    id: 6,
    slug: "streamlet-frontend",
    title: "streamlet-frontend",
    category: "frontend",
    overview:
      "Modern video platform UI for uploading, browsing, and streaming with an HLS adaptive player.",
    stack: ["TypeScript", "Next.js", "TailwindCSS", "Video.js", "HLS.js"],
    problem:
      "Video platforms need a responsive UI that handles large media content without blocking the main thread.",
    solution:
      "Next.js lazy-loads video components, HLS.js handles adaptive streaming, and the upload flow reports backend transcoding progress.",
    architecture:
      "Next.js pages -> HLS.js player component -> REST API (upload + stream) -> WebSocket progress updates",
    keyLearnings:
      "HLS.js integration, lazy loading for media-heavy pages, upload progress UX, and TypeScript generics for API responses.",
    githubUrl: "https://github.com/rahulkbharti/streamlet-frontend",
  },
  {
    id: 7,
    slug: "portfolio",
    title: "rahulkbharti (Portfolio)",
    category: "frontend",
    overview:
      "Personal developer portfolio hosted on GitHub Pages with project showcases and case studies.",
    stack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    problem:
      "A developer needs a single place to showcase projects, skills, and contact information without paying for hosting.",
    solution:
      "A lightweight static site with fast load times, deployed directly through GitHub Pages with links to live demos and case studies.",
    architecture: "Static HTML/CSS/JS -> GitHub Pages CDN",
    keyLearnings:
      "Static site architecture, GitHub Pages deployment, CSS grid and flexbox layouts, and performance-first design.",
    githubUrl: "https://github.com/rahulkbharti/rahulkbharti",
    liveUrl: "https://rahulkbharti.github.io/rahulkbharti",
  },
  {
    id: 8,
    slug: "mesh-talk",
    title: "mesh-talk",
    category: "realtime",
    overview:
      "P2P video calling and real-time messaging with direct browser-to-browser media.",
    stack: ["WebRTC", "Socket.io", "Node.js", "Express", "React", "MERN"],
    problem:
      "Most video call apps route streams through a media server, adding latency and cost even when two users can connect directly.",
    solution:
      "WebRTC enables direct media streams while Socket.io handles only SDP offer and answer signaling. STUN servers assist NAT traversal.",
    architecture:
      "User A Browser -> Socket.io Signaling Server -> User B Browser -> WebRTC P2P media stream (direct)",
    keyLearnings:
      "WebRTC offer and answer flow, ICE candidate gathering, STUN versus TURN servers, and Socket.io signaling.",
    featured: true,
    images: [
      "/rahulkbharti/projects/mesh-talk.png",
      "/rahulkbharti/projects/mesh-talk3.png",
      "/rahulkbharti/projects/mesh-talk4.png",
    ],
    githubUrl: "https://github.com/rahulkbharti/mesh-talk",
    liveUrl: "https://rahulkbharti.github.io/mesh-talk/",
  },
  {
    id: 9,
    slug: "real-time-video-chat",
    title: "real-time-video-chat",
    category: "realtime",
    overview:
      "Peer-to-peer video chat app using WebRTC and Google STUN servers for NAT traversal.",
    stack: ["WebRTC", "JavaScript", "HTML5", "CSS3", "Node.js"],
    problem:
      "The project explores how browser-native real-time communication works without a third-party video SDK.",
    solution:
      "Raw WebRTC APIs use getUserMedia for camera and microphone access, RTCPeerConnection for streams, and Google STUN servers for NAT traversal.",
    architecture:
      "Browser getUserMedia -> RTCPeerConnection -> Google STUN -> P2P media stream",
    keyLearnings:
      "Raw WebRTC APIs, getUserMedia constraints, NAT traversal concepts, and browser compatibility handling.",
    githubUrl: "https://github.com/rahulkbharti/real-time-video-chat",
  },
  {
    id: 10,
    slug: "ai-career-assistant",
    title: "ai-career-assistant",
    category: "ai",
    overview:
      "LLM-powered resume tailoring that matches and rewrites resume sections against job descriptions.",
    stack: [
      "TypeScript",
      "Next.js",
      "Gemini API",
      "PostgreSQL",
      "Prisma",
      "TailwindCSS",
    ],
    problem:
      "Job seekers send the same generic resume everywhere, and ATS systems filter them out when keywords do not match the job description.",
    solution:
      "Gemini analyzes the job description and resume, suggests targeted rewrites per section, and supports multiple role-specific resume versions.",
    architecture:
      "Next.js UI -> API routes -> Gemini API (job description + resume prompt) -> diff suggestions -> PostgreSQL",
    keyLearnings:
      "Prompt engineering for structured output, LLM-based document comparison, multi-version state management, and Prisma schema design.",
    githubUrl: "https://github.com/rahulkbharti/ai-career-assistant",
  },
  {
    id: 11,
    slug: "nutrition-advisor",
    title: "nutrition-advisor",
    category: "ai",
    overview:
      "Generative AI nutrition advisor that creates personalized meal and diet plans.",
    stack: ["Python", "Streamlit", "Google GenAI", "Gemini API"],
    problem:
      "Generic nutrition advice does not account for individual health goals, allergies, or dietary restrictions.",
    solution:
      "Users provide health goals and dietary preferences, and Gemini generates a context-aware nutrition plan with meals and macro breakdowns.",
    architecture:
      "Streamlit UI -> Python handler -> Google GenAI API (structured prompt) -> formatted nutrition plan",
    keyLearnings:
      "Prompt engineering for structured dietary output, Google GenAI SDK, Streamlit rapid prototyping, and API key management.",
    githubUrl: "https://github.com/rahulkbharti/nutrition-advisor",
  },
  {
    id: 12,
    slug: "college-chatbot-gemini",
    title: "college-chatbot (Gemini)",
    category: "ai",
    overview:
      "Gemini-powered college assistant for academic queries, course information, and event updates.",
    stack: ["Python", "Gemini API", "FastAPI", "NLP"],
    problem:
      "Students repeatedly ask the same questions about schedules, courses, and events, consuming significant admin time.",
    solution:
      "Gemini receives a custom system prompt with college-specific knowledge while FastAPI handles query routing and conversation history.",
    architecture:
      "Chat UI -> FastAPI -> Gemini API (system prompt + college context) -> structured response",
    keyLearnings:
      "System prompt engineering, domain context injection, FastAPI async request handling, and Gemini conversation history management.",
    githubUrl: "https://github.com/rahulkbharti",
  },
  {
    id: 13,
    slug: "college-chatbot-deep-learning",
    title: "college-chatbot (Deep Learning)",
    category: "ai",
    overview:
      "Custom chatbot trained from scratch with LSTM and Transformer architectures for intent classification.",
    stack: ["Python", "PyTorch", "Transformers", "LSTM", "NLP", "GPT-2"],
    problem:
      "The project explores how language models work by building an intent classification pipeline instead of only calling an API.",
    solution:
      "An LSTM intent classifier trained on a custom college Q&A dataset was upgraded to a transformer model using tokenization, embeddings, and softmax intent routing.",
    architecture:
      "User query -> Tokenizer -> LSTM/Transformer encoder -> Intent classification -> Response template mapping",
    keyLearnings:
      "LSTM sequence modeling, transformer attention, custom dataset creation, PyTorch training loops, and intent versus entity extraction.",
    githubUrl: "https://github.com/rahulkbharti",
  },
];
