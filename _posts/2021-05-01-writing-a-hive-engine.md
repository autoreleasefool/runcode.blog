---
layout: post
permalink: /posts/writing-a-hive-engine
title: "Creating the Hive Mind — Writing a Hive Engine"
date: 2021-05-01T16:00:00+00:00
tags: hive-mind swift artificial-intelligence board-games
---

This post is the 1st post in my series [Creating the Hive Mind — Building an AI for the board game Hive](/posts/creating-the-hive-mind). If you're unfamiliar with the topic, start at the beginning and work your way through. Feel free to reach out to me on [Mastodon](https://iosdev.space/@autoreleasefool) if you need any clarification or have any suggestions!

## Getting started

My first step in writing the Hive Mind, was to create a robust implementation of the rules of the game, so the AI can play within the rules. If the AI must constantly explore moves it can't legally make, a lot of time and resources are wasted, and it could end up choosing a move that isn't even valid.

There's one thing I want to mention before diving in, if you plan on creating your own AI, or your own game engine. When I created the first version of the Hive Mind, it was _slow_. Measuring its performance and looking for bottlenecks lead me to the game engine. It's important to remember throughout this process that while the AI is looking for strong positions as a result of specific moves, it's making heavy use of the engine constantly, to ensure it plays within the rules of the game. If there's one place to look for performance improvements, it'll likely be in the game's engine. Though you don't want worries about the performance preventing you from making further progress on your own AI, keeping this in mind when you get started could save you the headaches I had.

## The Game State

The primary class in the Hive Engine is the `GameState`. It represents a singular state of a game of Hive, and offers methods for mutation. With the `GameState`, I can perform 3 things:

- Enumerate all valid moves in any valid game state
- Consume a movement and update the state accordingly
- Track the history of moves made, and undo those moves

Let's consider a typical game of Hive. What does the board look like at the start of a game? Each player has 11 pieces to play (not considering the expansions). White will move first. There's only one position they can play, since wherever the first piece gets placed becomes the origin for the rest of the game. All of these elements make up the `GameState`

### Representing the board

To represent the state of a game of Hive, we need to know:

- Which pieces have been played, by which player
- Where they currently sit on board
- Whose turn it is

There's a couple other things we'll need to track (mainly for the expansions), but that's the gist! Each of the classes we use are described below.

### Units

All of the pieces in the game are represented by the `Unit` class. A `Unit` has an `index`, a `class` and an `owner`. The `class` defines what type of bug a `Unit` represents, and lets the engine determine which moves it can make. The `owner` is simply which player, Black or White, owns the piece. And finally, the `index`, lets the engine differentiate between units of an identical class.

### Positions

A `Position` defines a space on the board where a `Unit` can be placed. Since pieces can be stacked, at each `Position` in the `GameState`, there's a stack of `Unit`s.

`Position`s rely on a hexagonal grid system, inspired by an [excellent article](https://www.redblobgames.com/grids/hexagons/) by Red Blog Games. Details on the grid system implementation can be found [here](https://www.redblobgames.com/grids/hexagons/implementation.html). Currently, the engine relies on the grid system based in 3-dimensional coordinates, but in the future I intend to explore relative positioning, as a potential optimization.

#### Changing positions

In the game of Hive, there are a couple rules one must follow when moving a piece from one `Position` to another. The `Position` class defines the rules, and uses an instance of a `GameState` to determine where the pieces sit, and if a movement from one `Position` to another is feasible.

The **freedom of movement** rule limits movements between `Position`s based on the stacks surrounding the two `Position`s in question. At least one of those stacks can't be taller than both the start `Position` and end `Position`, or the movement isn't allowed.

The **one hive** rule limits the movements of a piece when moving it would cause a stack at a `Position` to become empty, and create disconnect in the board. If you imagine the board as a graph, it must always remain a single, connected graph.

## Enumerating movements

For the Hive Mind to be able to explore various states and determine which move is the best to make in a given situation, it must be able to determine valid movements in any given state. The `GameState` class therefore offers the `availableMoves` property, which enumerate all possible movements for each `Unit` to any `Position` it can feasibly be moved to that turn. There are 4 types of movements, represented in the `Movement` enumeration:

1. `.move(unit:to:)` specifies that a given `Unit` be moved to a given `Position`
2. `.place(unit:at:)` specifies that a given `Unit` be placed at a given `Position`
3. `.yoink(pillBug:unit:to)` is a special `Movement` type, reserved for games with the Pill Bug expansion. It specifies that a given Pill Bug is being used to move another `Unit` to a certain `Position`
4. `.pass`, which is only available when no other moves are possible, and specifies that a player has no valid moves in the current state, and must secede their turn.

Each `Unit` is responsible for determining which moves it can make in any given state. The `Unit` class has a function `moves(as:in:moveSet)` which uses the `Class` of a `Unit` to figure out which moves are valid. These moves, across all the pieces on the board, are combined in the `GameState` property `availableMoves`. My intention for the Hive Mind is to make heavy use of this property, so it can weigh the effectiveness of all the available moves, and select the best one. Therefore, I've tried to add some optimizations in the engine around this property, but there's still lots of room for improvement.

## Testing

Finally, in order to ensure the Hive Mind is only exploring valid move, while also considering _all possible_ valid moves, I've created a rigorous test suite for the engine. With the test suite, I've tried to create a number of various situations each piece might find themselves in, then ensure it enumerates all of the valid positions, and no invalid ones. For each piece, there's a corresponding `Unit+PieceNameTests.swift` that describes all of the tests pertaining to that particular piece and how it might move around the board.

There are a number of tests for the `GameState` as well that simply verify its functionality in various scenarios.

Finally, the Hive Engine relies on [Perft Tests](https://www.chessprogramming.org/Perft) as a final validation step for its move generator. Jon Thysell has created an excellent central resource for Perft validation in Hive, which you can find [here](https://github.com/jonthysell/Mzinga/wiki/Perft). Unfortunately, as of writing this, the Hive Engine lacks the performance capabilities, and I lack a good enough computer, to run the full Perft suite in a reasonable time to fully verify the engine's results

## Wrap up

That's it for this post! I hope to continue writing about my Hive Engine and, eventually, the Hive Mind. You can find the source for the Hive Engine on [GitHub](https://github.com/autoreleasefool/hive-engine)

- Lost? Start at the beginning: [Creating the Hive Mind — Building an AI for the board game Hive](/posts/creating-the-hive-mind)
