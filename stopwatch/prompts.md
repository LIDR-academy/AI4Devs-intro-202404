# Vanilla JavaScript StopWatch App
# Chatbot: Claude 3 + ChatGPT 3.5

## Implementation details
1. I started giving **Claude 3** the [first prompt](#first-prompt). It gave me a first approach with several bugs.
2. I continued fixing all the bugs but one of them was missing after several attempts: the `start/pause` feature.
3. I decided to give **ChatGPT 3.5** the [first prompt](#first-prompt) for the purpose of comparing results.
4. It gave me a more accurate solution with a bug-free `start/pause` feature.
5. I passed the working logic to **Claude 3** and performed a prompt-based comparison between the working and the non-working solution.
6. The **Claude 3** model could finally find the missing part of the code but only after giving him a working solution from another LLM model (**chatGPT 3.5**).

---
* Complete Claude 3 conversation: [click here](https://claude.ai/chat/b6c33b38-14d1-47d6-8e23-a1ba78e0f8bf)
* Complete ChatGPT conversation: [click here](https://chat.openai.com/share/3e1b2381-be5c-4e9e-bd64-bdb90a64846b)
---
## First prompt
Write a vanilla JavaScript app with the following characteristics:

**Context**

1. Develop a web-based stopwatch
2. Use the attached image as reference for the design and styling. The three small zeros at the bottom-right side of the countdown are for displaying the milliseconds
3. The stopwatch must be in HH:MM:SS time format
4. You are provided with the following html basic structure:
  ```html
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

5. The JavaScript logic must be decoupled from the html in a `script.js` file
6. The CSS styling must be decoupled from the html in a `styles.css` file

**Specifications**

1. The initial view must be as close as possible to the reference image provided in the context section
2. When user clicks on the “start” button:
    - The stopwatch should start counting time
    - The “Start” button should change it’s text to “Pause”
    - The background color should remain unchanged
3. When user clicks again on the “Pause” button (initially the “Start” button):
    - Counting time should pause counting time
    - Button text should change to “Continue”
    - The background color should change to blue with a vertical gradient from light to dark intensity
4. When user clicks again on the “Continue” button (previously the “Pause” button):
    - The stopwatch should continue counting time
    - Button text should change to “Pause” again
    - The background color should change to the original green color
    - The button behavior should be the same as on the previous step (step 3 of this specification section)
5. When user clicks on the “clear” button:
    1. If the stopwatch is running, the counting time should be reset to zero and the “Start” button remains as it is
    2. If the stopwatch is paused, the counting time should be reset to zero and the “Continue” button should change its text to “Start”. The blue color with vertical gradient should remain as it is indicating the user that the stopwatch has already been used.

**Desired outcome**

- An `index.html` file keeping the original structure provided using semantic HTML and accessibility best practices.
- An `script.js` file including the JavaScript logic using only web components and OOP. Detailed code comment should be included.
- An `styles.css` file including the CSS styling.

