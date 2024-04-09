### Prompt 1:

Hi, I have an almost empty repository with the following scripts:

```html
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
```

```javascript
// script.js

// this script is empty =(
```

And what I want you to help me create is a `reverseString` function.
The `reverseString` function should be created using only JavaScript, with no other library on top, and should take in considerations any edge case, like script injecting, and so on.

Once the function is created, please generate a suite of unit tests that will be used to validate the function, please include edge cases that you consider useful, like testing strings with no printable characters, numbers and other primitives, etc.
After that, please, update the index-html file to add material ui library and create a form.

The form will have the following components ordered from top to bottom:
- a title "Reverse String", you might use H1 tags for that
- a text field with a placeholder; that text fiel will be used as the input for our screen
- then we will have a button with the label "Reverse" and a related icon
-after that we will have a label component that will display the reversed string once a user clicks on the Reverse button (using our reverseString function.

### Prompt 2:

I forgot asking you for a button to copy, please use a secondary-button style and the "copy" label and a related icon for that button and create a function to copy the reversed string to the clipboard.

### Prompt 3:

Now, can you go ahead and put all the JavaScript in the file `script.js`? Please also make sure to show me the updated `index.html`, create unit tests, and JSDocs for all the JavaScript functions.

### Prompt 4:

Very good, some minor details: let's make sure that all the tests are inside a file called `script.test.js` and they are called after initialization.

### Prompt 5:

For this code:

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reverse String</title>    

    <!-- Material-UI CSS -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <!-- Material-UI JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

    <!-- Custom CSS -->
    <style>
        .container {
            margin-top: 50px;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Reverse String</h1>
    <div class="row">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <input id="inputText" type="text" class="validate" placeholder="Enter a string">
                    <label for="inputText">Input String</label>
                </div>
            </div>
            <div class="row">
                <button id="reverseBtn" class="btn waves-effect waves-light" type="button" onclick="reverseString()">Reverse
                    <i class="material-icons right">send</i>
                </button>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="outputText" type="text" class="validate" disabled>
                    <label for="outputText">Reversed String</label>
                </div>
            </div>
            <div class="row">
                <button id="copyBtn" class="btn waves-effect waves-light secondary-button" type="button" onclick="copyToClipboard()">Copy
                    <i class="material-icons right">file_copy</i>
                </button>
            </div>
        </form>
    </div>
</div>

<script src="script.js"></script>
<script src="script.test.js"></script>
</body>
</html>
```

Can you include valid and significant icon names? Right now all I see on the front end side are "send" where the send icon should be, and "file_copy" where the file copy icon should be.

Remember that you have already imported the Font Awesome library, so pick some icon from there.

### Prompt 6:

Something is odd, looks like when we call the function `reverseString` on line 35, we are not sending any param; we should be sending the string that we input on line 30, right?

### Prompt 7:

Let's rollback that last one and instead of adding a param, create a wrapper for the `reverseString` function where we grab the prop directly from the element; something similar to what we are doing on the first couple of lines for the `copyToClipboard` function.

### Prompt 8:

The `copyToClipboard` function is not working, I get the following message:
The signature '(commandId: string, showUI?: boolean | undefined, value?: string | undefined): boolean' of 'document.execCommand' is deprecated.

### Prompt 9:

 Can you beautify this .md file?