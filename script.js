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
    const markdownText = markdownInput.value;
    const sanitizedHTML = DOMPurify.sanitize(marked.parse(markdownText));
    preview.innerHTML = sanitizedHTML;

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
