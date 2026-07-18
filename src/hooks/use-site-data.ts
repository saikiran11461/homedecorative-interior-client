import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { awards, heroImages, processSteps, services, testimonials } from "@/lib/data";

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  client: string;
  img: string;
  video: string;
  description: string;
  galleryImages: string[];
  status: string;
  featured: boolean;
}

export interface ProjectsContent {
  categories: string[];
  projects: Project[];
}

export interface Review {
  id?: string | number;
  name: string;
  text: string;
  stars: number;
  city?: string;
  type?: string;
  img?: string;
}

const homeFallback = { heroImages, awards, services, processSteps, testimonials };

export function useHomeContent() {
  return useQuery({
    queryKey: ["home-content"],
    queryFn: () => api.get<typeof homeFallback>("/api/content/home"),
    initialData: homeFallback,
    staleTime: 1000 * 60 * 10,
  });
}

export function useHeroImages() {
  return useQuery({
    queryKey: ["hero-images"],
    queryFn: () => api.get<{ heroImages: string[] }>("/api/content/hero-images"),
    placeholderData: { heroImages },
    staleTime: 1000 * 60 * 10,
  });
}

export function useProjectsContent() {
  return useQuery({
    queryKey: ["projects-content"],
    queryFn: () => api.get<ProjectsContent>("/api/content/projects"),
    staleTime: 1000 * 60 * 10,
  });
}

export function useProjectDetail(projectId: string | undefined) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["project-detail", projectId],
    queryFn: () => api.get<Project>(`/api/projects/${projectId}`),
    enabled: Boolean(projectId),
    staleTime: 1000 * 60 * 10,
    initialData: () => {
      if (!projectId) return undefined;
      const cached = queryClient.getQueryData<ProjectsContent>(["projects-content"]);
      return cached?.projects.find((project) => String(project.id) === String(projectId));
    },
  });
}

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => api.get<Review[]>("/api/reviews"),
    staleTime: 1000 * 60 * 10,
  });
}
