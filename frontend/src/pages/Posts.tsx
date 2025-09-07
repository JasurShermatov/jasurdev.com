import React, { useState, useEffect } from 'react';
import { Search, Filter, Loader } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiService, Post } from '@/services/api';
import { PostCard } from '@/components/ui/PostCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Posts: React.FC = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const postsData = await apiService.getPosts();
        setPosts(postsData);
        setFilteredPosts(postsData);
      } catch (err) {
        setError(t('common.error'));
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [t]);

  // Filter posts based on search and tags
  useEffect(() => {
    let filtered = posts;

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(post =>
        post.tags.some(tag => tag.name === selectedTag)
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedTag]);

  // Get all unique tags from posts
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags.map(tag => tag.name)))
  );

  const handleLike = (postId: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, likes_count: post.likes_count + 1 }
          : post
      )
    );
  };

  const handleCommentAdded = (postId: number) => {
    // Reload posts to get updated comment count
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, comments_count: post.comments_count + 1 }
          : post
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
            {t('posts.title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my thoughts, insights, and experiences in software development and technology.
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
                placeholder="Search posts..."
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
                <option value="">All Tags</option>
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
                  Tag: {selectedTag}
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

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground">
              {searchQuery || selectedTag 
                ? 'Try adjusting your filters or search terms.'
                : 'Posts will appear here once they are published.'
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <div key={post.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <PostCard
                  post={post}
                  onLike={handleLike}
                  onCommentAdded={handleCommentAdded}
                />
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 p-6 bg-gradient-hero rounded-2xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">{posts.length}</div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">
                {posts.reduce((sum, post) => sum + post.likes_count, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Likes</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning mb-1">{allTags.length}</div>
              <div className="text-sm text-muted-foreground">Topics Covered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};