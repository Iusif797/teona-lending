# SEO Manager

Профессиональная система управления SEO для React приложения.

## Структура

```
src/
├── utils/
│   └── SEOManager.ts          # Singleton класс для управления meta-тегами
├── components/
│   └── SEO/
│       ├── SEO.tsx            # React компонент для декларативного SEO
│       └── index.ts           # Экспорты
├── hooks/
│   └── useSEO.ts              # React hook для императивного SEO
└── data/
    └── seo.config.ts          # Конфигурации SEO для разных секций
```

## Использование

### 1. SEOManager (Класс)

```typescript
import SEOManager from '@/utils/SEOManager';

const seo = SEOManager.getInstance();

// Установка заголовка
seo.setTitle('Мой заголовок');

// Установка meta-тегов
seo.setMetaTag({ 
  name: 'description', 
  content: 'Описание страницы' 
});

// Установка canonical URL
seo.setCanonical('https://example.com/page');

// Установка Schema.org
seo.setSchemaOrg({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Моя компания'
});

// Полная конфигурация
seo.configure({
  title: 'Заголовок',
  description: 'Описание',
  keywords: 'ключевые, слова',
  canonical: 'https://example.com',
  ogTitle: 'OG заголовок',
  ogImage: 'https://example.com/image.jpg',
  schemaOrg: { ... }
});
```

### 2. SEO Компонент (Декларативный)

```typescript
import SEO from '@/components/SEO';

function MyPage() {
  return (
    <>
      <SEO
        title="Заголовок страницы"
        description="Описание страницы"
        ogImage="https://example.com/image.jpg"
        canonical="https://example.com/page"
      />
      <div>Контент страницы</div>
    </>
  );
}
```

### 3. useSEO Hook (Императивный)

```typescript
import useSEO from '@/hooks/useSEO';

function MyComponent() {
  useSEO({
    title: 'Заголовок',
    description: 'Описание',
    keywords: 'ключевые слова'
  });

  return <div>Контент</div>;
}
```

### 4. Предустановленные конфигурации

```typescript
import { defaultSEOConfig, seoConfigBySection } from '@/data/seo.config';
import SEO from '@/components/SEO';

function AboutPage() {
  return (
    <>
      <SEO {...seoConfigBySection.about} />
      <div>О нас</div>
    </>
  );
}
```

## API

### SEOConfig

```typescript
interface SEOConfig {
  title?: string;                    // Заголовок страницы
  description?: string;              // Meta description
  keywords?: string;                 // Meta keywords
  canonical?: string;                // Canonical URL
  ogTitle?: string;                  // Open Graph title
  ogDescription?: string;            // Open Graph description
  ogImage?: string;                  // Open Graph image
  ogUrl?: string;                    // Open Graph URL
  ogType?: string;                   // Open Graph type
  twitterCard?: string;              // Twitter card type
  twitterTitle?: string;             // Twitter title
  twitterDescription?: string;       // Twitter description
  twitterImage?: string;             // Twitter image
  lang?: string;                     // Язык документа
  schemaOrg?: SchemaOrgData;        // Структурированные данные
}
```

### Методы SEOManager

- `setTitle(title: string)` - Установить заголовок
- `setMetaTag(tag: MetaTag)` - Установить meta-тег
- `setLinkTag(tag: LinkTag)` - Установить link-тег
- `setCanonical(url: string)` - Установить canonical URL
- `setLanguage(lang: string)` - Установить язык
- `setSchemaOrg(data: SchemaOrgData)` - Установить Schema.org
- `configure(config: SEOConfig)` - Полная конфигурация
- `removeMetaTag(key: string)` - Удалить meta-тег
- `removeLinkTag(rel: string)` - Удалить link-тег
- `reset()` - Сбросить все изменения

## Примеры интеграции

### С роутером

```typescript
import { useLocation } from 'react-router-dom';
import { seoConfigBySection } from '@/data/seo.config';
import useSEO from '@/hooks/useSEO';

function App() {
  const location = useLocation();
  
  useSEO(seoConfigBySection[location.pathname] || defaultSEOConfig);
  
  return <Router>...</Router>;
}
```

### С мультиязычностью

```typescript
import { useTranslation } from 'react-i18next';
import useSEO from '@/hooks/useSEO';

function Page() {
  const { t, i18n } = useTranslation();
  
  useSEO({
    title: t('page.title'),
    description: t('page.description'),
    lang: i18n.language
  });
  
  return <div>{t('content')}</div>;
}
```

## Особенности

- **Singleton паттерн** - единый экземпляр для всего приложения
- **Type-safe** - полная типизация TypeScript
- **Динамическое обновление** - изменения применяются мгновенно
- **Очистка** - автоматическое управление памятью
- **Schema.org** - поддержка структурированных данных
- **Open Graph** - оптимизация для социальных сетей
- **Twitter Cards** - специальная разметка для Twitter
