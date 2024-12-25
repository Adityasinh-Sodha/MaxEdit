body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background: url('../assets/background.png') no-repeat center center/cover;
    color: #333;
    transition: background-color 0.3s, color 0.3s;
}


.editor-container {
    display: flex;
    width: 90%;
    max-width: 1200px;
    height: 70vh;
    margin: auto;
    background: rgba(255, 255, 255, 0.1); 
    border: 1px solid rgba(255, 255, 255, 0.2); 
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    overflow: hidden;
    resize: both; /* Allow resizing */
    overflow: auto; /* Prevent content from overflowing */
}


#markdown-input,
#preview {
    width: 50%; /* Initial split width */
    height: 100%;
    padding: 20px;
    font-size: 16px;
    font-family: 'Courier New', Courier, monospace;
    white-space: pre-wrap; 
    overflow-wrap: break-word; 
    overflow-y: auto;
    border: none;
    outline: none;
    resize: none; /* Prevent internal resizing */
    box-sizing: border-box; 
}


.editor-container.resizing #markdown-input,
.editor-container.resizing #preview {
    pointer-events: none; /* Disable text selection while resizing */
}


/* Top Toolbar Styles */
.top-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;
    color: #fff;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.toolbar-left {
    display: flex;
    align-items: center;
}

.toolbar-right {
    position: relative; 
    display: flex;
    align-items: center;
}

.toolbar-center {
    position: absolute;
    left: 50%; 
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px; 
}

#gear-btn {
    height: 30px;
    width: 30px;
    cursor: pointer;
    margin-left: 10px;
}

#settings-menu {
    position: absolute;
    top: 40px; 
    right: 0; 
    background-color: #000000;
    color: #fff;
    border: 1px solid #444;
    border-radius: 5px;
    padding: 10px;
    display: none; 
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}


#settings-menu button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 14px;
    width: 100%; 
}

#settings-menu button:hover {
    background-color: #0056b3;
}

.hidden {
    display: none;
}

#settings-menu.active {
    display: flex; 
}

.toolbar-logo {
    height: 30px; 
    width: auto; 
    margin: 0 5px; 
    cursor: pointer;
}


.toolbar-link {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    margin-left: 10px;
}

.toolbar-link:hover {
    text-decoration: underline;
}


body {
    padding-top: 60px;
}



textarea {
    width: 50%;
    height: 100%;
    border: none;
    outline: none;
    padding: 20px;
    font-size: 16px;
    resize: none;
    border-right: 1px solid #ddd;
    font-family: 'Courier New', Courier, monospace;
    background: rgba(255, 255, 255, 0.8);
    white-space: pre-wrap; 
    overflow-wrap: break-word; 
}

    textarea:focus {
    outline: none; 
}

pre[class*="language-"] {
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
}


body.dark-theme pre[class*="language-"] {
    background: #444;
    color: #fff;
}

#preview {
    width: 50%;
    height: 100%;
    overflow-y: auto;
    padding: 20px;
    font-size: 16px;
    background: rgba(250, 250, 250, 0.8); 
    line-height: 1.6;
    background: #e0e0e0; 
    color: #333;
}


#preview blockquote {
    border-left: 4px solid #007bff;
    margin: 10px 0;
    padding-left: 10px;
    color: #555;
    font-style: italic;
}

#preview pre {
    background-color: #f4f4f9;
    padding: 10px;
    overflow-x: auto;
    border-radius: 5px;
    font-family: 'Courier New', Courier, monospace;
}

#preview code {
    background-color: #f4f4f9;
    padding: 2px 5px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    color: #d6336c;
}

#preview a {
    color: #007bff;
    text-decoration: none;
}

#preview a:hover {
    text-decoration: underline;
}

#preview table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
}

#preview th,
#preview td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

#preview th {
    background-color: #f4f4f9;
    font-weight: bold;
}

.toolbar {
    margin-top: 0px;
    display: flex;
    justify-content: space-between;
    width: 85%;
    max-width: 1200px;
    position: relative;
    top: -30px;
}


.dark-theme {
    background-color: #333;
    color: #fff;
}

.dark-theme textarea,
.dark-theme #preview {
    background-color: #444;
    color: #fff;
}

.dark-theme #preview blockquote {
    border-left: 4px solid #5cb3ff;
    color: #ccc;
}

.dark-theme #preview pre {
    background-color: #555;
}

.dark-theme #preview code {
    background-color: #555;
    color: #ff91a4;
}

.dark-theme #preview a {
    color: #1e90ff;
}

.dark-theme #word-count {
    color: #fff;
}

.dark-theme button {
    background-color: #555;
}

.dark-theme button:hover {
    background-color: #777;
}

#preview h1, #preview h2, #preview h3, #preview h4, #preview h5, #preview h6 {
    border-bottom: 1px solid #ddd;
    padding-bottom: 5px;
    margin-bottom: 10px;
}

.dark-theme #preview th {
    background-color: #555; 
    color: #fff; 
}

.dark-theme #preview td {
    background-color: #444; 
    color: #fff;
}

.dark-theme textarea,
.dark-theme #preview {
    background: rgba(68, 68, 68, 0.8);
}



#markdown-input:empty:before {
    content: attr(placeholder);
    color: #aaa;
    pointer-events: none;
}


body.dark-theme #markdown-input,
body.dark-theme #preview {
    background: #555; 
    color: #fff; 
}
        

pre[class*="language-"] {
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
}

body.dark-theme pre[class*="language-"] {
    background: #444;
    color: #fff;
}

body.dark-blue-theme #markdown-input,
body.dark-blue-theme #preview {
    background: #1a1f36; 
    color: #cfd8e3;
}
