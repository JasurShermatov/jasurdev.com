import React, { useState, useEffect } from 'react';
import { Download, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiService, AboutMe, Skill, Experience, Certificate } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const About: React.FC = () => {
  const { t } = useLanguage();
  const [aboutData, setAboutData] = useState<AboutMe | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        setLoading(true);
        const [aboutMe, skillsData, experiencesData, certificatesData] = await Promise.all([
          apiService.getAboutMe(),
          apiService.getSkills(),
          apiService.getExperiences(),
          apiService.getCertificates(),
        ]);

        setAboutData(aboutMe);
        setSkills(skillsData);
        setExperiences(experiencesData);
        setCertificates(certificatesData);
      } catch (err) {
        setError(t('common.error'));
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, [t]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
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
        {/* Hero Section */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="relative animate-fade-in">
              <div className="relative">
                {aboutData?.profile_image_url && (
                  <img
                    src={aboutData.profile_image_url}
                    alt="Jasur Shermatov"
                    className="w-full max-w-md mx-auto rounded-2xl shadow-strong"
                  />
                )}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-primary rounded-2xl shadow-primary-glow animate-pulse-glow"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-accent rounded-2xl shadow-glow animate-pulse-glow"></div>
              </div>
            </div>

            {/* About Text */}
            <div className="space-y-6 animate-slide-up">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
                  About Me
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {aboutData?.intro_text || 'Loading...'}
                </p>
              </div>

              {/* Resume Download */}
              {aboutData?.resume_url && (
                <div>
                  <a href={aboutData.resume_url} target="_blank" rel="noopener noreferrer">
                    <Button className="btn-hero group">
                      <Download className="mr-2 h-5 w-5" />
                      {t('about.downloadResume')}
                    </Button>
                  </a>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-4 card-glass">
                  <div className="text-2xl font-bold text-primary mb-1">{experiences.length}</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-4 card-glass">
                  <div className="text-2xl font-bold text-accent mb-1">{certificates.length}</div>
                  <div className="text-sm text-muted-foreground">Certificates</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">{t('about.skills')}</h2>
            <p className="text-muted-foreground">Technologies and tools I work with</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card key={skill.id} className="p-6 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center space-x-4 mb-4">
                  {skill.image_url && (
                    <img
                      src={skill.image_url}
                      alt={skill.name}
                      className="w-12 h-12 rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {skill.experience_years} years experience
                    </p>
                  </div>
                </div>
                
                {/* Proficiency Bar */}
                <div className="skill-progress">
                  <div 
                    className="skill-progress-fill"
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-muted-foreground mt-1">
                  {skill.proficiency}%
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">{t('about.experience')}</h2>
            <p className="text-muted-foreground">My professional journey</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {experiences.map((experience, index) => (
              <div key={experience.id} className={`timeline-item animate-fade-in`} style={{ animationDelay: `${index * 0.2}s` }}>
                <Card className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-primary">{experience.title}</h3>
                      <p className="text-lg text-accent font-medium">{experience.company}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">{experience.period}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {experience.description}
                  </p>

                  {experience.link && (
                    <a 
                      href={experience.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-accent transition-colors link-underline"
                    >
                      View Company
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">{t('about.certificates')}</h2>
            <p className="text-muted-foreground">Achievements and certifications</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate, index) => (
              <Card key={certificate.id} className="p-6 group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                          {certificate.image_url && (
            <div className="mb-4 overflow-hidden rounded-lg">
              <img
                src={certificate.image_url}
                alt={certificate.title}
                  className="w-full max-h-[220px] aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-300"              />
            </div>
          )}
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {certificate.title}
                  </h3>
                  
                  {certificate.description && (
                    <p className="text-muted-foreground text-sm">
                      {certificate.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    {certificate.obtained_year && (
                      <span className="text-muted-foreground">
                        {certificate.obtained_year}
                      </span>
                    )}
                    
                    {certificate.link && (
                      <a
                        href={certificate.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-accent transition-colors link-underline"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};