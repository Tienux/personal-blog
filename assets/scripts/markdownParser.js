import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import * as YAML from 'yaml';

const renderer = new marked.Renderer();
renderer.link = ({ href, title, text }) => {
  const isExternal = href?.startsWith('http');
  const rel = isExternal ? ' rel="noopener noreferrer"' : '';
  const target = isExternal ? ' target="_blank"' : '';
  const titleAttr = title ? ` title="${title}"` : '';
  return `<a href="${href}"${target}${rel}${titleAttr}>${text}</a>`;
};
marked.use({ renderer });

const parseMarkdown = (markdown) => {
  const pattern = /^---\n([\s\S]*?)\n---/;
  const match = markdown.match(pattern);
  let content = markdown;
  let metaDonnees = {};

  if (match) {
    const endIndex = match.index + match[0].length;
    const frontMatterText = match[1];
    content = markdown.slice(endIndex).trim();

    try {
      metaDonnees = YAML.parse(frontMatterText) || {};
    } catch (e) {
      console.error('Erreur lors du parsing YAML:', e);
      metaDonnees = {};
    }
  }

  const rawHtml = marked.parse(content);

  const htmlContent = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br',
      'ul', 'ol', 'li',
      'strong', 'em',
      'code', 'pre',
      'a', 'img',
      'blockquote',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
  });

  return {
    title: metaDonnees.title || 'Sans titre',
    excerpt: metaDonnees.excerpt || metaDonnees.description || '',
    date: metaDonnees.date || '',
    metaDonnees,
    content: htmlContent,
  };
};

export { parseMarkdown };