import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { isDevMode } from '@angular/core';

// if we are in dev mode, don't just start the app,
// start the mock service worker and THEN start the app.
// if we aren't in dev mode, just start the app.

async function enableMocking() {
  return;
  if (isDevMode()) {
    const { worker } = await import('./mocks/browser');
    return await worker.start();
  } else {
    return;
  }
}

enableMocking().then(() => bootstrapApplication(App, appConfig).catch((err) => console.error(err)));
