import React, { useState } from 'react';
import { Calendar, Heart, MessageSquare, Tag, Github, ExternalLink, Code } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Project, apiService } from '@/services/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
  onLike: (projectId: number) => void;
  onCommentAdded: (projectId: number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onLike, onCommentAdded }) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      await apiService.likeProject(project.id);
      onLike(project.id);
    } catch (error) {
      console.error('Failed to like project:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim() || isSubmittingComment) return;
    
    setIsSubmittingComment(true);
    try {
      await apiService.addProjectComment(project.id, comment.trim());
      setComment('');
      setIsCommenting(false);
      onCommentAdded(project.id);
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const truncatedDescription = project.description.length > 150 
    ? project.description.substring(0, 150) + '...' 
    : project.description;

  return (
    <Card className="group animate-scale-in hover:shadow-strong transition-all duration-300">
      {/* Project Image */}
      {project.image && (
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Overlay Links */}
          <div className="absolute inset-0 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-background/90 hover:bg-background rounded-lg shadow-medium hover:shadow-strong transition-all duration-200"
              >
                <Github className="h-5 w-5 text-foreground" />
              </a>
            )}
            {project.live_demo_link && (
              <a
                href={project.live_demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-primary hover:bg-primary/90 rounded-lg shadow-medium hover:shadow-primary-glow transition-all duration-200"
              >
                <ExternalLink className="h-5 w-5 text-primary-foreground" />
              </a>
            )}
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-muted-foreground space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(project.created_at)}</span>
          </div>
          
          {/* Tags */}
          <div className="flex gap-1">
            {project.tags.slice(0, 2).map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-xs">
                <Code className="h-3 w-3 mr-1" />
                {tag.name}
              </Badge>
            ))}
            {project.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}>
          {project.title}
        </h2>

        {/* Description */}
        <div className="text-muted-foreground leading-relaxed mb-4">
          <p>{isExpanded ? project.description : truncatedDescription}</p>
          {project.description.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-accent transition-colors text-sm font-medium mt-2 link-underline"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Project Links */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors group"
            >
              <Github className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              {t('projects.viewCode')}
            </a>
          )}
          {project.live_demo_link && (
            <a
              href={project.live_demo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 text-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors group"
            >
              <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              {t('projects.viewDemo')}
            </a>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <Heart className={`h-5 w-5 transition-all duration-200 ${
                isLiking ? 'animate-pulse' : 'group-hover:scale-110'
              }`} />
              <span className="text-sm font-medium">{project.likes_count}</span>
            </button>
            
            <button
              onClick={() => setIsCommenting(!isCommenting)}
              className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-colors group"
            >
              <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">{project.comments_count}</span>
            </button>
          </div>

          {project.tags.length > 0 && (
            <div className="flex items-center text-muted-foreground">
              <Tag className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Comments Section */}
        {isExpanded && project.comments.length > 0 && (
          <div className="mt-6 space-y-4">
            <h4 className="font-semibold text-lg">Comments</h4>
            {project.comments.map((comment) => (
              <div key={comment.id} className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  {formatDate(comment.created_at)}
                </p>
                <p className="text-foreground">{comment.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Comment Form */}
        {isCommenting && (
          <div className="mt-6 space-y-4 p-4 bg-muted/30 rounded-lg">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this project..."
              className="w-full p-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setIsCommenting(false);
                  setComment('');
                }}
                disabled={isSubmittingComment}
              >
                {t('common.cancel')}
              </Button>
              <Button
                onClick={handleCommentSubmit}
                disabled={!comment.trim() || isSubmittingComment}
                className="btn-accent"
              >
                {isSubmittingComment ? t('common.loading') : t('common.submit')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};