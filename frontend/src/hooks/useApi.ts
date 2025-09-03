import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, type HomeData, type AboutMe, type Skill, type Post, type Project } from '@/services/api';

// Query Keys
export const queryKeys = {
  home: ['home'] as const,
  aboutMe: ['aboutMe'] as const,
  skills: ['skills'] as const,
  posts: ['posts'] as const,
  post: (id: number) => ['post', id] as const,
  projects: ['projects'] as const,
  project: (id: number) => ['project', id] as const,
};

// Home Data Hook
export const useHomeData = () => {
  return useQuery({
    queryKey: queryKeys.home,
    queryFn: () => apiService.getHomeData(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// About Me Hooks
export const useAboutMe = () => {
  return useQuery({
    queryKey: queryKeys.aboutMe,
    queryFn: () => apiService.getAboutMe(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: queryKeys.skills,
    queryFn: () => apiService.getSkills(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Posts Hooks
export const usePosts = () => {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: () => apiService.getPosts(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => apiService.getPost(id),
    enabled: !!id,
  });
};

// Projects Hooks
export const useProjects = () => {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: () => apiService.getProjects(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useProject = (id: number) => {
  return useQuery({
    queryKey: queryKeys.project(id),
    queryFn: () => apiService.getProject(id),
    enabled: !!id,
  });
};

// Mutation Hooks
export const useLikePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (postId: number) => apiService.likePost(postId),
    onSuccess: () => {
      // Invalidate and refetch posts data
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      queryClient.invalidateQueries({ queryKey: queryKeys.home });
    },
  });
};

export const useLikeProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (projectId: number) => apiService.likeProject(projectId),
    onSuccess: () => {
      // Invalidate and refetch projects data
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
      queryClient.invalidateQueries({ queryKey: queryKeys.home });
    },
  });
};

export const useAddPostComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ postId, content }: { postId: number; content: string }) => 
      apiService.addPostComment(postId, content),
    onSuccess: (_, variables) => {
      // Invalidate and refetch specific post and posts list
      queryClient.invalidateQueries({ queryKey: queryKeys.post(variables.postId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });
};

export const useAddProjectComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ projectId, content }: { projectId: number; content: string }) => 
      apiService.addProjectComment(projectId, content),
    onSuccess: (_, variables) => {
      // Invalidate and refetch specific project and projects list
      queryClient.invalidateQueries({ queryKey: queryKeys.project(variables.projectId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
};