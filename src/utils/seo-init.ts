import SEOManager from './seo-manager';

export const initializeSEO = () => {
    const seo = SEOManager.getInstance();

    if (typeof window !== 'undefined') {
        const hash = window.location.hash.replace('#', '');

        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source');
        const utmMedium = urlParams.get('utm_medium');
        const utmCampaign = urlParams.get('utm_campaign');

        if (utmSource || utmMedium || utmCampaign) {
            try {
                sessionStorage.setItem('utm_params', JSON.stringify({
                    source: utmSource,
                    medium: utmMedium,
                    campaign: utmCampaign,
                }));
            } catch (e) {
                console.warn('Could not save UTM parameters');
            }
        }

        const metaRobots = document.querySelector('meta[name="robots"]');
        if (!metaRobots) {
            seo.setMetaTag({ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' });
        }

        const metaGooglebot = document.querySelector('meta[name="googlebot"]');
        if (!metaGooglebot) {
            seo.setMetaTag({ name: 'googlebot', content: 'index, follow' });
        }

        const metaViewport = document.querySelector('meta[name="viewport"]');
        if (metaViewport) {
            metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
        }

        if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }

    return seo;
};
