function reverseInputText() {
  const inputText = document.getElementById('inputText').value;
  const reversedText = inputText.split('').reverse().join('');
  document.getElementById('reversedText').textContent = reversedText;
}

function copyToClipboard() {
  const outputText = document.getElementById('reversedText').textContent;
  navigator.clipboard.writeText(outputText)
  .then(() => alert('Text copied to clipboard'))
  .catch(err => console.error('Error copying text to clipboard', err));
}
