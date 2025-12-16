import { useEffect } from 'react';
import SEOManager, { SEOConfig } from '../utils/seo-manager';

const useSEO = (config: SEOConfig) => {
    useEffect(() => {
        const seoManager = SEOManager.getInstance();
        seoManager.configure(config);
    }, [config]);
};

export default useSEO;
