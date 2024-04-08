var initialText = "Hello, welcome to AI4Devs";

function reverseString(input) {
    return input.split("").reverse().join("");
}

function updateReversedString() {
    var inputText = document.getElementById("inputText").value;
    var reversedText = reverseString(inputText);
    document.getElementById("reversedString").innerText = reversedText;
}

function copyToClipboard() {
    var reversedText = document.getElementById("reversedString").innerText;
    navigator.clipboard.writeText(reversedText)
        .then(() => {
            alert("Text copied to clipboard!");
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

// Set initial text and display the reversed version
var reversedInitialText = reverseString(initialText);
document.getElementById("reversedString").innerText = reversedInitialText;

// Set input placeholder
document.getElementById("inputText").placeholder = initialText;
