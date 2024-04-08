function reverseText() {
  const inputText = document.getElementById('input-text').value;
  const reversedText = inputText.split('').reverse().join('');
  document.getElementById('reversed-text').textContent = `Reversed text: ${reversedText}`;
}