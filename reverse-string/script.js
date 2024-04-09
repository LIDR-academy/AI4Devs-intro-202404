/**
     * Reverses the input string and updates the output field with the reversed string.
     */
function reverseStringWrapper() {
    const input = document.getElementById('inputText').value;
    const reversed = reverseString(input);
    document.getElementById('outputText').value = reversed;
}

/**
 * Reverses a given string.
 * @param {string} str - The input string to be reversed.
 * @returns {string} - The reversed string.
 */
function reverseString(str) {
    // Check if the input is a string
    if (typeof str !== 'string') {
        throw new TypeError('Input must be a string');
    }

    // Split the string into an array of characters, reverse it, then join back to form a string
    return str.split('').reverse().join('');
}

/**
 * Copies the content of the output text field to the clipboard.
 */
function copyToClipboard() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
    M.toast({html: 'Copied to clipboard!'});
}