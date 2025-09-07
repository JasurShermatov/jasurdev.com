import React, { useState, useEffect } from 'react';
import { Search, Filter, Loader, Github, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiService, Project } from '@/services/api';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await apiService.getProjects();
        setProjects(projectsData);
        setFilteredProjects(projectsData);
      } catch (err) {
        setError(t('common.error'));
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [t]);

  // Filter projects based on search and tags
  useEffect(() => {
    let filtered = projects;

    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(project =>
        project.tags.some(tag => tag.name === selectedTag)
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedTag]);

  // Get all unique tags from projects
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags.map(tag => tag.name)))
  );

  const handleLike = (projectId: number) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, likes_count: project.likes_count + 1 }
          : project
      )
    );
  };

  const handleCommentAdded = (projectId: number) => {
    // Reload projects to get updated comment count
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, comments_count: project.comments_count + 1 }
          : project
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-lg mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
            {t('projects.title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of projects I've built, showcasing different technologies and problem-solving approaches.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Technologies</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedTag) && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                  Search: "{searchQuery}"
                </span>
              )}
              {selectedTag && (
                <span className="px-2 py-1 bg-accent/10 text-accent rounded">
                  Tech: {selectedTag}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('');
                }}
                className="text-muted-foreground hover:text-foreground underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              {searchQuery || selectedTag 
                ? 'Try adjusting your filters or search terms.'
                : 'Projects will appear here once they are published.'
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div key={project.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <ProjectCard
                  project={project}
                  onLike={handleLike}
                  onCommentAdded={handleCommentAdded}
                />
              </div>
            ))}
          </div>
        )}

        {/* Featured Project Highlight */}
        {filteredProjects.length > 0 && !searchQuery && !selectedTag && (
          <div className="mt-16">
            <div className="bg-gradient-hero rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Open Source Contributions</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I believe in giving back to the community. Check out my contributions to open source projects and feel free to collaborate!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/JasurShermatov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View GitHub Profile
                </a>
                <Button variant="outline" className="btn-ghost">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Explore Repositories
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 p-6 bg-gradient-card rounded-2xl border border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Projects Built</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">
                {projects.reduce((sum, project) => sum + project.likes_count, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Stars</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning mb-1">{allTags.length}</div>
              <div className="text-sm text-muted-foreground">Technologies Used</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">
                {projects.filter(p => p.github_link).length}
              </div>
              <div className="text-sm text-muted-foreground">Open Source</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};