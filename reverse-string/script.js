function reverseText() {
  const inputText = document.getElementById('input-text').value;
  const reversedText = inputText.split('').reverse().join('');
  document.getElementById('reversed-text').textContent = `Reversed text: ${reversedText}`;
  document.getElementById('copy-button').style.display = 'inline-block';
}

function copyToClipboard() {
  const reversedText = document.getElementById('reversed-text').textContent.split(': ')[1];
  navigator.clipboard.writeText(reversedText);
  alert('Reversed text copied to clipboard!');
}