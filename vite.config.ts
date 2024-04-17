/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog, { PrerenderContentFile } from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      prerender: {
        routes: async () => [
          '/blog',
          {
            contentDir: 'src/content',
            transform: (file: PrerenderContentFile) => {
              if (file.attributes['draft']) {
                return false;
              }
              const slug = file.attributes['slug'] ?? file.name;
              return `/blog/${slug}`;
            },
          },
        ],
        sitemap: {
          host: 'https://bermell.dev'
        }
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
