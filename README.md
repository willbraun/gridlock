# Overview

Gridlock is a simple 2-player number game involving geometry and multiplication. I've played this game on paper many times, and wanted to make it a browser game that can be played by two people on one device. 

# Rules

- Gridlock starts with 6x6 grid of all numbers 1-9 multiplied together, from 1 (1x1) to 81 (9x9), and all products in between. 
- On the first turn a player picks two numbers, each between 1 and 9, and they will claim the square in the grid that matches the product of those numbers. 
- On each turn after that, the player must pick one of the two factors from the previous turn and multiply it by a new factor (1-9) and claim the square that the product equals. 
- The first player to get 4 squares in a row horizontally, vertially, or diagonally wins. 
- The game is a draw if either player has no more available moves. 

# Gameplay

The border of the grid will show whose turn it is (red or blue). Red goes first. Players can select either the yellow factors or the yellow squares in the grid. Once they've made their selection, they can confirm and change turns to the other player. 

# Technologies Used

React, JavaScript, HTML, CSS