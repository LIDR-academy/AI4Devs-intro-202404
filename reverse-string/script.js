function reverseString() {
    // Get the input value
    var inputText = document.getElementById("inputText").value;

    // Check if the input is not empty
    if(inputText.trim() !== "") {
        // Reverse the string
        var reversedString = inputText.split("").reverse().join("");

        // Display the reversed string
        document.getElementById("output").innerText = "Reversed String: " + reversedString;
    } else {
        // Display error message if the input is empty
        document.getElementById("output").innerText = "Please enter a string.";
    }
}