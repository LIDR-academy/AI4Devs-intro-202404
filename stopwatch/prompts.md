# Chatbot: ChatGPT 3.5

## First prompt

Take on the rol of an experienced frontend developer, you have to create a web application with two functionalities the first one is a stopwatch and the second one is a timer.

The app have and initial screen that shows both actions: stopwatch and timer, this actions can be clickable by the user, once selected most open a dialog or modal with the functionality screen:

1. stopwatch: this screen most display hours, minutes and seconds y most have three actions:
- Start: to start or resume the stopwatch
- Reset: to reset the stopwatch
- Stop: to stop de stopwatch

2. timer: this screen most display select fields, seconds, minutes and hours those fields can be selected or edited by the user in order to start the timer there should be a start button and in order to cancel a cancel button; once the timer is running the start button most hide and show a pause button, if user click pause button it most pause de timer and change the label to resume, when click on resume the timer most resume. when the timer have been started it should show a countdown.

when navigating to one of the options (stopwatch/timer) the active screen most show a navbar that allows the user to click and toggle to the inactive option.

You have to use html, css, and javascript to build the app, keep the code documented and organized, the app most be responsive for mobile and desktop devices.  you can use any popular frontend framework to achieve this goal.

## Second prompt

Now that you have the basic implementation, you should implement the timer and stopwatch  functionality/logic also add the event listeners for timer and stopwatch buttons.

## Third prompt

for timer functionality add the following improvements:

1. Add milliseconds field
2. Set default hour, minutes, second and milliseconds values to 0
3. If timer is running: hide start button and show pause button
4. if pause button is clicked it most pause the timer, hide start and pause button and show resume button
5. if resumed button is clicked resume timer, hide resume button and show pause button

## Fourth prompt

Pause or Resume buttons are not displaying when timer is running, can you fix it.

## fifth prompt

great! now you have to make de following ui improvements using css or bootstrap framework:

1. Timer section:
- Use a larger font size for timer
- Use green color for Start and Resume buttons
- Use gold color for Pause Button
- Center form and place labels under the input fields

2. Stopwatch
-  Use a larger font size for stopwatch