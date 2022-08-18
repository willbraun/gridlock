# Overview

Gridlock is a 2-player number game involving geometry and multiplication. A friend showed me this game on a whiteboard a few years ago, and I thought it would be fun to create a digital version. This game runs entirely in the browser so two people can play on one device. I designed this for mobile, but it will work on any size screen. 

Play here - https://willbraun.github.io/gridlock/

# Rules

- Gridlock starts with 6x6 grid of all numbers 1-9 multiplied together - 1 (1x1), 2 (1x2), up to 81 (9x9).
- On the first turn, a player picks two numbers, each between 1 and 9, and will claim the square in the grid that matches the product of those numbers. 
- On each turn after that, the player must pick one of the two factors from the previous turn and multiply it by a new factor (1-9) and claim the square in the grid that the product equals. 
- The first player to get 4 squares in a row horizontally, vertially, or diagonally wins. 
- The game is a draw if either player has no available moves. 

# Gameplay

The border of the grid will show whose turn it is (red or blue). Red goes first. Players can select either the yellow factors or the yellow squares in the grid. Once they've made their selection, they can confirm and the turn will change to the other player. 

Be mindful of what numbers you select for your opponent to use on their turn!

# Settings

- Grid Layout - how the numbers are displayed in the grid
    - Classic - in order from 1 to 81
    - Random - shuffled differently for a new challenge each game

# Technologies Used

HTML, CSS, JavaScript, React, React Bootstrap, Github Pages