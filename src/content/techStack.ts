/**
 * Content — Technology Stack
 * Aesthetix Studio
 *
 * Technologies organized by category.
 */

export interface TechCategory {
  name: string;
  items: string[];
}

export const techStack: TechCategory[] = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Supabase", "Firebase", "PostgreSQL"],
  },
  {
    name: "AI",
    items: ["TensorFlow.js", "Python", "OpenAI Integration", "RAG", "Computer Vision"],
  },
  {
    name: "Design",
    items: ["Figma", "Blender", "Design Systems", "Motion Design"],
  },
];
