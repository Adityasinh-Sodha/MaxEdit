const markdownInput = document.getElementById('markdown-input');
const preview = document.getElementById('preview');
const copyBtn = document.getElementById('copy-btn');
const themeBtn = document.getElementById('theme-btn');
const wordCountDiv = document.getElementById('word-count');
const gearBtn = document.getElementById('gear-btn');
const settingsMenu = document.getElementById('settings-menu');
const editorContainer = document.querySelector('.editor-container');
let isResizing = false;

// Handle resize events to update content dynamically
editorContainer.addEventListener('mousedown', (e) => {
    if (e.target === editorContainer) {
        isResizing = true;
        editorContainer.classList.add('resizing');
    }
});

window.addEventListener('mousemove', (e) => {
    if (isResizing) {
        const containerRect = editorContainer.getBoundingClientRect();

        // Update width and height based on mouse position
        editorContainer.style.width = `${e.clientX - containerRect.left}px`;
        editorContainer.style.height = `${e.clientY - containerRect.top}px`;
    }
});

window.addEventListener('mouseup', () => {
    if (isResizing) {
        isResizing = false;
        editorContainer.classList.remove('resizing');
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const gearBtn = document.getElementById("gear-btn");
    const settingsMenu = document.getElementById("settings-menu");

    gearBtn.addEventListener("click", () => {
        settingsMenu.classList.toggle("active");
    });

    // Close settings menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!gearBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
            settingsMenu.classList.remove("active");
        }
    });
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


document.addEventListener("DOMContentLoaded", () => {
    const editorContainer = document.querySelector(".editor-container");
    const markdownInput = document.getElementById("markdown-input");
    const preview = document.getElementById("preview");
    const toolbar = document.querySelector(".top-toolbar");
    const toolbarRight = toolbar.querySelector(".toolbar-right");

    // Create the toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.id = "toggle-btn";
    toggleBtn.textContent = "Maximize";
    toolbarRight.appendChild(toggleBtn);

    let isMaximized = false;

    toggleBtn.addEventListener("click", () => {
        if (!isMaximized) {
            // Maximize
            const toolbarHeight = toolbar.offsetHeight;

            editorContainer.style.position = "fixed";
            editorContainer.style.top = `${toolbarHeight}px`;
            editorContainer.style.left = "0";
            editorContainer.style.width = "100vw";
            editorContainer.style.height = `calc(100vh - ${toolbarHeight}px)`;
            editorContainer.style.margin = "0";
            editorContainer.style.padding = "0";
            editorContainer.style.zIndex = "1000";

            markdownInput.style.width = "50%";
            preview.style.width = "50%";

            markdownInput.style.height = "100%";
            preview.style.height = "100%";

            document.body.style.overflow = "hidden"; // Prevent background scrolling

            toggleBtn.textContent = "manual";
            isMaximized = true;
        } else {
            // Minimize
            editorContainer.style.position = "relative";
            editorContainer.style.width = "60%"; // 60% of parent width for center alignment
            editorContainer.style.height = "70%"; // 70% of parent height
            editorContainer.style.margin = "auto";
            editorContainer.style.padding = "20px";
            editorContainer.style.zIndex = "";

            markdownInput.style.width = "50%";
            preview.style.width = "50%";

            markdownInput.style.height = "100%";
            preview.style.height = "100%";

            document.body.style.overflow = ""; // Re-enable background scrolling

            toggleBtn.textContent = "Maximize";
            isMaximized = false;
        }
    });
});
