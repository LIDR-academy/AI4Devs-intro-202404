# Create a stopwatch function. 

## User History:

Template para Crear la Historia de Usuario:

#Initial prompt
As a Java Developer,
I want to create a countdown function in javascript,
so that I can count down the time.

## Acceptance Criteria:

1. We have a first screen, that do the below actions:
	1.1 *principal box*, that is light blue color. 
	1.2. In *principal box* we have the numbers 'HH:MM:SS' and milliseconds 'mmm'.
	1.3. The millisecond are below to the right of the 'HH:MM:SS' 
	1.4. We have numeric keypad buttons, that goes to the number O to the 9, with that buttons we could initiate the counter. 
	1.5. We have 2 buttons, 'Set' and 'Clear'. 
	1.6. The button 'Set' is green color.
	1.7. Buttons should be below the *principal box* and alligned each other in two lines, first line: 9, 8, 7, 6, 5, 'Clear' and second line: 0, 1, 2, 3, 4, 'Set'. There is one button per number.
	1.7. The button 'Clear' is grey color. And reset the number 'HH:MM:SS' to '00:00:00' and milliseconds 'mmm' to '000'
	1.8. When a button number is clicked the numbers 'HH:MM:SS' move to the right to left dynamically. Exemple: fist select 1, that is '00:00:01' then if we type button 9, that will apear in '00:00:19'.
	1.8. When we select 'Set' a new screen is open, with a secont sreen. 
2. In that second screen we have: 
	2.1. a *principal box*, that is light blue color. With the number 'HH:MM:SS' indicated in first scren when select button 'Set'   
	2.2. A  button Start with color blue, that button initiate countdown.
	2.3. Next to the button 'Start' we have the 'Clear' button.
	2.4. Once you click the 'Start' button, the button's name changes from 'Start' to 'Pause'. And the color of button change to color blue to color green.
	2.5. When you select 'Pause' stop the clock. And the btton change the name to 'Pause' to 'Continue', and color to the 'green' to 'blue'
	2.6 The button Clear, do to actions: reset the counter to the initial value selected with button 'Set'. And change the button 'Continue' o 'Pause' to 'Start'
	2.7 We have a Button with a name '<-- Back' that return you to the first screan. And the counter 'HH:MM:SS': '00:00:00' 


[Output](https://chat.openai.com/share/edb70d8c-f3d4-4e99-a3e6-2cf7b4467f49)
