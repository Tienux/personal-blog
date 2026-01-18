const parseToHTML = (markdown) => {
    return markdown
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" />')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*([^\*]+)\*\*/gim, '<strong>$1</strong>')
        .replace(/__([^_]+)__/gim, '<strong>$1</strong>')
        .replace(/\*([^\*]+)\*/gim, '<em>$1</em>')
        .replace(/_([^_]+)_/gim, '<em>$1</em>')
        .replace(/`([^`]+)`/gim, '<code>$1</code>')
        .replace(/\n/gim, '<br />')
}

const parseMarkdown = (markdown) => {

   const pattern = /^---\n([\s\S]*?)\n---/;
   const match = markdown.match(pattern);
   let content = markdown;
   const metaDonnees = {};
   
   if (match) {
       const endIndex = match.index + match[0].length;
       const frontMatter = markdown.slice(0, endIndex).trim();
       content = markdown.slice(endIndex).trim();
         const lines = frontMatter.split('\n').slice(1, -1);
            lines.forEach(line => {
                const [key, ...rest] = line.split(':');
                metaDonnees[key.trim()] = rest.join(':').trim();
            });
   }
   
   const htmlContent = parseToHTML(content);
   return { 
       title: metaDonnees.title || 'Sans titre',
       excerpt: metaDonnees.excerpt || metaDonnees.description || '',
       date: metaDonnees.date || '',
       metaDonnees, 
       content: htmlContent 
   };
}



export { parseMarkdown };


