marked.setOptions({
    breaks: true,
});

const editor = document.querySelector('#editor');
const preview = document.querySelector('#preview');

window.onload = () => {
    editor.innerHTML = '# Header\n' 
        + '## Subheader\n' 
        + '[Markdown Previewer](https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-markdown-previewer)\n\n' 
        + 'This is some javascript inline code: ' 
        + "`console.log('hello world')`" 
        + '.\n\n This is a code block:\n\n' 
        + "```\nconst updatePreview = () => {\n   const markdown = editor.value;\n   const html = marked.parse(markdown);\n   preview.innerHTML = html;\n};\n```" 
        +  '\n\n * This is a list item \n\n' 
        + '> This is a blockquote\n\n'
        + 'Here is an image:\n'
        + '![random image](https://source.unsplash.com/random/300x300)\n\n' 
        + 'This **word** is bold.';
        
    updatePreview();
};

const updatePreview = () => {
    const markdown = editor.value;
    const html = marked.parse(markdown);
    preview.innerHTML = html;
};

editor.addEventListener('input', updatePreview); 