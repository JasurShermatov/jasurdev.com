import React, { useState } from 'react';
import { Calendar, Heart, MessageSquare, Tag, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Post, apiService } from '@/services/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  onCommentAdded: (postId: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onCommentAdded }) => {
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
      await apiService.likePost(post.id);
      onLike(post.id);
    } catch (error) {
      console.error('Failed to like post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim() || isSubmittingComment) return;
    
    setIsSubmittingComment(true);
    try {
      await apiService.addPostComment(post.id, comment.trim());
      setComment('');
      setIsCommenting(false);
      onCommentAdded(post.id);
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const truncatedContent = post.content.length > 200 
    ? post.content.substring(0, 200) + '...' 
    : post.content;

  return (
    <Card className="group animate-fade-in hover:shadow-strong transition-all duration-300">
      {/* Post Image */}
      {post.image && (
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-muted-foreground space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.created_at)}</span>
          </div>
          
          {/* Tags */}
          <div className="flex gap-1">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag.name}
              </Badge>
            ))}
            {post.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}>
          {post.title}
        </h2>

        {/* Content */}
        <div className="text-muted-foreground leading-relaxed mb-4">
          <p>{isExpanded ? post.content : truncatedContent}</p>
          {post.content.length > 200 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-accent transition-colors text-sm font-medium mt-2 link-underline"
            >
              {isExpanded ? 'Show less' : t('posts.readMore')}
            </button>
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
              <span className="text-sm font-medium">{post.likes_count} {t('posts.likes')}</span>
            </button>
            
            <button
              onClick={() => setIsCommenting(!isCommenting)}
              className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-colors group"
            >
              <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">{post.comments_count} {t('posts.comments')}</span>
            </button>
          </div>

          {post.tags.length > 0 && (
            <div className="flex items-center text-muted-foreground">
              <Tag className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Comments Section */}
        {isExpanded && post.comments.length > 0 && (
          <div className="mt-6 space-y-4">
            <h4 className="font-semibold text-lg">Comments</h4>
            {post.comments.map((comment) => (
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
              placeholder={t('posts.writeComment')}
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