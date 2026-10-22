import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  // In a real application, you would send this to your analytics endpoint (e.g. Vercel Analytics, PostHog, Custom RUM)
  console.log(`[Web Vitals] ${metric.name}: ${metric.value}`, metric);
  
  if (typeof navigator.sendBeacon === "function") {
    // navigator.sendBeacon('/api/vitals', body);
  } else {
    /*
    fetch('/api/vitals', {
      body,
      method: 'POST',
      keepalive: true
    });
    */
  }
}

export function reportWebVitals() {
  if (typeof window !== 'undefined') {
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }
}
