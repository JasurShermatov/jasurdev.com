import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Heart, MessageCircle } from "lucide-react";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image?: string;
  github_link?: string;
  live_demo_link?: string;
  tags: Array<{ id: number; name: string }>;
  likes_count: number;
  comments_count: number;
  created_at: string;
}

const ProjectCard = ({ 
  title, 
  description, 
  image, 
  github_link, 
  live_demo_link, 
  tags,
  likes_count,
  comments_count
}: ProjectCardProps) => {
  return (
    <Card className="group h-full bg-card/50 border-border/50 hover:border-primary/30 transition-smooth hover:shadow-card">
      <CardHeader className="p-0">
        <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary/50">{title.charAt(0)}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-smooth">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag.id} variant="secondary" className="text-xs">
              {tag.name}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <span>{likes_count}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>{comments_count}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex space-x-2">
        {github_link && (
          <Button variant="outline" size="sm" asChild className="flex-1">
            <a href={github_link} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              Code
            </a>
          </Button>
        )}
        {live_demo_link && (
          <Button variant="default" size="sm" asChild className="flex-1">
            <a href={live_demo_link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;