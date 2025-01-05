const markdownInput = document.getElementById('markdown-input');
const preview = document.getElementById('preview');
const copyBtn = document.getElementById('copy-btn');
const themeBtn = document.getElementById('theme-btn');
const wordCountDiv = document.getElementById('word-count');
const gearBtn = document.getElementById('gear-btn');
const settingsMenu = document.getElementById('settings-menu');
const editorContainer = document.querySelector('.editor-container');



document.addEventListener("DOMContentLoaded", () => {
    const gearBtn = document.getElementById("gear-btn");
    const settingsMenu = document.getElementById("settings-menu");

    gearBtn.addEventListener("click", () => {
        settingsMenu.classList.toggle("active");
    });

   
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
    const toolbar = document.querySelector(".top-toolbar"); // Toolbar element
    const toolbarHeight = toolbar ? toolbar.offsetHeight : 0; // Get the height of the toolbar

    // Set editor container to full screen, below the toolbar
    const editorContainer = document.querySelector('.editor-container');
    editorContainer.style.position = "fixed";
    editorContainer.style.top = `${toolbarHeight}px`; // Push down below the toolbar
    editorContainer.style.left = "0";
    editorContainer.style.width = "100vw";
    editorContainer.style.height = `calc(100vh - ${toolbarHeight}px)`; // Adjust height to avoid toolbar overlap
    editorContainer.style.display = "flex"; // Use flexbox for 50/50 layout
    editorContainer.style.margin = "0";
    editorContainer.style.padding = "0";
    editorContainer.style.zIndex = "1000";

    // Style markdown input and preview for 50/50 split
    const markdownInput = document.getElementById('markdown-input');
    const preview = document.getElementById('preview');

    markdownInput.style.width = "50%";
    markdownInput.style.height = "100%";
    markdownInput.style.overflowY = "auto"; // Add scroll if content exceeds height

    preview.style.width = "50%";
    preview.style.height = "100%";
    preview.style.overflowY = "auto"; // Add scroll for the preview
});

 // UPDATE FROM HERE

document.addEventListener("DOMContentLoaded", () => {
    const markdownInput = document.getElementById("markdown-input");
    const preview = document.getElementById("preview");

    const sampleMarkdown = `
# MaxEdit

# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header

## Emphasis

*Italic text using asterisks*

_Italic text using underscores_

**Bold text using double asterisks**

__Bold text using double underscores__

***Bold and italic text using triple asterisks***

___Bold and italic text using triple underscores___

## Lists

### Unordered List

- Item 1
  - Subitem 1.1
  - Subitem 1.2
- Item 2

### Ordered List

1. First item
2. Second item
   1. Subitem 2.1
   2. Subitem 2.2

## Links

You are using [MaxEdit](https://adityasinh-sodha.github.io/MaxEdit/) by [Adityasinh](https://bento.me/adityasinh)

## Images

![maxedit](https://simgbb.com/avatar/RT7C7DzzyZ2h.png) 

## Blockquotes

> This is a blockquote.
>
> Another line in the blockquote.


## Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data 1.2 | Data 1.3 |
| Row 2    | Data 2.2 | Data 2.3 |

## Task Lists

- [x] Task 1
- [ ] Task 2
- [ ] Task 3


## Strikethrough

~~This text is strikethrough.~~

## Custom Syntax Highlighting



## Author
Developed by **Adityasinh**.
    `;

    const updatePreview = () => {
        const markdownContent = markdownInput.innerText.trim();
        if (markdownContent === "") {
            preview.innerHTML = "";
        } else {
            const sanitizedHTML = DOMPurify.sanitize(marked.parse(markdownContent));
            preview.innerHTML = sanitizedHTML;

            preview.querySelectorAll("pre code").forEach((block) => {
                Prism.highlightElement(block);
            });
        }
    };

    markdownInput.innerText = sampleMarkdown;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = Prism.highlight(sampleMarkdown, Prism.languages.markdown, "markdown");
    markdownInput.innerHTML = tempDiv.innerHTML;

    const observer = new MutationObserver(() => {
        updatePreview();
    });

    observer.observe(markdownInput, {
        childList: true,
        subtree: true,
        characterData: true,
    });

    updatePreview();
});

document.addEventListener("DOMContentLoaded", () => {
    const editorContainer = document.querySelector(".editor-container");
    const markdownInput = document.getElementById("markdown-input");
    const preview = document.getElementById("preview");
    const toolbar = document.querySelector(".top-toolbar");
    const divider = document.querySelector(".divider");
    let toggleBtn = document.getElementById("toggle-btn");

let isResizing = false;
    divider.addEventListener("mousedown", () => {
        isResizing = true;
        document.body.style.cursor = "ew-resize"; 
    });

    document.addEventListener("mousemove", (e) => {
        if (!isResizing) return;

        const containerRect = editorContainer.getBoundingClientRect();
        const newEditorWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
        const newPreviewWidth = 100 - newEditorWidth;

        if (newEditorWidth > 10 && newEditorWidth < 90) {
            markdownInput.style.width = `${newEditorWidth}%`;
            preview.style.width = `${newPreviewWidth}%`;
        }
    });

    document.addEventListener("mouseup", () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = ""; 
        }
    });

    const observer = new MutationObserver(() => {
        ensureButtons();
    });

    observer.observe(editorContainer, { childList: true, subtree: true });
});



document.addEventListener("DOMContentLoaded", () => {
    const markdownInput = document.getElementById("markdown-input");
    const preview = document.getElementById("preview");

    function handleInput(event) {
      
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        const rawContent = markdownInput.innerText; 

        
        const sanitizedContent = DOMPurify.sanitize(rawContent); 
        preview.innerHTML = marked.parse(sanitizedContent); 

        selection.removeAllRanges();
        selection.addRange(range);
    }

    markdownInput.addEventListener("input", handleInput);

    markdownInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            document.execCommand('insertHTML', false, '\n');
            event.preventDefault();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const markdownInput = document.getElementById("markdown-input");
    const preview = document.getElementById("preview");
    const settingsMenu = document.getElementById("settings-menu"); // Access the settings menu
    const copyButton = document.getElementById("copy-btn"); // Access the Copy HTML button

    const LOCAL_STORAGE_KEY = "editorContent";

    // Load saved content from localStorage
    const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedContent) {
        markdownInput.innerText = savedContent; 
        const sanitizedContent = DOMPurify.sanitize(savedContent); 
        preview.innerHTML = marked.parse(sanitizedContent); 
    }

    // Handle input event for live preview and save
    markdownInput.addEventListener("input", () => {
        const content = markdownInput.innerText;
        const sanitizedContent = DOMPurify.sanitize(content); 
        preview.innerHTML = marked.parse(sanitizedContent); 
        localStorage.setItem(LOCAL_STORAGE_KEY, content); 
    });

    // Create the reset button
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset MaxEdit";
    resetButton.classList.add("btn-reset"); // Add the reset-specific CSS class

    // Reset button functionality
    resetButton.addEventListener("click", () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear local storage
        markdownInput.innerText = ""; // Clear the editor
        preview.innerHTML = ""; // Clear the preview
    });

    // Insert the reset button after the Copy HTML button
    if (copyButton) {
        copyButton.insertAdjacentElement("afterend", resetButton);
    }
});

