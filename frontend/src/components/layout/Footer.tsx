import React from 'react';
import { Github, Send, Mail, Code2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/JasurShermatov/',
      icon: Github,
      color: 'hover:text-primary',
    },
    {
      name: 'Telegram',
      href: 'https://t.me/jasur_shermatov',
      icon: Send,
      color: 'hover:text-accent',
    },
    {
      name: 'Email',
      href: 'mailto:shermatovjasur800@gmail.com',
      icon: Mail,
      color: 'hover:text-warning',
    },
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg gradient-text">JasurDev</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Passionate software engineer creating innovative solutions with modern technologies.
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">{t('footer.contact')}</h3>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-3 text-muted-foreground transition-colors duration-200 ${link.color} group`}
                >
                  <link.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-medium">
                    {link.name === 'GitHub' && '@JasurShermatov'}
                    {link.name === 'Telegram' && '@jasur_shermatov'}
                    {link.name === 'Email' && 'shermatovjasur800@gmail.com'}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'Python', 'Django'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-element absolute top-10 right-10 w-2 h-2 bg-primary/20 rounded-full"></div>
          <div className="floating-element absolute bottom-20 left-20 w-3 h-3 bg-accent/20 rounded-full" style={{ animationDelay: '2s' }}></div>
          <div className="floating-element absolute top-1/2 right-1/4 w-1 h-1 bg-warning/30 rounded-full" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} JasurDev. {t('footer.rights')}.
            </p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>Built with React & TypeScript</span>
              <span>•</span>
              <span>Powered by Passion</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};