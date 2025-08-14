// Performance monitoring utilities
interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
}

interface WindowWithGtag extends Window {
  gtag?: (...args: unknown[]) => void;
}

export const reportWebVitals = (metric: WebVitalMetric) => {
  if (process.env.NODE_ENV === "production") {
    console.log("Web Vital:", metric);

    // You can integrate with analytics services here
    // Example: Google Analytics 4
    if (typeof window !== "undefined" && (window as WindowWithGtag).gtag) {
      (window as WindowWithGtag).gtag!("event", metric.name, {
        event_category: "Web Vitals",
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
};

// Page load performance tracking
export const trackPageLoad = (pageName: string) => {
  if (typeof window !== "undefined" && "performance" in window) {
    const loadTime = Math.round(performance.now());
    console.log(`${pageName} loaded in ${loadTime}ms`);

    // You can send this data to your analytics service
    if ((window as WindowWithGtag).gtag) {
      (window as WindowWithGtag).gtag!("event", "page_load_time", {
        event_category: "Performance",
        value: loadTime,
        event_label: pageName,
      });
    }
  }
};

// Lazy loading intersection observer
export const createLazyObserver = (
  callback: (entry: IntersectionObserverEntry) => void
) => {
  if (typeof window === "undefined") return null;

  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback);
    },
    {
      rootMargin: "50px",
      threshold: 0.1,
    }
  );
};
