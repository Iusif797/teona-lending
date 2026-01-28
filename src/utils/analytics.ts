declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    ym?: ((id: number, method: string, ...args: any[]) => void) & { a?: any[] };
  }
}

export const initGoogleAnalytics = (measurementId: string): void => {
  try {
    if (!measurementId) return;

    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: any[]) {
      window.dataLayer!.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_path: window.location.pathname,
    });
  } catch (error) {
    // Analytics initialization failed silently
  }
};

export const initYandexMetrika = (counterId: number): void => {
  try {
    if (!counterId) return;

    (function(m: any, e: any, t: string, r: number, i: any, k: any, a: any) {
      m[i] = m[i] || function() {
        (m[i].a = m[i].a || []).push(arguments);
      };
      m[i].l = 1 as any;
      k = e.createElement(t) as HTMLScriptElement;
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = `https://mc.yandex.ru/metrika/tag.js`;
      a.parentNode!.insertBefore(k, a);
      (m[i] as any).a = m[i].a || [];
      (m[i] as any).l = 1 as any;
    })(window, document, 'script', 0, 'ym');

    window.ym = window.ym || function(...args: any[]) {
      if (!window.ym) return;
      (window.ym as any).a = (window.ym as any).a || [];
      (window.ym as any).a.push(args);
    };

    (window.ym as any)(counterId, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
  } catch (error) {
    // Analytics initialization failed silently
  }
};

export const trackEvent = (eventName: string, eventParams?: Record<string, any>): void => {
  try {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }

    if (window.ym && (window.ym as any).a) {
      const ymId = (window.ym as any).a[0]?.[0];
      if (ymId) {
        window.ym(ymId, 'reachGoal', eventName, eventParams);
      }
    }
  } catch (error) {
    // Event tracking failed silently
  }
};

export const trackCTA = (ctaName: string, location: string): void => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location: location,
  });
};

export const trackFormSubmit = (formName: string, success: boolean): void => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  });
};

export const trackScroll = (sectionName: string): void => {
  trackEvent('section_view', {
    section_name: sectionName,
  });
};
