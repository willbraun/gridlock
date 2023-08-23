# Overview

Gridlock is a 2-player number strategy game. A friend showed me this game on a whiteboard a few years ago, and I thought it would be fun to create a digital version. The game runs entirely in the browser so it can be played offline once the page is loaded. I designed this for mobile, but it will work on any size screen.

Play here - [gridlock.willbraun.dev](https://gridlock.willbraun.dev)

I am most proud of the "Computer - Hard" mode in Settings. It is an AI that I created to play against you, and it is quite a challenge! I modeled the AI after chess engines, and it uses a minimax algorithm, alpha-beta pruning, and an evaluation function. Ask me about it if you're curious!

# Rules

-   Gridlock starts with a 6x6 grid of all numbers 1-9 multiplied together - 1 (1x1), 2 (1x2), up to 81 (9x9).
-   On the first turn, a player picks two numbers, each between 1 and 9, and will claim the square in the grid that matches the product of those numbers.
-   On each turn after that, the player must pick one of the two factors from the previous turn and multiply it by a new factor (1-9) and claim the square in the grid that the product equals.
-   The first player to get 4 squares in a row horizontally, vertically, or diagonally wins.
-   The game is a draw if either player has no available moves.

# Gameplay

-   The border of the grid will show whose turn it is (red or blue). Red goes first.
-   Players can select either the yellow factors or the yellow squares in the grid.
-   Once they've made their selection, they can confirm and the turn will change to the other player.
-   The red player is randomly decided when playing vs the computer.

Be mindful of what numbers you select for your opponent to use on their turn!

# Settings

-   Play Against - choose your opponent
    -   Human (local) - Play a person using the same device
    -   Computer - Easy - Play against an easy computer player
    -   Computer - Hard - Play against the AI. Good luck!
-   Grid Layout - how the numbers are displayed in the grid
    -   Classic - in order from 1 to 81
    -   Random - shuffled differently for a new challenge each game

# Technologies Used

HTML, CSS, JavaScript, React, React Bootstrap, Netlify
