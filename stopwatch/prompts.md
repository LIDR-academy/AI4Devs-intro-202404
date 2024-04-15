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

This is how it is looking right now, it should rather look like the first image I uploaded. One button to the left side, the other to the right side
(Attached screenshot of the current looking)

===========================

Ok better looking but both buttons should be placed below the time display

===========================

Start and clear buttons are no longer working due to the following JS error:

Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')

===========================

Change the button's colour when it's in "Pause" to green and to blue when in "Continue" or "Start"

===========================

Ok now it is looking well, I only need blue colour when it is displaying "Continue"

===========================

Ok, now back to the main screen. I asked two features but only described one. The second feature is the one should appear independently of the "stopwatch", when clicking on "Countdown". Please adhere to the following design in attached image. Expand the existing  HTML, CSS and JS. Also include a "Back" button like we have for the "Stopwatch" feature
(attached screenshot of the display time and keyboard of the countdown as seen in the website https://www.online-stopwatch.com/)

===========================

Now add a new screen that will be displayed when clicking on "Countdown". It will contain
- The same time display as the "Stopwatch".
- Below it, a row of buttons, each button being a digit, from 5 to 9, then a button "Set". All these buttons in green colour.
- Below them, a second row of buttons, from 0 to 4 (in green colour), and a button "Clear" (in grey colour)
- The digit buttons will preset the value of the time display, starting from the second digit of seconds. Each new digit will be set at the rightest side again and will shift the existing to the left
- Once the desired digits are set, clicking on "Set button" will make the screen to appear the same buttons as the "Stopwatch", but the time will go backwards this time

===========================

Please split the html file into 2 pieces as part of it is here missing

===========================

the second file is cut at the level of button of 3 digit

===========================

ok so now I have the following
```code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Timer and Countdown</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="container mt-3">
    <div class="row">
        <div class="col text-center">
            <h1 class="display-4">Timer and Countdown</h1>
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-lg btn-success mx-2" id="stopwatchBtn">
            Stopwatch
          </button>
          <button type="button" class="btn btn-lg btn-warning mx-2" id="countdownBtn">
            Countdown
          </button>
            </div>
        </div>
    </div>
</div>
<div id="stopwatch" class="container mt-5 d-none">
    <div class="row">
      <div class="col-md-auto bg-dark text-white rounded px-4 py-2 d-flex align-items-center">
            <h1 class="display-1" id="time">00:00:00</h1>
            <p id="milliseconds">000</p>
      </div>
      <div class="col-md-auto d-flex justify-content-end">
        <button type="button" class="btn btn-lg btn-success me-2" id="startBtn">Start</button>
        <button type="button" class="btn btn-lg btn-danger" id="clearBtn">Clear</button>
    </div>
    </div>
  </div>
  <div id="countdown" class="container mt-5 d-none">
    <div class="row">
      <div class="col-md-auto d-flex justify-content-center">
        <input type="number" id="minutesInput" class="form-control mx-2" placeholder="Minutes">
        <input type="number" id="secondsInput" class="form-control mx-2" placeholder="Seconds">
      </div>
      <div class="col-md-auto d-flex justify-content-center">
        <button type="button" class="btn btn-lg btn-warning" id="setCountdownBtn">Set</button>
      </div>
      </div>
    <div class="row mt-3">
      <div class="col text-center">
        <h1 class="display-1" id="countdownDisplay">00:00</h1>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col text-center">
        <button type="button" class="btn btn-lg btn-danger" id="clearCountdownBtn">Clear</button>
        </div>
    </div>

</div>
<div class="row">
  <div class="col text-center">
    <h1 class="display-1" id="countdownDisplay">00:00</h1>
  </div>
</div>
<div class="row mt-3">
  <div class="col d-flex justify-content-between">
    <button type="button" class="btn btn-success btn-lg mx-1" id="btn5">5</button>
    <button type="button" class="btn btn-success btn-lg mx-1" id="btn6">6</button>
    <button type="button" class="btn btn-success btn-lg mx-1" id="btn7">7</button>
    <button type="button" class="btn btn-success btn-lg mx-1" id="btn8">8</button>
    <button type="button" class="btn btn-success btn-lg mx-1" id="btn9">9</button>
    <button type="button" class="btn btn-success btn-lg mx-1" id="btnSet">Set</button>
  </div>
</div>
<div class="row mt-3">
  <div class="col d-flex justify-content-between">
    <button type="button" class="btn btn-success btn-lg mx-1" id="btn0">0</button>
    <button type="button" class="btn btn-success btn-lg mx-1" id="btn1">1</button>
    <button type="button" class="btn btn-success btn-lg mx-1" id="btn2">2</button>
    <button type="button" class="btn btn-success btn-lg mx-1" id="btn3">3</button>
    <button type="button" class="btn btn-success btn-lg mx-1" id="btn4">4</button>
    <button type="button" class="btn btn-secondary btn-lg mx-1" id="btnClear">Clear</button>
  </div>
</div>

  <div id="backBtnContainer" class="d-flex justify-content-center mt-5">
    <button type="button" class="btn btn-secondary btn-lg" id="backBtn">Back</button>
  </div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="script.js"></script>
</body>
</html>
```

maybe i have pasted it wrongly, but both stopwatch and countdown needs to be hidden by default. Only when you click on the button, it displays one of the two

===========================

tell me which is the line is hiding it because I don't see it

===========================

how can I group the buttons so they stick together rather than expanding to the whole width of the page?

===========================

Add to the existing code so each digit button modifies the time set

===========================

Ok now when I set the values in the countdown, they are displayed correctly, but once I press "Set" button, NaN:NaN is displayed. Why is that? Seems the function updateCountdownDisplay is not working correctly

===========================

please give me the details of how to add this setInterval within an event listener of the "Set" button

===========================




I have manually moved the section with the buttons of digits and set+clear into `div id="stopwatch"`



