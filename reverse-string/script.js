function reverseString(str) {
    return str.split('').reverse().join('');
}

function reverseAndDisplay() {
    const inputElement = document.getElementById('inputString');
    const outputElement = document.getElementById('output');

    const inputValue = inputElement.value;
    const reversedValue = reverseString(inputValue);

    outputElement.textContent = `Cadena invertida: ${reversedValue}`;
}
