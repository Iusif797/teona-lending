import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import SEOManager from '../utils/seo-manager';
import { seoConfigBySection } from '../data/seo.config';

type SectionName = 'home' | 'about' | 'services' | 'courses' | 'testimonials' | 'contact';

export const useSectionSEO = (sectionName: SectionName, threshold: number = 0.5) => {
    const { ref, inView } = useInView({
        threshold,
        triggerOnce: false,
    });

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (inView && !isActive) {
            setIsActive(true);
            const seo = SEOManager.getInstance();
            const config = seoConfigBySection[sectionName];

            if (config) {
                seo.configure(config);
            }

            if (sectionName !== 'home') {
                window.history.replaceState(null, '', `#${sectionName}`);
            } else {
                window.history.replaceState(null, '', window.location.pathname);
            }
        } else if (!inView && isActive) {
            setIsActive(false);
        }
    }, [inView, sectionName, isActive]);

    return ref;
};

export const useHashSEO = () => {
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '') as SectionName;
            const seo = SEOManager.getInstance();

            const config = seoConfigBySection[hash] || seoConfigBySection.home;
            seo.configure(config);
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);
};
