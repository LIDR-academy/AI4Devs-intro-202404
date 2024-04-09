// script.js

/**
 * Reverses a given string.
 * @param {string} str - The input string to be reversed.
 * @returns {string} - The reversed string.
 */
function reverseString(str) {
    // Check if the input is a string
    if (typeof str !== 'string') {
        throw new TypeError('Input must be a string');
    }

    // Split the string into an array of characters, reverse it, then join back to form a string
    return str.split('').reverse().join('');
}

// Unit tests
function runTests() {
    try {
        // Test normal string
        console.log(reverseString('hello') === 'olleh');

        // Test empty string
        console.log(reverseString('') === '');

        // Test string with numbers
        console.log(reverseString('12345') === '54321');

        // Test string with special characters
        console.log(reverseString('!@#$%^&*()') === ')(*&^%$#@!');

        // Test non-string input
        console.log(reverseString(123) === ''); // Should throw an error
    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

// Run the tests
runTests();
