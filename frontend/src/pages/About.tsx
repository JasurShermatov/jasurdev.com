import { Button } from '@/components/ui/button';
import SkillCard from '@/components/ui/skill-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, MapPin, Calendar, Award } from 'lucide-react';
import { useAboutMe, useSkills } from '@/hooks/useApi';


const experience = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    period: "2022 - Present",
    location: "Remote",
    description: "Leading development of large-scale web applications using Django and React. Mentoring junior developers and establishing best practices for the engineering team."
  },
  {
    title: "Full Stack Developer",
    company: "Innovation Labs",
    period: "2020 - 2022",
    location: "Tashkent, UZ",
    description: "Developed and maintained multiple client projects using Python, Django, and modern frontend technologies. Improved application performance by 40% through optimization."
  },
  {
    title: "Backend Developer",
    company: "StartupHub",
    period: "2019 - 2020",
    location: "Tashkent, UZ",
    description: "Built RESTful APIs and microservices using Django REST Framework. Implemented automated testing and CI/CD pipelines."
  }
];

const achievements = [
  {
    title: "AWS Certified Developer",
    organization: "Amazon Web Services",
    year: "2023",
    icon: Award
  },
  {
    title: "Django Advanced Certification",
    organization: "Django Software Foundation",
    year: "2022",
    icon: Award
  },
  {
    title: "React Professional Certificate",
    organization: "Meta",
    year: "2021",
    icon: Award
  }
];

const About = () => {
  const { data: aboutData, isLoading: aboutLoading } = useAboutMe();
  const { data: skills, isLoading: skillsLoading } = useSkills();

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="gradient-text">JasurDev</span>
              </h1>
              {aboutLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ) : (
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {aboutData?.intro_text || "Loading about information..."}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gradient-primary">
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
                <Button size="lg" variant="outline">
                  Let's Connect
                </Button>
              </div>
            </div>
            <div className="flex justify-center animate-scale-in">
              <div className="relative">
                <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-glow">
                  {aboutLoading ? (
                    <Skeleton className="w-full h-full" />
                  ) : (
                    <img 
                      src={aboutData?.profile_image_url || "/api/placeholder/400/400"} 
                      alt="JasurDev Profile"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-glow animate-glow-pulse">
                  <span className="text-white font-bold text-lg">5+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillsLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-20 rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ))
            ) : (
              skills?.map((skill, index) => (
                <div 
                  key={skill.id}
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <SkillCard {...skill} />
                </div>
              )) || []
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              My journey in software development and the impact I've made.
            </p>
          </div>
          
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div 
                key={index}
                className="bg-card/50 rounded-lg p-8 border border-border/50 hover:border-primary/30 transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end mt-4 md:mt-0">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications & Achievements</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Continuous learning and professional development milestones.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="text-center bg-card/50 rounded-lg p-8 border border-border/50 hover:border-primary/30 transition-smooth animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
                  <achievement.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                <p className="text-muted-foreground mb-2">{achievement.organization}</p>
                <p className="text-sm text-primary font-medium">{achievement.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;