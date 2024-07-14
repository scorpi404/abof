document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms['ABoF'];

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Retrieve form values
        const title = getValueById('Title');
        const titleSize = getValueById('TitleSize');
        const sourceText = getValueById('SourceText');
        const sourceLink = getValueById('SourceLink');
        const quote = getValueById('Quote');
        const description = getValueById('Desc');
        const mention = getValueById('Ment');

        // Format Markdown
        let markdown = formatMarkdown(title, titleSize, sourceText, sourceLink, quote, description, mention);

        // Display the result
        const resultTextarea = document.getElementById('Result');
        resultTextarea.value = markdown;
    });

    // Copy to Clipboard functionality using Clipboard API
    const copyButton = document.getElementById('copyButton');
    copyButton.addEventListener('click', copyToClipboard);
});

// Helper function to retrieve input values by ID
function getValueById(id) {
    return document.getElementById(id).value;
}

// Helper function to format Markdown
function formatMarkdown(title, titleSize, sourceText, sourceLink, quote, description, mention) {
    // Title
    let mtitle = '#'.repeat(titleSize.charAt(1)) + ' ' + title + '\n';

    // Source
    let msource = `### [${sourceText}](${sourceLink})\n`;

    // Quote
    let mquote = quote ? `\n> ${quote.replace(/\n/g, '\n> ')}\n\n` : '';

    // Description
    let des = `${description}\n`;

    // Mention
    let mment = getMention(mention);

    // Markdown
    return `${mtitle}${msource}${mquote}${des}${mment}`;
}

// Helper function to get mention string based on selection
function getMention(mention) {
    switch (mention) {
        case 'Marvel':
            return '<@&1127323133163081889>';
        case 'DC':
            return '<@&1139309796458250331>';
        default:
            return '<@840946128282976267>';
    }
}

// Copy to Clipboard function
function copyToClipboard() {
    const resultTextarea = document.getElementById('Result');
    const markdownText = resultTextarea.value;

    navigator.clipboard.writeText(markdownText).then(() => {
        // Alert the user
        alert('Copied to clipboard:\n\n' + markdownText);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}
