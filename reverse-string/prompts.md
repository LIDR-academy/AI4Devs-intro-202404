First prompt:

hi, I have an almost empty repository with the following scripts:

//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reverse String</title>    
</head>
<body>
<script src="script.js"></script>
</body>
</html>

//script.js

// this script is empty =(

And what I want you to help pme create is a reverseStrign function.
the reverseString function should be created using only javascript, with no other library on top, and should take in considerations any edge case, like script injecting, and so on.

Once the function is created, please generate a suite of unit test that will be used to validate the function, please include edge cases that you consider useful, like testing strings with no printable characters, numbers and other primitives, etc.

After that, please, update the index-html file to add material ui library and create a form.

The form will have the following components ordered from top to bottom:
- a title "Reverse String", you might use H1 tags for that
- a text field with a placeholder; that text fiel will be used as the input for our screen
- then we will have a button with the label "Reverse" and a related icon
-after that we will have a label component that will display the reversed string once a user clicks on the Reverse button (using our reverseString function.


Second prompt:

I forgot asking you for a button to copy, please use a secondary-button style and the "copy" label and a related icon for that button and create a function to copy the reversed string to the clipboard
