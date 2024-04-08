function reverseString(str) {
  return str.split('').reverse().join('');
}

function reverseStringHandler() {
  const inputElement = document.getElementById('inputString');
  const outputElement = document.getElementById('output');
  const originalString = inputElement.value;
  const reversedString = reverseString(originalString);
  outputElement.textContent = `La cadena invertida es: ${reversedString}`;
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    reverseStringHandler();
  }
}
