// API Base Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Types based on Swagger definitions
export interface AboutMe {
  intro_text: string;
  profile_image_url: string;
  resume_url: string;
}

export interface Skill {
  id: number;
  name: string;
  image_url: string;
  experience_years: number;
  proficiency: number;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  description: string;
  start_year: number;
  end_year?: number;
  link?: string;
  period: string;
}

export interface Certificate {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link?: string;
  obtained_year?: number;
}

export interface PostTag {
  id: number;
  name: string;
}

export interface PostComment {
  id: number;
  content: string;
  created_at: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  tags: PostTag[];
  likes_count: number;
  comments_count: number;
  comments: PostComment[];
  created_at: string;
  updated_at: string;
}

export interface ProjectTag {
  id: number;
  name: string;
}

export interface ProjectComment {
  id: number;
  content: string;
  created_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  github_link?: string;
  live_demo_link?: string;
  owner: number;
  tags: ProjectTag[];
  likes_count: number;
  comments_count: number;
  comments: ProjectComment[];
  created_at: string;
  updated_at: string;
}

// API Client Class
class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // About Me API
  async getAboutMe(): Promise<AboutMe> {
    return this.request<AboutMe>('/about-me/');
  }

  async getSkills(): Promise<Skill[]> {
    return this.request<Skill[]>('/about-me/skills/');
  }

  async getExperiences(): Promise<Experience[]> {
    return this.request<Experience[]>('/about-me/experiences/');
  }

  async getCertificates(): Promise<Certificate[]> {
    return this.request<Certificate[]>('/about-me/certificates/');
  }

  // Posts API
  async getPosts(): Promise<Post[]> {
    return this.request<Post[]>('/posts/');
  }

  async getPost(id: number): Promise<Post> {
    return this.request<Post>(`/posts/${id}/`);
  }

  async likePost(id: number): Promise<void> {
    await this.request(`/posts/${id}/like/`, { method: 'POST' });
  }

  async addPostComment(postId: number, content: string): Promise<PostComment> {
    return this.request<PostComment>(`/posts/${postId}/comments/`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  // Projects API
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>('/projects/');
  }

  async getProject(id: number): Promise<Project> {
    return this.request<Project>(`/projects/${id}/`);
  }

  async likeProject(id: number): Promise<void> {
    await this.request(`/projects/${id}/like/`, { method: 'POST' });
  }

  async addProjectComment(projectId: number, content: string): Promise<ProjectComment> {
    return this.request<ProjectComment>(`/projects/${projectId}/comments/`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }
}

export const apiService = new ApiService();