function reverseString(str) {
    return str.split('').reverse().join('');
}

function reverseAndDisplay() {
    var input = document.getElementById("inputField").value; // Get the value from the input field
    var reversedString = reverseString(input); // Call the reverseString function
    document.getElementById("resultDisplay").innerText = reversedString; // Display the result in the resultDisplay div
}

// Add key listener
document.getElementById("inputField").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        reverseAndDisplay();
    }
});