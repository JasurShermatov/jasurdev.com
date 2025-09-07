import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'ru' | 'uz';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', ru: 'Главная', uz: 'Bosh sahifa' },
  'nav.about': { en: 'About', ru: 'О себе', uz: 'Men haqimda' },
  'nav.posts': { en: 'Posts', ru: 'Посты', uz: 'Postlar' },
  'nav.projects': { en: 'Projects', ru: 'Проекты', uz: 'Loyihalar' },
  
  // Home Page
  'home.hero.title': { en: 'Software Engineer', ru: 'Программист', uz: 'Dasturchi' },
  'home.hero.subtitle': { en: 'Building the future with code', ru: 'Создаю будущее с помощью кода', uz: 'Kod bilan kelajakni quramiz' },
  'home.cta.viewWork': { en: 'View My Work', ru: 'Посмотреть работы', uz: 'Ishlarimni korish' },
  'home.cta.contact': { en: 'Get in Touch', ru: 'Связаться', uz: 'Bog\'lanish' },
  
  // About Page
  'about.skills': { en: 'Skills', ru: 'Навыки', uz: 'Koʻnikmalar' },
  'about.experience': { en: 'Experience', ru: 'Опыт', uz: 'Tajriba' },
  'about.certificates': { en: 'Certificates', ru: 'Сертификаты', uz: 'Sertifikatlar' },
  'about.downloadResume': { en: 'Download Resume', ru: 'Скачать резюме', uz: 'Rezyumeni yuklab olish' },
  
  // Posts
  'posts.title': { en: 'Blog Posts', ru: 'Блог посты', uz: 'Blog postlari' },
  'posts.readMore': { en: 'Read More', ru: 'Читать далее', uz: 'Davomini oʻqish' },
  'posts.likes': { en: 'likes', ru: 'лайков', uz: 'yoqtirish' },
  'posts.comments': { en: 'comments', ru: 'комментариев', uz: 'izohlar' },
  'posts.addComment': { en: 'Add Comment', ru: 'Добавить комментарий', uz: 'Izoh qoʻshish' },
  'posts.writeComment': { en: 'Write your comment...', ru: 'Напишите комментарий...', uz: 'Izohingizni yozing...' },
  
  // Projects
  'projects.title': { en: 'My Projects', ru: 'Мои проекты', uz: 'Mening loyihalarim' },
  'projects.viewDemo': { en: 'Live Demo', ru: 'Демо', uz: 'Jonli demo' },
  'projects.viewCode': { en: 'View Code', ru: 'Посмотреть код', uz: 'Kodni korish' },
  
  // Common
  'common.loading': { en: 'Loading...', ru: 'Загрузка...', uz: 'Yuklanmoqda...' },
  'common.error': { en: 'Error loading data', ru: 'Ошибка загрузки', uz: 'Ma\'lumotlarni yuklashda xatolik' },
  'common.like': { en: 'Like', ru: 'Лайк', uz: 'Yoqtirish' },
  'common.submit': { en: 'Submit', ru: 'Отправить', uz: 'Yuborish' },
  'common.cancel': { en: 'Cancel', ru: 'Отмена', uz: 'Bekor qilish' },
  
  // Footer
  'footer.contact': { en: 'Contact', ru: 'Контакты', uz: 'Aloqa' },
  'footer.rights': { en: 'All rights reserved', ru: 'Все права защищены', uz: 'Barcha huquqlar himoyalangan' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'en';
  });

  React.useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};