export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO date
  tags: string[];
  excerpt: string;
  content: string; // simple multi-line string, rendered with pre-line
  likes: number; // baseline likes
  coverImage?: string;
}

export const POSTS: Post[] = [
  {
    id: "1",
    slug: "building-a-portfolio",
    title: "Building a Developer Portfolio: What Matters",
    date: "2025-10-15",
    tags: ["Portfolio", "Career", "Design"],
    excerpt:
      "What makes a portfolio stand out? Practical projects, clean presentation, and a clear story about your impact.",
    content:
      "" +
      "A great portfolio does three things:\n\n" +
      "1) Shows relevant, real projects with code and demos.\n" +
      "2) Communicates your role and impact—what decisions you made and why.\n" +
      "3) Is fast, responsive, and accessible.\n\n" +
      "Tips:\n" +
      "- Keep it simple and focused on value.\n" +
      "- Use case studies: problem → approach → result.\n" +
      "- Add tests, docs, and CI where possible—signals professionalism.",
    likes: 12,
    coverImage: "/rahulkbharti/projects/mesh-talk.png",
  },
  {
    id: "2",
    slug: "react-performance-tips",
    title: "React Performance Tips You Can Use Today",
    date: "2025-11-01",
    tags: ["React", "Performance", "Frontend"],
    excerpt:
      "From memoization to virtualization—small tweaks that have big impact on app responsiveness.",
    content:
      "Focus on real bottlenecks first. A few tactics that often pay off:\n\n" +
      "- Avoid unnecessary re-renders with memo, useMemo, and useCallback (but measure!).\n" +
      "- Virtualize long lists with react-window or react-virtual.\n" +
      "- Split bundles with dynamic imports.\n" +
      "- Use the React Profiler to find hot paths.",
    likes: 30,
    coverImage: "/rahulkbharti/projects/mesh-talk.png",
  },
];
