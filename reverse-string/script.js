const inputString = document.getElementById('inputString');
const reverseButton = document.getElementById('reverseButton');
const outputString = document.getElementById('outputString');
const copyButton = document.getElementById('copyButton');

reverseButton.addEventListener('click', () => {
	const originalString = inputString.value;
	const reversedString = reverseString(originalString);
	outputString.textContent = reversedString;
});

copyButton.addEventListener('click', () => {
	const reversedString = outputString.textContent;
	navigator.clipboard.writeText(reversedString);
	alert('Reversed string copied to clipboard!');
});

function reverseString(str) {
	return str.split('').reverse().join('');
}
