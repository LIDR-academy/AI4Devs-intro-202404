document.addEventListener('DOMContentLoaded', function() {
    const reverseButton = document.getElementById('reverseButton');
    const stringInput = document.getElementById('stringInput');
    const reversedStringOutput = document.getElementById('reversedStringOutput');

    reverseButton.addEventListener('click', function() {
        const reversed = stringInput.value.split('').reverse().join('');
        reversedStringOutput.value = reversed;
    });
});