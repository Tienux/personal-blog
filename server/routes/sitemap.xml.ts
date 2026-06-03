import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  defineEventHandler,
  getRequestHost,
  getRequestProtocol,
  setHeader,
} from 'h3';

const PROJECTS_ROOT = join(process.cwd(), 'contents', 'projects');
const DEFAULT_LOCALE = 'fr';
const SUPPORTED_LOCALES = ['fr', 'en'];

const normalizeBaseUrl = (url: string) => url.replace(/\/$/, '');

const buildUrl = (baseUrl: string, path: string) => `${baseUrl}${path}`;

const isPublishedMarkdown = (content: string) => /^published:\s*true\s*$/im.test(content);

const xmlEscape = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const getStaticLocalizedRoutes = () => {
  const routes = ['/', '/about', '/projets'];

  for (const locale of SUPPORTED_LOCALES) {
    if (locale === DEFAULT_LOCALE) {
      continue;
    }

    routes.push(`/${locale}`);
    routes.push(`/${locale}/about`);
    routes.push(`/${locale}/projets`);
  }

  return routes;
};

const getProjectRoutes = async () => {
  const routes: string[] = [];

  for (const locale of SUPPORTED_LOCALES) {
    const localeDirectory = join(PROJECTS_ROOT, locale);

    let files: string[];
    try {
      files = await readdir(localeDirectory);
    } catch {
      continue;
    }

    for (const fileName of files) {
      if (!fileName.endsWith('.md')) {
        continue;
      }

      const filePath = join(localeDirectory, fileName);
      const content = await readFile(filePath, 'utf-8');

      if (!isPublishedMarkdown(content)) {
        continue;
      }

      const slug = fileName.replace(/\.md$/, '');
      const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
      routes.push(`${prefix}/projets/${slug}`);
    }
  }

  return routes;
};

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const configuredUrl = runtimeConfig.public.siteUrl?.trim() ?? '';
  const fallbackUrl = `${getRequestProtocol(event)}://${getRequestHost(event)}`;
  const baseUrl = normalizeBaseUrl(configuredUrl || fallbackUrl);

  const staticRoutes = getStaticLocalizedRoutes();
  const projectRoutes = await getProjectRoutes();
  const allRoutes = [...new Set([...staticRoutes, ...projectRoutes])];

  const urlsXml = allRoutes
    .map((path) => `  <url><loc>${xmlEscape(buildUrl(baseUrl, path))}</loc></url>`)
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsXml}\n</urlset>`;

  setHeader(event, 'Content-Type', 'application/xml; charset=UTF-8');
  return sitemap;
});