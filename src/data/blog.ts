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
    slug: "neural-network-backpropagation",
    title:
      "Understanding Neural Network Backpropagation: A Mathematical Perspective",
    date: "2025-10-15",
    tags: ["Neural Networks", "Backpropagation", "Machine Learning"],
    excerpt:
      "A deep dive into the mathematical foundations of backpropagation in neural networks.",
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
    coverImage: "/rahulkbharti/blogs/Neural Network Original.png",
  },
];
