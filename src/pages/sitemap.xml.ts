import type { APIRoute } from 'astro';

export const prerender = true;

const pages = ['/', '/services', '/district', '/about', '/contact'];

export const GET: APIRoute = ({ site }) => {
  const origin = (site?.origin || process.env.PUBLIC_SITE_URL?.trim() || 'https://zhidaola.top').replace(/\/$/, '');
  const urls = pages
    .map((pathname) => `  <url><loc>${origin}${pathname}</loc><changefreq>monthly</changefreq></url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
