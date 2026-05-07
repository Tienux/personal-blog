const parseToHTML = (markdown) => {
    let content = markdown;
    
    // 1. Code blocks AVANT tout (pour ne pas toucher leur contenu)
    content = content.replace(/```([a-z]*)\n([\s\S]*?)```/gim, (match, lang, code) => {
        return `<pre><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`;
    });
    
    // 2. Images AVANT les liens (même syntaxe mais avec !)
    content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" />');
    
    // 3. Liens
    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');
    
    // 4. Titres (h3 avant h2 avant h1 pour éviter les faux matchs)
    content = content.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    content = content.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    content = content.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // 5. Listes non ordonnées
    const lines = content.split('\n');
    let inList = false;
    const processedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const listMatch = line.match(/^[\-\*]\s+(.+)/);
        
        if (listMatch) {
            if (!inList) {
                processedLines.push('<ul>');
                inList = true;
            }
            processedLines.push(`<li>${listMatch[1]}</li>`);
        } else {
            if (inList) {
                processedLines.push('</ul>');
                inList = false;
            }
            processedLines.push(line);
        }
    }
    if (inList) processedLines.push('</ul>');
    content = processedLines.join('\n');
    
    // 6. Gras (** et __)
    content = content.replace(/\*\*([^\*]+)\*\*/gim, '<strong>$1</strong>');
    content = content.replace(/__([^_]+)__/gim, '<strong>$1</strong>');
    
    // 7. Italique (* et _) APRÈS le gras
    content = content.replace(/\*([^\*]+)\*/gim, '<em>$1</em>');
    content = content.replace(/_([^_]+)_/gim, '<em>$1</em>');
    
    // 8. Code inline
    content = content.replace(/`([^`]+)`/gim, '<code>$1</code>');
    
    // 9. Paragraphes (double \n devient </p><p>)
    content = content.replace(/\n\n/gim, '</p><p>');
    content = '<p>' + content + '</p>';
    
    // 10. Line breaks simples (dans les paragraphes)
    content = content.replace(/\n/gim, '<br />');
    
    // 11. Nettoyage (enlever les <p> autour des titres et listes)
    content = content.replace(/<p>(<h[1-6]>)/gim, '$1');
    content = content.replace(/(<\/h[1-6]>)<\/p>/gim, '$1');
    content = content.replace(/<p>(<ul>|<\/ul>)/gim, '$1');
    content = content.replace(/(<ul>|<\/ul>)<\/p>/gim, '$1');
    
    return content;
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
            if (key) {
                metaDonnees[key.trim()] = rest.join(':').trim();
            }
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