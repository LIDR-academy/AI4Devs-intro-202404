# Arkanoid Game Documentation

## Overview

This document provides essential information about the Arkanoid-style game developed using HTML, CSS, and JavaScript. It outlines the game's rules, controls, and how to play, ensuring that players can quickly understand and enjoy the game.

## Game Description

Arkanoid is a brick-breaking game where the player controls a paddle with the aim of bouncing a ball towards a layer of bricks at the top of the screen. The goal is to break all the bricks without letting the ball fall below the paddle.

## Rules

1. **Start of the Game**: The game begins with the ball placed in the center of the paddle, ready to be launched.
2. **Objective**: The player needs to break all the bricks by hitting them with the ball. Each brick requires one hit to break.
3. **Scoring**: Each row of bricks has a different point value. The upper rows have higher point values than the lower ones. Points increase from the bottom up, starting from 10 points per brick in the bottom row to 80 points in the top row.
4. **Game Over**: The game ends if the ball passes the paddle and hits the bottom of the screen. The player can then restart the game.

## Controls

- **Move Left**: Press the left arrow key (`←`) to move the paddle left.
- **Move Right**: Press the right arrow key (`→`) to move the paddle right.
- **Launch Ball**: Press the `Enter` key to launch the ball from the paddle at the start of the game or to start the game after a game over.

## How to Play

1. **Launching the Ball**: At the beginning of the game, press `Enter` to launch the ball upwards towards the bricks.
2. **Moving the Paddle**: Use the arrow keys to move the paddle left and right to keep the ball in play and direct it towards the bricks.
3. **Breaking Bricks**: Aim the ball to collide with the bricks. Each brick broken will increase your score according to its point value.
4. **Keeping the Ball in Play**: Ensure the ball does not pass the paddle. The game will end if the ball falls below the paddle level.
5. **Restarting the Game**: If the game ends, press the "Volver a jugar" (Play Again) button that appears to restart the game.

## Development Tools

This game was developed using:

- HTML5 for the structure
- CSS3 for styling
- Vanilla JavaScript for gameplay logic

## Local Storage

The game utilizes local storage to save high scores. Each player can enter their initials when they achieve a high score to see their name in the high scores table.

## Conclusion

Enjoy playing the game and try to break all the bricks! For developers, feel free to explore the code and enhance the game further.
