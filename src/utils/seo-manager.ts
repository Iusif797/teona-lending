interface MetaTag {
    name?: string;
    property?: string;
    content: string;
}

interface LinkTag {
    rel: string;
    href: string;
    type?: string;
}

interface SchemaOrgData {
    '@context': string;
    '@type': string;
    [key: string]: any;
}

interface SEOConfig {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogUrl?: string;
    ogType?: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    lang?: string;
    schemaOrg?: SchemaOrgData;
}

class SEOManager {
    private static instance: SEOManager;
    private metaTags: Map<string, HTMLMetaElement> = new Map();
    private linkTags: Map<string, HTMLLinkElement> = new Map();
    private schemaScript: HTMLScriptElement | null = null;

    private constructor() { }

    static getInstance(): SEOManager {
        if (!SEOManager.instance) {
            SEOManager.instance = new SEOManager();
        }
        return SEOManager.instance;
    }

    setTitle(title: string): void {
        document.title = title;
    }

    setMetaTag(tag: MetaTag): void {
        const key = tag.name || tag.property || '';
        let metaElement = this.metaTags.get(key);

        if (!metaElement) {
            metaElement = document.createElement('meta');
            if (tag.name) metaElement.setAttribute('name', tag.name);
            if (tag.property) metaElement.setAttribute('property', tag.property);
            document.head.appendChild(metaElement);
            this.metaTags.set(key, metaElement);
        }

        metaElement.setAttribute('content', tag.content);
    }

    setLinkTag(tag: LinkTag): void {
        let linkElement = this.linkTags.get(tag.rel);

        if (!linkElement) {
            linkElement = document.createElement('link');
            linkElement.setAttribute('rel', tag.rel);
            if (tag.type) linkElement.setAttribute('type', tag.type);
            document.head.appendChild(linkElement);
            this.linkTags.set(tag.rel, linkElement);
        }

        linkElement.setAttribute('href', tag.href);
    }

    setCanonical(url: string): void {
        this.setLinkTag({ rel: 'canonical', href: url });
    }

    setLanguage(lang: string): void {
        document.documentElement.lang = lang;
    }

    setSchemaOrg(data: SchemaOrgData): void {
        if (this.schemaScript) {
            this.schemaScript.remove();
        }

        this.schemaScript = document.createElement('script');
        this.schemaScript.type = 'application/ld+json';
        this.schemaScript.textContent = JSON.stringify(data);
        document.head.appendChild(this.schemaScript);
    }

    configure(config: SEOConfig): void {
        if (config.title) {
            this.setTitle(config.title);
        }

        if (config.description) {
            this.setMetaTag({ name: 'description', content: config.description });
        }

        if (config.keywords) {
            this.setMetaTag({ name: 'keywords', content: config.keywords });
        }

        if (config.canonical) {
            this.setCanonical(config.canonical);
        }

        if (config.ogTitle) {
            this.setMetaTag({ property: 'og:title', content: config.ogTitle });
        }

        if (config.ogDescription) {
            this.setMetaTag({ property: 'og:description', content: config.ogDescription });
        }

        if (config.ogImage) {
            this.setMetaTag({ property: 'og:image', content: config.ogImage });
        }

        if (config.ogUrl) {
            this.setMetaTag({ property: 'og:url', content: config.ogUrl });
        }

        if (config.ogType) {
            this.setMetaTag({ property: 'og:type', content: config.ogType });
        }

        if (config.twitterCard) {
            this.setMetaTag({ name: 'twitter:card', content: config.twitterCard });
        }

        if (config.twitterTitle) {
            this.setMetaTag({ name: 'twitter:title', content: config.twitterTitle });
        }

        if (config.twitterDescription) {
            this.setMetaTag({ name: 'twitter:description', content: config.twitterDescription });
        }

        if (config.twitterImage) {
            this.setMetaTag({ name: 'twitter:image', content: config.twitterImage });
        }

        if (config.lang) {
            this.setLanguage(config.lang);
        }

        if (config.schemaOrg) {
            this.setSchemaOrg(config.schemaOrg);
        }
    }

    removeMetaTag(key: string): void {
        const metaElement = this.metaTags.get(key);
        if (metaElement) {
            metaElement.remove();
            this.metaTags.delete(key);
        }
    }

    removeLinkTag(rel: string): void {
        const linkElement = this.linkTags.get(rel);
        if (linkElement) {
            linkElement.remove();
            this.linkTags.delete(rel);
        }
    }

    reset(): void {
        this.metaTags.forEach(meta => meta.remove());
        this.linkTags.forEach(link => link.remove());
        this.metaTags.clear();
        this.linkTags.clear();

        if (this.schemaScript) {
            this.schemaScript.remove();
            this.schemaScript = null;
        }
    }
}

export default SEOManager;
export type { SEOConfig, MetaTag, LinkTag, SchemaOrgData };
