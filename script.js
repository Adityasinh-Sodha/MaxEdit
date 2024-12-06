const markdownInput = document.getElementById('markdown-input');
const preview = document.getElementById('preview');
const copyBtn = document.getElementById('copy-btn');
const themeBtn = document.getElementById('theme-btn');
const wordCountDiv = document.getElementById('word-count');

marked.setOptions({
    breaks: true,
    gfm: true,
    tables: true,
    highlight: function (code, lang) {
        return lang ? hljs.highlight(code, { language: lang }).value : code;
    },
});

markdownInput.addEventListener('input', () => {
    const markdownText = markdownInput.innerText; // Get raw Markdown text
    const sanitizedHTML = DOMPurify.sanitize(marked.parse(markdownText));
    preview.innerHTML = sanitizedHTML;

    preview.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });

    const highlightedContent = Prism.highlight(markdownText, Prism.languages.markdown, 'markdown');
    markdownInput.innerHTML = highlightedContent;

    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(markdownInput);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);

    const wordCount = markdownText.trim() ? markdownText.trim().split(/\s+/).length : 0;
    wordCountDiv.textContent = `Word Count: ${wordCount}`;
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(preview.innerHTML).then(() => {
        alert('HTML copied to clipboard!');
    });
});

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});
