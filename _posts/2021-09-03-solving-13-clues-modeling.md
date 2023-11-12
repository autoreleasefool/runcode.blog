---
layout: post
permalink: /posts/solving-13-clues-modeling
title: "Solving 13 Clues, Part 1 — Modeling the game"
date: 2021-09-03T10:30:00-07:00
feature_image: /assets/posts/solving-13-clues-modeling-header.png
tags: board-games swift

---

This series details how I built a solver for the game of [13 Clues](https://boardgamegeek.com/boardgame/208766/13-clues). From modeling the game, to the various solver approaches, and discovering the ideal move each turn.

_This is the first post in a series of 3 describing my process while building a solver for the board game 13 Clues. For the next 2 posts, skip to the end._

In July of 2021 [BoardGameArena](https://en.boardgamearena.com) published a new game to their site, 13 Clues. I thought it might be fun to try and create an app that can solve the mystery (or at least get close to solving it)! This post documents that process, and goes over how the final app, as of this article's publication, handles this problem. If you want to take a look at the app at any time, it's currently open sourced on [GitHub](https://github.com/autoreleasefool/fourteenth-clue), with the solver logic in the [FourteenthClueKit library](https://github.com/autoreleasefool/fourteenth-clue-kit).

First, some background: [13 Clues](https://boardgamegeek.com/boardgame/208766/13-clues) is a deduction game that first came out in 2016. In this game, each player has a unique Clue-esque mystery they must solve. A player can see all the mysteries of the other players, but cannot see their own. Additionally, each player has 2 cards which are visible only to themselves. By asking one another about what types of cards they can and cannot see, a player must deduce which cards are in their own private mystery, before any other play can sus out their own.

This process-of-elimination style of gameplay, and the simple structure of the game's setup, made this seem like an ideal game to replicate and try to build a solver that could, hopefully, out-perform any human player. In this post, I'll walk through how I modeled the game's state and built the [FourteenthClueKit](https://github.com/autoreleasefool/fourteenth-clue-kit) and [Fourteenth Clue](https://github.com/autoreleasefool/fourteenth-clue) app. The subsequent posts will look at the strategies I explored for solving the game, and what I eventually settled on, as well as a look at how the solver also recommends the best possible question to ask in order to improve your knowledge of the game the most.

## Modeling the Game

_This section refers to the [FourteenthClueKit](https://github.com/autoreleasefool/fourteenth-clue-kit), a Swift library for solving games of 13 Clues._

13 Clues is actually a fairly straightforward game to model.

The main state is kept in `GameState`, which has 4 properties, `players`, `secretInformants`, `cards` and `actions`.

A `Player` has a `MysteryCardSet`, a `HiddenCardSet`, and a number of `magnifyingGlasses`. A `MysteryCardSet` represents a player's unique mystery, with a `person`, a `location` and a `weapon`. A `HiddenCardSet` has a `left` and a `right` property, representing the two cards every player has hidden, visible only to themselves. A player's `magnifyingGlasses` property simply tracks the number of magnifying glasses a player should have at any given time.

In games with less than 6 players, there are additionally a number of `SecretInformant`s, which add an extra layer to the game, as you can either inquire what cards other players can see, or look at a `SecretInformant` and take a peek at a card. A `SecretInformant` is just a single `Card`, either revealed or not.

There are 30 possible cards, represented by a `Card` enum, each with a `category`, and a `color`. Categories can be either a `person`, `location`, or `weapon`, and there are subcategories for each (`man` or `woman`, `indoors` or `outdoors`, `ranged` or `melee`, respectively). Depending on the number of players, only a subset of the cards are used.

Finally, the game progresses by player taking `Action`s, either by making `Inquisition`s or `Accusation`s, or by an `Examination` of a `SecretInformant`. An `Inquisition` represents one player asking another "how many of X do you see?". They could ask about a `color` or a `category`, and the player must answer truthfully, counting the cards they see around the table, including their own hidden cards. An `Accusation` comes when a player believes they have solved their own mystery, and they state which person, location, and weapon they believe make up their mystery. Finally, if a player decides to look at a `SecretInformant`, then that's an `Examination`.

## Fourteenth Clue

_This section refers to the [Fourteenth Clue](https://github.com/autoreleasefool/fourteenth-clue), app, a repository of UIs for interacting with the modeled state of a game. There is an iOS app, as well as a CLI app, written in Swift._

There are 3 components to the 13 Clues Solver, affectionately named **Fourteenth Clue** — a library, which handles the solving logic, and 2 separate front-end components (an iOS app, and a Command-Line Interface). You can choose either way to interact with the solver.

The app and CLI are made to be simple and effective for recording a game's state as it progresses. The app is built with SwiftUI and Combine, and the CLI with simple Swift. I won't talk too much about it's architecture or any engineering challenges, because they're very simple UIs built to accept very structured input, in order to output very simple states! The following section simply walks through utilizing either the app or the CLI, with up-to-date instructions available in the [README](https://github.com/autoreleasefool/fourteenth-clue).

### iOS App

If you're using the iOS app to solve your game of 13 Clues, then you can read the following section on how to get your game's state loaded into the app, ready for solving. An introduction to the CLI will follow this section. If you're just interested in the meat of the solver, then you can jump ahead to the next post in the series, [_Coming soon: Solving 13 Clues, Part 2 — Approaches to solving a mystery_](/posts/solving-13-clues-approaches)

The initial state is built in the `GameBuilder` view, which primarily accepts a JSON object that you can get from a BoardGameArena game following these steps

1. Once the game starts, the first thing you'll need to do is choose 3 cards to hand to another player as their mystery. While this screen is available, open your web browser's console and paste the following:

```javascript
var initialGameStateForCopy = null;
var orig = gameui.notif_onCombinaisonAssigned;
gameui.notif_onCombinaisonAssigned = function (e) {
  try {
    console.log(e.args.visible_cards_players);
    initialGameStateForCopy = JSON.stringify(e.args.visible_cards_players);
    console.log(initialGameStateForCopy)
    orig.call(this, e);
  } catch (e) {
    console.log("error: " + e);
  }
}
```

2. After you start the game, note the output with each player's state, that'll look somewhat similar to the following, and copy it into the text area at the bottom of the `GameBuilder`:

```javascript
{
  "85268622":[{"name":"Officer"},{"name":"Sword"},{"name":"Park"}],
  "87792535":[{"name":"Duke"},{"name":"Harbor"},{"name":"Blowgun"}],
  "87978988":[{"name":"Countess"},{"name":"Library"},{"name":"Knife"}],
  "88584546":[{"name":"Butcher"},{"name":"Nurse"}]
}
```

![A screenshot of the app showing the text field where the JSON should be pasted](/assets/posts/solving-13-clues-modeling-gamebuilder.png)

<figcaption>A screenshot of the app showing the text field where the JSON should be pasted</figcaption>

You can also update player names at this time, so you don't have to try and recognize them from their numerical IDs. You won't need to worry about these IDs from this point forward (so long as each player's name is unique).

3. From there, you can start the game in Fourteenth Clue, and you'll see a state similar to the one presented to you in BoardGameArena.

![A screenshot of the app showing the initial state of a game](/assets/posts/solving-13-clues-modeling-gamestate.png)

<figcaption>A screenshot of the app showing the initial state of a game</figcaption>

Once you have the initial state of the game set up, you can continue to modify the state through the UI:

- Change a player's mystery or hidden cards by tapping the card position and selecting a new card from the list that appears.
- Add a new `Inquisition`, `Accusation`, or `Examination` by tapping "Add action" and completing the form presented.
- Reveal a `SecretInformant` by tapping the informant's position and selecting which card it represents from the list that appears.

As you modify the state, recording the clues that are asked and answered during the course of the game, the app will attempt to calculate the most likely solution to your mystery, through the approaches described in the next post, [_Coming soon: Solving 13 Clues, Part 2 — Approaches to solving a mystery_](/posts/solving-13-clues-approaches). As it determines the most likely solution, it will surface them in the UI. Similarly, the app will recommend actions for you to take when it's your turn, as discussed in the third post, [_Coming soon: Solving 13 Clues, Part 3 — Asking the right questions_](/posts/solving-13-clues-questions).

### CLI

If you're using the CLI to solve your game of 13 Clues, then you can read the following section on how to get your game's state loaded, ready for solving. If you're just interested in the meat of the solver, then you can jump ahead to the next post in the series, _Coming soon:_ Solving 13 Clues, Part 2 — Approaches to solving a mystery

The initial state is built and modified by the `Engine`, which primarily accepts a JSON object that you can get from a BoardGameArena game following these steps:

1. Once the game starts, the first thing you'll need to do is choose 3 cards to hand to another player as their mystery. While this screen is available, open your web browser's console and paste the following:

```javascript
var initialGameStateForCopy = null;
var orig = gameui.notif_onCombinaisonAssigned;
gameui.notif_onCombinaisonAssigned = function (e) {
  try {
    console.log(e.args.visible_cards_players);
    initialGameStateForCopy = JSON.stringify(e.args.visible_cards_players);
    console.log(initialGameStateForCopy)
    orig.call(this, e);
  } catch (e) {
    console.log("error: " + e);
  }
}
```

2. After you start the game, note the output with each player's state, that'll look somewhat similar to the following:

```javascript
{
  "85268622":[{"name":"Officer"},{"name":"Sword"},{"name":"Park"}],
  "87792535":[{"name":"Duke"},{"name":"Harbor"},{"name":"Blowgun"}],
  "87978988":[{"name":"Countess"},{"name":"Library"},{"name":"Knife"}],
  "88584546":[{"name":"Butcher"},{"name":"Nurse"}]
}
```

Pass the output to the `fourteenth-clue` command

`$ fourteenth-clue --initial-state '{"85268622":[{"name":"Officer"},{"name":"Sword"},{"name":"Park"}],"87792535":[{"name":"Duke"},{"name":"Harbor"},{"name":"Blowgun"}],"87978988":[{"name":"Countess"},{"name":"Library"},{"name":"Knife"}],"88584546":[{"name":"Butcher"},{"name":"Nurse"}]}'`

3. From there, `fourteenth-clue` will wait and listen to further input. You can check out the project's [README](https://github.com/autoreleasefool/fourteenth-clue) for more information on using the CLI.

## Next Steps

This concludes the first post in this series, _Solving 13 Clues_. We learned how we are going to model the state of the game, as well as how we'll load the state into the app so we can manipulate it. In the next post we'll look at some approaches to actually solving the game.

**Up next:** [_Coming soon: Solving 13 Clues, Part 2 — Approaches to solving a mystery_](/posts/solving-13-clues-approaches)

You can find all the parts in this series below:

1. [Solving 13 Clues, Part 1 — Modeling the game](#)
2. [_Coming soon: Solving 13 Clues, Part 2 — Approaches to solving a mystery_](/posts/solving-13-clues-approaches)
3. [_Coming soon: Solving 13 Clues, Part 3 — Asking the right questions_](/posts/solving-13-clues-questions)
