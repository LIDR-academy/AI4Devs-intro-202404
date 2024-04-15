/****************************/
CHATGPT 3.5 PROMPT:
https://chat.openai.com/share/40d282e7-a1fc-4cb9-873a-aeb2c44ae1ac
/****************************/

# TIMER PROJECT
The objective of the Timer Project is to build a software solution that will display a Timer on screen controlled by two buttons, one for start and continue functionality and other for reset functionality.
This project will have html, javascript and css components. Initially we have two elements: [index.html] and [script.js].
This is the content in [index.html]:
```
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
```
The file [script.js] is empty and we need to create in it the javascript variables and functions that will be used by the buttons in [index.html].
There is no [styles.css] file but it will be needed for front end style.

## FRONT END DESING
In the [index.html] file we need to display a timer control consisting in a container with a textbox and a second container with two buttons of the same size. Both containers' size must occupy all the large of a cellphone screen and be responsive, with all the styling residing in the [styles.css] file.
### [txtTimer]: TEXTBOX FOR TIMER DISPLAY
- The [txtTimer] textbox will be read only.
- The [txtTimer] textbox will show timer values in a "hh:mm:ss:fff" string format.
- The [txtTimer] textbox style will be a light blue background color, blue margin and bold black text.
### [btnStart]: BUTTON FOR START AND CONTINUE FUNCTIONALITY
- The [btnStart] button will display "Start" label initially.
- The [btnStart] button will be green color.
### [btnReset]: BUTTON FOR RESET FUNCTIONALITY
- The [btnReset] button will display "Clear" label.
- The [btnReset] button will be red color.

## BUSINNESS LOGIC
The functionality for this Timer Project will reside in the [script.js] file, it'll be triggered by the buttons in the [index.html] and it'll be displayed on the [txtTimer] textbox.
### START AND CONTINUE FUNCTIONALITY
- When [btnStart] button has been clicked then initilalize a clock timer and change the label on [btnStart] button from "Start" to "Pause" text.
- If the [btnStart] button is clicked again while has the "Pause" text on it, then the clock timer will be paused, the [btnStart] button will change to light blue color and its label text will be "Continue".
- If the [btnStart] button is clicked again while has the "Continue" text on it, then the clock timer will run again from the values where it was paused, then the button will change to green color and its label text will be "Pause".
### RESET FUNCTIONALITY
- In any moment that the "Clear" button is clicked then the clock timer will be stopped and its values turned to zero, so the the [btnStart] button will be again the green color and with the label text "Start", and the [btnReset] button will have red color and the label text "Clear".
### DISPLAYING THE CLOCK TIMER
- The clock timer value will be diplayed on the textbox [txtTimer] in every moment, whether when it is stopped or when it is running.

# INSTRUCTIONS
Write the code for the previous Timer Project and its mentioned functionality on the listed files, and consider the best practices in design (the best UX practices like responsiveness and styling with css functionalities) and secutiry.













/****************************/
/****************************/
ORIGINAL CHATGPT 3.5 PROMPT:
/****************************/
/****************************/
In an initial software project we have two elements: [index.html] and [script.js].

This is the content in [index.html]:
```
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
```
The file [script.js] is empty and we need to create in it the javascript variables and functions that will be used by the buttons in [index.html].

The functionality for this project will be a Timer: When "Start" button has been clicked then initilalize a clock timer that will be diplayed on the textbox as time passes, and the button will change from "Start" text to "Pause". If the button is clicked again while has the "Pause" text on it, then the clock timer will be stopped and the button will change to blue color and its text will be "Continue". If the button is clicked again while has the "Continue" text on it, then the clock timer will run again from the values where it was stopped and its values will be diplayed on the textbox as time passes, then the button will change from "Continue" text to "Pause". In any moment that the "Clear" button is clicked then the clock timer will be stopped and its values turned to zero, so the textbox will show again the "00:00:00:000" string, and the buttons will be again the green button for "Start" and the red button for "Clear".

Write the code for the mentioned functionality on the files listed, and consider the best practices in design (the best UX practices like responsiveness and styling with css functionalities) and secutiry.

In this html file we need to display a timer control consisting in a textbox and two buttons. The textbox will be read only, blue color and will show the "00:00:00:000" string. Below the textbox there will be two buttons: a green button for "Start" and a red button for "Clear".
/****************************/
/****************************/


/****************************/
/****************************/
# OBSERVATIONS FOR TIMER PROJECT
The Timer project has been deployed and tested. Here are the observations that need to be resolved.

## POOR FRONT END DESING
- The textbox is currently white color: blue color has been required.
- The textbox currently has its text in blue color: black color is needed for its text.
- The textbox needs to be in a greater font and to have a black border with rounded corners.
- The buttons are in line with the textbox: The buttons need to be below the textbox.
- The buttons needs to have the same size in every moment and to have rounded corners.

## TIMER DISPLAY ERROR
- When "Start" button is clicked there is nothing currently displayed on the textbox: the running value for hours, minutes, seconds and milliseconds should be displaying in the textbox.
/****************************/
/****************************/


/****************************/
/****************************/
# OBSERVATIONS FOR TIMER PROJECT - SECOND TEST ITERATION
The Timer project has been deployed and tested. Here are the observations that need to be resolved.

## POOR FRONT END DESING
- The buttons are in line with the textbox: The buttons need to be below the textbox.

## TIMER DISPLAY ERROR
- When "Start" button is clicked there is nothing currently displayed on the textbox: the running value for hours, minutes, seconds and milliseconds should be displaying in the textbox.
- We need that the javascripts functions implement [console.log] functionalities in order to check if the timer is running when buttons has been clicked.
/****************************/
/****************************/



/****************************/
/****************************/
# OBSERVATIONS FOR TIMER PROJECT - THIRD TEST ITERATION
The Timer project has been deployed and tested. Here are the observations that need to be resolved.

## TIMER DISPLAY ERROR
- When "Start" button is clicked there is nothing currently displayed on the textbox: the running value for hours, minutes, seconds and milliseconds should be displaying in the textbox.
- We need that the javascripts functions implement [console.log] functionalities displaying timer running on console when buttons has been clicked.
/****************************/
/****************************/

