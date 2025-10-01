// types/project.ts
export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demo?: string; // optional
  github?: string; // optional
}
