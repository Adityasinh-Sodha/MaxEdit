const markdownInput = document.getElementById('markdown-input');
const preview = document.getElementById('preview');
const copyBtn = document.getElementById('copy-btn');
const themeBtn = document.getElementById('theme-btn');
const wordCountDiv = document.getElementById('word-count');
const gearBtn = document.getElementById('gear-btn');
const settingsMenu = document.getElementById('settings-menu');

gearBtn.addEventListener('click', () => {
    settingsMenu.classList.toggle('active');
});

marked.setOptions({
    breaks: true,
    gfm: true,
    tables: true,
    highlight: function (code, lang) {
        return lang ? hljs.highlight(code, { language: lang }).value : code;
    },
});

function saveCaretPosition(el) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(el);
    preCaretRange.setEnd(range.startContainer, range.startOffset);
    return preCaretRange.toString().length;
}

function restoreCaretPosition(el, position) {
    const selection = window.getSelection();
    const range = document.createRange();
    let charIndex = 0;
    const stack = [el];
    let found = false;

    while (!found && stack.length) {
        const node = stack.pop();
        if (node.nodeType === 3) {
            const nextCharIndex = charIndex + node.length;
            if (position >= charIndex && position <= nextCharIndex) {
                range.setStart(node, position - charIndex);
                range.collapse(true);
                found = true;
            }
            charIndex = nextCharIndex;
        } else {
            let i = node.childNodes.length;
            while (i--) {
                stack.push(node.childNodes[i]);
            }
        }
    }

    selection.removeAllRanges();
    selection.addRange(range);
}

function updatePreview(markdownText) {
    const sanitizedHTML = DOMPurify.sanitize(marked.parse(markdownText));
    preview.innerHTML = sanitizedHTML;

    preview.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });
}

markdownInput.addEventListener('input', () => {
    const markdownText = markdownInput.innerText;

    const caretPosition = saveCaretPosition(markdownInput);

    const highlightedContent = Prism.highlight(markdownText, Prism.languages.markdown, 'markdown');

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = highlightedContent;

    while (markdownInput.firstChild) {
        markdownInput.removeChild(markdownInput.firstChild);
    }
    while (tempDiv.firstChild) {
        markdownInput.appendChild(tempDiv.firstChild);
    }

    restoreCaretPosition(markdownInput, caretPosition);
    updatePreview(markdownText);

    const wordCount = markdownText.trim() ? markdownText.trim().split(/\s+/).length : 0;
    wordCountDiv.textContent = `Word Count: ${wordCount}`;
});

markdownInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const br = document.createElement('br');
        range.deleteContents();
        range.insertNode(br);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    if (e.key === '#' && markdownInput.innerText.endsWith('#')) {
        e.preventDefault();
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        range.insertNode(document.createTextNode('# '));
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(preview.innerHTML).then(() => {
        alert('HTML copied to clipboard!');
    });
});

const themeSelector = document.getElementById('theme-selector');

document.body.classList.add('dark-blue-theme');

themeSelector.value = 'dark-blue-theme';

themeSelector.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;

    document.body.className = '';
    
    if (selectedTheme !== 'default') {
        document.body.classList.add(selectedTheme);
    }
});

