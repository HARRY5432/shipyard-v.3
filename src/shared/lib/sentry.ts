import * as Sentry from '@sentry/react';

export function initSentry() {
  if (process.env.NODE_ENV === 'production' && import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      tracesSampleRate: 0.1, // 10% of transactions
      replaysSessionSampleRate: 0.1, // 10% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
      
      beforeSend(event) {
        if (event.exception) {
          event.exception.values?.forEach((value) => {
            if (value.stacktrace) {
              value.stacktrace.frames?.forEach((frame) => {
                delete frame.vars;
              });
            }
          });
        }
        return event;
      },
    });
  }
}
