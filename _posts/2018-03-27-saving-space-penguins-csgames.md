---
layout: post
permalink: /posts/saving-space-penguins-csgames
title: "Saving Space Penguins at CS Games 2018"
date: 2018-03-27 00:00:00 +0000
feature_image: /assets/posts/saving-space-penguins-csgames-header.jpg
tags: conference ios security competition
---

This past weekend the annual CS Games event took place in Quebec City, hosted by Université Laval. I didn't originally plan on attending, but am very thankful a friend convinced me to pick up a ticket a month ago!

CS Games is a competition that takes place every year where nearly 40 teams from schools across Canada (and the University of Rochester, from New York) meet for a weekend to face one another in a variety of Computer Science related challenges. The challenges are all created by students of the hosting schools, or by companies which sponsor the event. There were 17 competitions held throughout the weekend, made for 2 or 3 participants from each team of 10 students. Prizes were awarded for each competition, as well as for the overall winners of the event.

You can learn more about CS Games for yourself at their website, [csgames.org](http://csgames.org/corpo/) or from the 2018 CS Games site, [2018.csgames.org](http://2018.csgames.org/)

Last year I participated in 3 challenges, the Artificial Intelligence challenge, the Sports challenge, and the Mirego Mobile challenge. This year, I competed in 4, and was scheduled to compete in a challenge in every possible time slot. It was a crazy weekend, with little sleep, but I had an absolute bast.

In the end, I took home 2nd place for the Mirego mobile challenge, and placed 23rd in AI, 14th in Relay, and 10th in security. You can read about each of the challenges I participated in below to learn more about the structure, my team's approach, and how we stacked up against the competition.

## Artificial Intelligence Challenge

The AI challenge was one of the first challenges to take place, beginning at 6:30 on Friday night, just after all of the teams had arrived.

The challenge was to build a bot which would compete in a tournament against the bots of each other team. The scenario was that there were various material deposits strewn across a map, with each bot beginning in its base a distance away from the materials. Each bot could move North, South, East or West, move on top of materials and collect, attack in any direction, or move back to their base to heal. To earn points, your bot had to return to its base and store the materials it had collected, at which time your points would be awarded. The bot with the most points after 1,000 turns is declared the victor!

Overall, both teams from the University of Ottawa thought the event went really well. All 4 of us began working on our 2 bots at 6:30, but continued until 5 in the morning! Our strategy was to sit on a material deposit and collect material until we had just enough turns left to return to our base and drop of the materials for our points near the last turn. If the material we wanted to collect was blocked by another bot, we would attack, and if we were attacked, we would wait until our health was low, back off, heal, and return. The amount of material you could collect from a deposit also varied, so we tracked how much each bot got from their material deposits, and went to the one which offered the most points vs distance from our own base.

In the end, we were pretty disappointed with our results. We thought we had written really impressive bots, and weren't sure why our bot hadn't made it into the top 4. It actually ended up placing 23rd out of 29 teams, which was not at all what we expected. But these things happen!

If you want to see our bot, you can check out the source code [here!](https://github.com/autoreleasefool/csgames18-ai)

## Relay Programming Challenge

The Relay programming challenge was one that none of us were prepared for. Nobody from either uOttawa team had much experience with any of the long list of required languages and dependencies — Java Spring, Zuul, Eureka, and more.

This challenge was basically a wash. We weren't sure what we were doing most of the time, and we aren't even sure we actually accomplished any of the tasks at the end! But that's alright. We never expected to do well in this competition anyway!

We placed 14th out of 29 teams, actually not a bad result for the amount of work we did.

## Security Challenge

The security challenge was another challenge where my partner and I had little knowledge of the required languages and domains. Rust, x86, ARM, and .NET Core were among the list, none of which either of us had ever done any work with in the past.

However, that didn't stop us! The challenge was basically to look for exploits in a number of binary files and web services in order to discover flags. The more flags you found, the better, and the less people people found those same flags, the more points you got for them.

In the end, we found 3 flags! All from the web services exploits. Unfortunately, neither my partner nor I had much experience at all working with binary files, so those challenges were way too much for us!

Our team placed 10th out of 29 teams, just behind the University of Ottawa's A team in 9th place.

## Mirego Mobile Challenge

Finally, mobile! This was the challenge I was most excited for. I competed last year with a minimal amount of iOS experience, and some Android experience, but I just wasn't familiar with the infrastructure that Mirego (the challenge sponsors and creators) built the skeleton app with.

This year, the challenge revolved around the theme of helping the penguins from space repair their ship with parts scattered across the city. An API endpoint was provided to retrieve a list of parts, their descriptions, their image, and the location of the part.

With this list of parts, each team had to alter the provided skeleton app to implement as many features as they could to help the penguins find the parts they needed to repair their ship. Their suggested list of features included:

- Displaying the list of parts using reusable cells
- Show pins on a map for the parts based on their location provided by the endpoint
- Add filtering to the list of parts
- Show the location of the parts through the camera in AR

Over the course of 3 hours, my partner and I were able to accomplish the first 2 tasks nearly entirely — we had a list of parts displayed, you could select them and get descriptions, and the cells were complete reusable. We also got a map showing all of the locations for items. My partner was also a whiz with location, and we were able to display the distance between ourselves and all the items, as well as get the addresses of items when available.

Two things we were a bit disappointed to not complete were tapping a pin on the map to display a description of the part, and filtering the list. The former is actually fairly simple, it just slipped my mind to implement. The latter ended up being much tougher, owing to a the fact that I've just not had any experience with `UISearchController`.

Overall, we were really proud of our app! We ended up placing 2nd and were definitely satisfied with our results.

![Picture of me holding a trophy](/assets/posts/saving-space-penguins-csgames-trophy.jpg)

<figcaption>Picture of me holding a trophy</figcaption>

If you want to see our 2nd place app, you can check it out [here!](https://github.com/autoreleasefool/csgames18-mobile)

## uOttawa's results

The University of Ottawa had a successful CS Games, taking home 1 first place trophy, 2 for 2nd place, and 1 in 3rd.

![4 trophies won by uOttawa](/assets/posts/saving-space-penguins-csgames-trophies.jpg)

<figcaption>4 trophies won by uOttawa</figcaption>

Our A team placed 9th overall, and our B team placed 16th, out of 29 teams! A bit disappointing considering our 2nd place result in 2017, but these things happen!

## My final year as a competitor

Unfortunately, next year I won't be able to attend CS Games as a competitor, since I'll have graduated by then. However, CS Games allows each team to bring 1 mentor, a "Godfather" to the team, and I hope I get the opportunity to continue participating in the future! While I won't be able to participate in any of the competitions, there are events and challenges that take place throughout the weekend that will help keep me busy!
