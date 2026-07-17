import * as Sentry from "@sentry/astro";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

const SENTRY_DSN = import.meta.env.PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN,
  environment: import.meta.env.DEV ? 'development' : 'production',
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
  integrations: [
    // Add our Profiling integration
    nodeProfilingIntegration(),
  ],
  // Enable logs to be sent to Sentry
  enableLogs: true,
  // Define how likely traces are sampled. Adjust this value in production,
  // or use tracesSampler for greater control.
  tracesSampleRate: 1.0,
  // Define how many user sessions have profiling enabled.
  profileSessionSampleRate: 1.0,

});