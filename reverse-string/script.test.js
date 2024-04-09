/**
 * Unit tests for the reverseString function.
 */
function reverseStringTests() {
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

// Run tests
reverseStringTests();