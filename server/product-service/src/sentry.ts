import * as Sentry from '@sentry/node';
import { rewriteFramesIntegration } from '@sentry/integrations';

const options: any = {
  dsn: "https://b792aaf304dae255e456fd997b17d3ff@o4507609787531264.ingest.us.sentry.io/4507610074185728", // Replace with your Sentry DSN
  integrations: [
    rewriteFramesIntegration({
      root: process.cwd(),
    }),
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0, 
};

export function initSentry() {
  Sentry.init(options);
}

