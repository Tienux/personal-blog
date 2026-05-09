import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import * as YAML from 'yaml';

const parseMarkdown = (markdown) => {
  const pattern = /^---\n([\s\S]*?)\n---/;
  const match = markdown.match(pattern);
  let content = markdown;
  let metaDonnees = {};

  if (match) {
    const endIndex = match.index + match[0].length;
    const frontMatterText = match[1];
    content = markdown.slice(endIndex).trim();

    // Utiliser un vrai parseur YAML au lieu de split(':')
    try {
      metaDonnees = YAML.parse(frontMatterText) || {};
    } catch (e) {
      console.error('Erreur lors du parsing YAML:', e);
      metaDonnees = {};
    }
  }

  // Utilise marked pour parser le markdown
  const rawHtml = marked.parse(content);

  // Sanitize avec DOMPurify pour éviter XSS
  const htmlContent = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'br',
      'ul',
      'ol',
      'li',
      'strong',
      'em',
      'code',
      'pre',
      'a',
      'img',
      'blockquote',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
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
