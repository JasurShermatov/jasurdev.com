import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SkillCardProps {
  id: number;
  name: string;
  image_url?: string;
  experience_years: number;
  proficiency: number;
}

const SkillCard = ({ 
  name, 
  image_url, 
  experience_years, 
  proficiency 
}: SkillCardProps) => {
  return (
    <Card className="group bg-card/50 border-border/50 hover:border-primary/30 transition-smooth hover:shadow-card">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          {image_url ? (
            <img 
              src={image_url} 
              alt={name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">
                {name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold group-hover:text-primary transition-smooth">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {experience_years} year{experience_years !== 1 ? 's' : ''} experience
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Proficiency</span>
            <span className="font-medium">{proficiency}%</span>
          </div>
          <Progress 
            value={proficiency} 
            className="h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;