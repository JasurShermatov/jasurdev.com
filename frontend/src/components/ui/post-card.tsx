import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Calendar } from "lucide-react";

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  tags: Array<{ id: number; name: string }>;
  likes_count: number;
  comments_count: number;
  created_at: string;
}

const PostCard = ({ 
  title, 
  content, 
  image, 
  tags,
  likes_count,
  comments_count,
  created_at
}: PostCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="group h-full bg-card/50 border-border/50 hover:border-primary/30 transition-smooth hover:shadow-card cursor-pointer">
      <CardHeader className="p-0">
        {image && (
          <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            />
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-smooth line-clamp-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {content.replace(/<[^>]*>/g, '').substring(0, 150)}...
        </p>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <div className="flex justify-between items-center w-full text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{likes_count}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{comments_count}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(created_at)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;