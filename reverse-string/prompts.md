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

third prompt:

now, can you go ahead and put all the javascript on the file scripts.js?. Please also make sure to show me the updated index.html, create unit tests and JSDocs for all the javascript functions.


fourth prompt:
very good, some minor details:  let's make sure that all the tests are inside a file called scrpit.test.js and they are called after initialization.

fifth prompt:

for this code:

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

Can you include valid and significant icon names? right now all I see on the front end side are "send" where the send icon should be, and "file_copy" where the file copy icon should be.

Remember that you have already imported the font awesome library, so pick some icon from there