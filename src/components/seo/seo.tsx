import { useEffect } from 'react';
import SEOManager, { SEOConfig } from '../../utils/seo-manager';

interface SEOProps extends SEOConfig {
    children?: never;
}

const SEO: React.FC<SEOProps> = (props) => {
    useEffect(() => {
        const seoManager = SEOManager.getInstance();
        seoManager.configure(props);

        return () => {
            // Cleanup при размонтировании не требуется
        };
    }, [props]);

    return null;
};

export default SEO;
