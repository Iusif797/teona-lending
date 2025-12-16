import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SEOManager from '../../utils/seo-manager';
import { SEOConfig } from '../../utils/seo-manager';

interface DynamicSEOProps {
    config: SEOConfig;
    sectionId: string;
    threshold?: number;
    children: React.ReactNode;
}

const DynamicSEO: React.FC<DynamicSEOProps> = ({
    config,
    sectionId,
    threshold = 0.3,
    children
}) => {
    const { ref, inView } = useInView({
        threshold,
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView) {
            const seo = SEOManager.getInstance();
            seo.configure(config);

            if (sectionId && sectionId !== 'home') {
                window.history.replaceState(null, '', `#${sectionId}`);
            } else if (sectionId === 'home') {
                window.history.replaceState(null, '', window.location.pathname);
            }
        }
    }, [inView, config, sectionId]);

    return <div ref={ref}>{children}</div>;
};

export default DynamicSEO;
