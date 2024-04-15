I want to create a frontend page, take the following as a starting point:

````html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Timer and Countdown</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1>Timer and Countdown</h1>
<script src="script.js"></script>
</body>
</html>
````

that will contain two features, each of the accesible by a big icon:
* A stopwatch, the icon will be a green big arrow facing up
* A countdown, the icon will be a red big arrow facing up

Clicking on each icon will bring me to the feature which will be displayed. It will appear also a Back button at the bottom left corner of the page

# The stopwatch
* The time being displayed will have the format HH:mm:ss in font size 40, having below the seconds and aligned to the right, the milliseconds (3 digits and font size 14).
* The time will be wrapped with a black, rounded, border
* Start button will be below of the time, on the left side. Its text will be black font size 25, the background will be green colour.
* Clear button will be same level as the Start button but aligned to the right. Its text will be black font size 25, the background will be red colour.
# The countdown

# Additional considerations
Both features will be made of the same style and using similar esthetic style as Bootstrap (getbootstrap.com)
Include the JS needed into a separate `script.js` or propose aditional files if needed
