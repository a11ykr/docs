// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  const redirects: { [key: string]: string } = {
    '/docs/glossary/flashes': '/docs/glossary/flash/' // 이거 왜 안되지?
  };

  if (redirects[pathname]) {
    return context.redirect(redirects[pathname], 301);
  }
  return next();
});