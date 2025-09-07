const API_BASE_URL = 'http://localhost:8080/api';

// Types based on your API schema
export interface Tag {
  id: number;
  name: string;
}

export interface PostComment {
  id: number;
  content: string;
  created_at: string;
}

export interface ProjectComment {
  id: number;
  content: string;
  created_at: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  tags: Tag[];
  likes_count: number;
  comments_count: number;
  comments: PostComment[];
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  github_link?: string;
  live_demo_link?: string;
  owner: number;
  tags: Tag[];
  likes_count: number;
  comments_count: number;
  comments: ProjectComment[];
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: number;
  name: string;
  image_url?: string;
  experience_years: number;
  proficiency: number;
}

export interface AboutMe {
  intro_text: string;
  profile_image_url?: string;
  resume_url?: string;
}

export interface HomeData {
  hero_content?: {
    title?: string;
    subtitle?: string;
    image?: string;
  };
  latest_posts: Post[];
  latest_projects: Project[];
}

// API Service Class
class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Home page data
  async getHomeData(): Promise<HomeData> {
    return this.request<HomeData>('/home/');
  }

  // About Me data
  async getAboutMe(): Promise<AboutMe> {
    return this.request<AboutMe>('/about-me/');
  }

  // Skills data
  async getSkills(): Promise<Skill[]> {
    return this.request<Skill[]>('/about-me/skills/');
  }

  // Posts
  async getPosts(): Promise<Post[]> {
    return this.request<Post[]>('/posts/');
  }

  async getPost(id: number): Promise<Post> {
    return this.request<Post>(`/posts/${id}/`);
  }

  async likePost(id: number): Promise<void> {
    return this.request<void>(`/posts/${id}/like/`, {
      method: 'POST',
    });
  }

  async addPostComment(id: number, content: string): Promise<PostComment> {
    return this.request<PostComment>(`/posts/${id}/comments/`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>('/projects/');
  }

  async getProject(id: number): Promise<Project> {
    return this.request<Project>(`/projects/${id}/`);
  }

  async likeProject(id: number): Promise<void> {
    return this.request<void>(`/projects/${id}/like/`, {
      method: 'POST',
    });
  }

  async addProjectComment(id: number, content: string): Promise<ProjectComment> {
    return this.request<ProjectComment>(`/projects/${id}/comments/`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }
}

export const apiService = new ApiService();