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

(Attached file "stopwatch.png")

===========================

Got the following error in the JS console of the browser:
Failed to find a valid digest in the 'integrity' attribute for resource 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js' with computed SHA-384 integrity 

===========================

This is looking good already. Now the landing page it is missing the green button should say "Stopwatch"

===========================

Thanks, when I press "start" the time will start running in real time. Also, the button will change to the follow status (upon each click):
"Pause" (green colour button) => "Continue" (blue colour button) => "Pause" (green colour button)
When pressing the button if it displays "Pause", it will pause counting, leaving the figure exactly at that instant. Pressing the button if it displays "Continue" it will resume the counting

Also, the clear button pauses the time counter (if not paused yet) and resets the counter to 0. It makes the other button to turn green and "Start".

Generate all the html, Javascript and CSS changes needed for this

===========================

Nothing happens when I press start. Where is the issue?

===========================

Ok now it is working, but 1000 milliseconds are actually taking much longer to lapse, maybe something like 5 seconds

===========================

Can you align the "Start" and "Clear" buttons with the display of the time?

===========================


===========================







