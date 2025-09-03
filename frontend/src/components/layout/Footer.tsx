import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: Github, 
      url: 'https://github.com/jasurdev',
      color: 'hover:text-primary'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://linkedin.com/in/jasurdev',
      color: 'hover:text-blue-400'
    },
    { 
      name: 'Email', 
      icon: Mail, 
      url: 'mailto:admin@jasurdev.uz',
      color: 'hover:text-green-400'
    }
  ];

  return (
    <footer className="bg-secondary/50 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold gradient-text">JasurDev</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Full Stack Developer specializing in modern web technologies. 
                Building scalable applications with Python, React, and Django.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Button
                      key={link.name}
                      variant="ghost"
                      size="sm"
                      asChild
                      className={`transition-smooth ${link.color}`}
                    >
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={link.name}
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="text-muted-foreground hover:text-primary transition-smooth">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about-me" className="text-muted-foreground hover:text-primary transition-smooth">
                    About
                  </a>
                </li>
                <li>
                  <a href="/projects" className="text-muted-foreground hover:text-primary transition-smooth">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="/posts" className="text-muted-foreground hover:text-primary transition-smooth">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Contact
              </h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="mailto:admin@jasurdev.uz" 
                    className="text-muted-foreground hover:text-primary transition-smooth flex items-center"
                  >
                    admin@jasurdev.uz
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
                <li>
                  <span className="text-muted-foreground">
                    Available for freelance projects
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} JasurDev. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;