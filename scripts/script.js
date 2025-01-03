const markdownInput = document.getElementById('markdown-input');
const preview = document.getElementById('preview');
const copyBtn = document.getElementById('copy-btn');
const themeBtn = document.getElementById('theme-btn');
const wordCountDiv = document.getElementById('word-count');
const gearBtn = document.getElementById('gear-btn');
const settingsMenu = document.getElementById('settings-menu');
const editorContainer = document.querySelector('.editor-container');
const divider = document.querySelector(".divider");
let isResizing = false;

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
    const settingLogo = document.getElementById("setting-logo"); // Settings Logo
    const settingsMenu = document.getElementById("settings-menu"); // Settings Menu

    // Toggle visibility of settings menu when clicking the settings logo
    settingLogo.addEventListener("click", () => {
        if (settingsMenu.classList.contains("hidden")) {
            settingsMenu.classList.remove("hidden"); // Show settings menu
            settingsMenu.classList.add("active"); // Activate menu
        } else {
            settingsMenu.classList.add("hidden"); // Hide settings menu
            settingsMenu.classList.remove("active"); // Deactivate menu
        }
    });

    // Close the settings menu when clicking outside of it
    document.addEventListener("click", (event) => {
        if (!settingLogo.contains(event.target) && !settingsMenu.contains(event.target)) {
            settingsMenu.classList.add("hidden"); // Hide settings menu
            settingsMenu.classList.remove("active"); // Deactivate menu
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

document.addEventListener("DOMContentLoaded", () => {
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    const themePreviews = document.querySelectorAll('.theme-preview');

    // Add event listener to each radio button
    themeRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
            const selectedTheme = radio.value;

            // Apply the selected theme
            document.body.className = ""; // Remove existing theme classes
            document.body.classList.add(selectedTheme);
        });
    });

    // Add click event to each theme preview image
    themePreviews.forEach((preview) => {
        preview.addEventListener("click", () => {
            const parent = preview.parentElement; // Get the parent .theme-option
            const radio = parent.querySelector('input[name="theme"]'); // Get associated radio button

            if (radio) {
                radio.checked = true; // Select the radio button
                radio.dispatchEvent(new Event("change")); // Trigger the change event
            }
        });
    });
});


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

    // Function to ensure buttons exist
    function ensureButtons() {
        // Ensure the toggle button exists
        if (!toggleBtn) {
            toggleBtn = document.createElement("button");
            toggleBtn.id = "toggle-btn";
            toggleBtn.textContent = "-"; // Default state for minimize
            toggleBtn.style.marginLeft = "10px";
        }

        // Ensure buttons container exists
        let buttonsContainer = document.querySelector(".preview-buttons");
        if (!buttonsContainer) {
            buttonsContainer = document.createElement("div");
            buttonsContainer.className = "preview-buttons";
            buttonsContainer.style.position = "absolute";
            buttonsContainer.style.top = "10px";
            buttonsContainer.style.right = "10px";
            buttonsContainer.style.display = "flex";
            buttonsContainer.style.gap = "10px";
            preview.appendChild(buttonsContainer);
        }

        // Ensure the close button exists
        if (!buttonsContainer.querySelector(".close-btn")) {
            const closeButton = document.createElement("button");
            closeButton.className = "close-btn";
            closeButton.textContent = "×"; 
            closeButton.style.backgroundColor = "red";
            closeButton.style.color = "white";
            closeButton.style.border = "none";
            closeButton.style.borderRadius = "50%";
            closeButton.style.width = "32px";
            closeButton.style.height = "32px";
            closeButton.style.cursor = "pointer";
            closeButton.style.fontSize = "18px";
            closeButton.addEventListener("click", () => {
                editorContainer.style.display = "none"; 
            });
            buttonsContainer.appendChild(closeButton);
        }

        if (!buttonsContainer.contains(toggleBtn)) {
            buttonsContainer.appendChild(toggleBtn);
        }
    }

    ensureButtons();

    const toolbarHeight = toolbar.offsetHeight;

    function maximizeEditor() {
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

        document.body.style.overflow = "hidden"; 
        toggleBtn.textContent = "-"; 
    }

    maximizeEditor();

    toggleBtn.addEventListener("click", () => {
        const isMaximized = toggleBtn.textContent === "-";

        if (isMaximized) {
            editorContainer.style.position = "relative";    
            editorContainer.style.width = "60%";
            editorContainer.style.height = "70%";
            editorContainer.style.margin = "auto";
            editorContainer.style.padding = "20px";
            editorContainer.style.zIndex = "";

            markdownInput.style.width = "50%";
            preview.style.width = "50%";

            markdownInput.style.height = "100%";
            preview.style.height = "100%";

            document.body.style.overflow = ""; 
            toggleBtn.textContent = "☐"; 
        } else {
            maximizeEditor(); 
        }
    });

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
    const settingsMenu = document.getElementById("settings-menu"); 
    const copyButton = document.getElementById("copy-btn");

    const LOCAL_STORAGE_KEY = "editorContent";

    const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedContent) {
        markdownInput.innerText = savedContent; 
        const sanitizedContent = DOMPurify.sanitize(savedContent); 
        preview.innerHTML = marked.parse(sanitizedContent); 
    }

    markdownInput.addEventListener("input", () => {
        const content = markdownInput.innerText;
        const sanitizedContent = DOMPurify.sanitize(content); 
        preview.innerHTML = marked.parse(sanitizedContent); 
        localStorage.setItem(LOCAL_STORAGE_KEY, content); 
    });

    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset MaxEdit";
    resetButton.classList.add("btn-reset"); 

    resetButton.addEventListener("click", () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY); 
        markdownInput.innerText = ""; 
        preview.innerHTML = ""; 
    });

    if (copyButton) {
        copyButton.insertAdjacentElement("afterend", resetButton);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const editorContainer = document.querySelector(".editor-container");
    const markdownInput = document.getElementById("markdown-input");
    const preview = document.getElementById("preview");
    const divider = document.querySelector(".divider");

    let isResizing = false; 
    let isDragging = false; 
    let offsetX = 0; 
    let offsetY = 0; 

  
    divider.addEventListener("mousedown", (e) => {
        if (!isDragging) { 
            isResizing = true;
            document.body.style.cursor = "ew-resize"; 
        }
    });

    document.addEventListener("mousemove", (e) => {
        if (isResizing && !isDragging) {
            const containerRect = editorContainer.getBoundingClientRect();
            const newEditorWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
            const newPreviewWidth = 100 - newEditorWidth;

            if (newEditorWidth > 10 && newEditorWidth < 90) {
                markdownInput.style.width = `${newEditorWidth}%`;
                preview.style.width = `${newPreviewWidth}%`;
            }
        }
    });

    document.addEventListener("mouseup", () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = ""; 
        }
    });

    divider.addEventListener("mousedown", (e) => {
        const dividerRect = divider.getBoundingClientRect();
        const middleY = dividerRect.top + dividerRect.height / 2;
        const pointerY = e.clientY;

        if (Math.abs(pointerY - middleY) < 10) { 
            isDragging = true;

            const rect = editorContainer.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            document.body.style.cursor = "move";
        }
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            const newLeft = e.clientX - offsetX;
            const newTop = e.clientY - offsetY;

            editorContainer.style.position = "absolute";
            editorContainer.style.left = `${newLeft}px`;
            editorContainer.style.top = `${newTop}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = ""; 
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const editorContainer = document.querySelector(".editor-container");
    const maxEditLogo = document.getElementById("maxedit-logo");

    maxEditLogo.addEventListener("click", () => {
        if (editorContainer.style.display === "none") {
            editorContainer.style.display = "flex"; 
            editorContainer.style.visibility = "visible"; 
            const preview = document.getElementById("preview");
            if (preview) {
                preview.style.display = "block"; 
            }
        }
    });
});
