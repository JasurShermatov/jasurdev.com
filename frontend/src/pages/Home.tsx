import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Database, Globe, Zap, Terminal, Cpu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts = [
    'Software Engineer',
    'Backend Developer',
    'Problem Solver',
    'Tech Enthusiast'
  ];

  // Typing animation effect
  useEffect(() => {
    const currentText = texts[currentTextIndex];
    let timeoutId: NodeJS.Timeout;

    if (typedText.length < currentText.length) {
      timeoutId = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length + 1));
      }, 100);
    } else {
      timeoutId = setTimeout(() => {
        if (typedText.length === 0) {
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        } else {
          setTypedText(currentText.slice(0, typedText.length - 1));
        }
      }, typedText.length === currentText.length ? 2000 : 50);
    }

    return () => clearTimeout(timeoutId);
  }, [typedText, currentTextIndex]);

  const features = [
    { 
      icon: Code, 
      title: 'Clean Code',
      description: 'Writing maintainable, scalable solutions',
      delay: '0s'
    },
    { 
      icon: Database, 
      title: 'Backend Systems',
      description: 'Robust APIs and database architecture',
      delay: '0.2s'
    },
    { 
      icon: Globe, 
      title: 'Web Applications',
      description: 'Modern, responsive user experiences',
      delay: '0.4s'
    },
    { 
      icon: Zap, 
      title: 'Performance',
      description: 'Optimized for speed and efficiency',
      delay: '0.6s'
    },
  ];

  const techStats = [
    { label: 'Years of Experience', value: '2+', icon: Terminal },
    { label: 'Projects Completed', value: '10+', icon: Code },
    { label: 'Technologies', value: '15+', icon: Cpu },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 right-20 w-4 h-4 bg-primary/10 rounded-full"></div>
        <div className="floating-element absolute bottom-32 left-16 w-6 h-6 bg-accent/10 rounded-full" style={{ animationDelay: '2s' }}></div>
        <div className="floating-element absolute top-1/2 right-1/3 w-3 h-3 bg-warning/10 rounded-full" style={{ animationDelay: '4s' }}></div>
        <div className="floating-element absolute bottom-20 right-40 w-2 h-2 bg-success/10 rounded-full" style={{ animationDelay: '6s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <p className="text-accent font-medium text-lg tracking-wide">
                  Hello, I'm Jasur Shermatov
                </p>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="gradient-text min-h-[1.2em] block">
                    {typedText}
                    <span className="animate-pulse">|</span>
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  {t('home.hero.subtitle')} - Creating innovative solutions with cutting-edge technologies.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/projects">
                  <Button className="btn-hero group">
                    {t('home.cta.viewWork')}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <a href="mailto:shermatovjasur800@gmail.com">
                  <Button variant="outline" className="btn-ghost">
                    {t('home.cta.contact')}
                  </Button>
                </a>
              </div>

              {/* Tech Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {techStats.map((stat, index) => (
                  <div key={stat.label} className="text-center space-y-2" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg shadow-glow">
                      <stat.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Content */}
            <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                {/* Main Card */}
                <div className="card-glass p-8 space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  </div>
                  
                  <div className="space-y-3 font-mono text-sm">
                    <div className="text-muted-foreground">// Building innovative solutions</div>
                    <div className="text-accent">const developer = &#123;</div>
                    <div className="pl-4 space-y-1">
                      <div><span className="text-primary">name:</span> <span className="text-success">'Jasur Shermatov'</span>,</div>
                      <div><span className="text-primary">role:</span> <span className="text-success">'Full Stack Developer'</span>,</div>
                      <div><span className="text-primary">passion:</span> <span className="text-success">'Clean Code & Innovation'</span>,</div>
                      <div><span className="text-primary">location:</span> <span className="text-success">'Uzbekistan'</span></div>
                    </div>
                    <div className="text-accent">&#125;;</div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-primary rounded-2xl shadow-primary-glow animate-pulse-glow"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-accent rounded-2xl shadow-glow animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 gradient-text">
              What I Do Best
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Transforming ideas into powerful digital solutions with modern technologies and best practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="card-elevated p-6 text-center group animate-fade-in"
                style={{ animationDelay: feature.delay }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl mb-4 group-hover:shadow-glow transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Console Output Section */}
      <section className="py-16 bg-gradient-hero relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="card-glass p-8 font-mono">
              <div className="flex items-center space-x-2 mb-6">
                <Terminal className="h-5 w-5 text-accent" />
                <span className="text-accent font-semibold">jasur@dev:~$</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="text-muted-foreground">
                  <span className="text-success">✓</span> Initializing development environment...
                </div>
                <div className="text-muted-foreground">
                  <span className="text-success">✓</span> Loading creative mindset...
                </div>
                <div className="text-muted-foreground">
                  <span className="text-success">✓</span> Establishing connection to innovation...
                </div>
                <div className="text-accent animate-pulse">
                  <span className="text-warning">⚡</span> Ready to build the future!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};