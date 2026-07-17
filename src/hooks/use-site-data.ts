import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { awards, heroImages, processSteps, services, testimonials } from "@/lib/data";

const homeFallback = { heroImages, awards, services, processSteps, testimonials };

export function useHomeContent() {
  return useQuery({
    queryKey: ["home-content"],
    queryFn: () => api.get("/api/content/home"),
    initialData: homeFallback,
    staleTime: 1000 * 60 * 10,
  });
}

export function useHeroImages() {
  return useQuery({
    queryKey: ["hero-images"],
    queryFn: () => api.get("/api/content/hero-images"),
    placeholderData: { heroImages },
    staleTime: 1000 * 60 * 10,
  });
}

export function useProjectsContent() {
  return useQuery({
    queryKey: ["projects-content"],
    queryFn: () => api.get("/api/content/projects"),
    staleTime: 1000 * 60 * 10,
  });
}

export function useProjectDetail(projectId: string | undefined) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["project-detail", projectId],
    queryFn: () => api.get(`/api/projects/${projectId}`),
    enabled: Boolean(projectId),
    staleTime: 1000 * 60 * 10,
    initialData: () => {
      if (!projectId) return undefined;
      const cached = queryClient.getQueryData<{ projects: Array<{ id: string | number }> }>(["projects-content"]);
      return cached?.projects.find((project) => String(project.id) === String(projectId));
    },
  });
}

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => api.get("/api/reviews"),
    staleTime: 1000 * 60 * 10,
  });
}
