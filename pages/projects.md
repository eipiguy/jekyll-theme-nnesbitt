---
layout: page
author: eipiguy
title: Projects
permalink: /projects/
feature-img: "assets/img/portfolio/ttt.png"
img: "assets/img/portfolio/ttt.png"
date: 2023-07-22
---

## Connections

[**Status Report**](#report)

<div class="mermaid">
flowchart LR

  website(["Website\n 😄 🍞 🐁 ⏰"])
  resume(["Resume\n 🫤 🍞 🐁 🎄"])

  subgraph games["Games"]
    jackofalltrades("Jack of All Trades\n 😄 🍞 🐁 🚀")
    spacewhales("SpaceWhales!\n 😄 🍞 🐉 ✈️")
  end

  subgraph cellularstates["Cellular State Machines"]
    farmersoldier("Farmer/Soldier\n 😄 🍞 🐁 🚀")
    inclusionsfront["Inclusions Frontend\n 🫤 🍞 🐉 ✈️"]
  end
  inclusionsback(["Inclusions Backend\n 🫤 🍞 🐉 🎄"])

  website---resume
  website-.-games
  website-.-cellularstates

  inclusionsfront-.-inclusionsback

  graphchat("GraphChat\n 😄 🍞 🐉 ✈️")
  imagetournament("Image Tournament\n 😄 🍞 🐁 🚀")
  monotextdisplay("Monotext Display\n 😄 🍞 🐁 ✈️")
  spellbook("Spellbook\n 😄 🍞 🐁 ✈️")
  roleplay("Roleplay\n 😄 🍞 🐉 🚌")
  planning(["Planning\n 🫤 🍞 🐁 📆"])

  graphchat-.-imagetournament
  graphchat-.-monotextdisplay
  graphchat-.-spellbook
  graphchat-.-roleplay
  graphchat-.-planning

  roleplay-.-planning

  imagetournament-.-spellbook
  monotextdisplay-.-spellbook

  planning-.-spellbook

  handwriting("Handwriting\n 🫤 🍞 🐉 ✈️")
  pnggcode("PNG to GCode\n 🫤 🥩 🐁 🚀")

  handwriting-.-pnggcode

  table(["Table\n 🫤 💍 🐁 🎄"])
  trains("TTrack Trains\n 😄 💍 🐁 ✈️")
  treeclimber["Tree Climber\n 😄 💍 🐉 ✈️"]
  trees("Model Trees\n 😄 🥩 🐉 ✈️")

  trains-.-table
  trains-.-trees
  treeclimber-.-trees
</div>

## Metrics

| Metric \\ Cost  |  1  |  2  |  3  |
|:---             |:---:|:---:|:---:|
| Excitement      |  😄  |  🫤  |  😓  |
| Cost            |  🥩  |  🍞  |  💍  |
| Complexity      |  🐁  |  🐉  |  ☠️  |
| Duration        |  🚀  |  ✈️  |  🚌  |
| Maintenance     |  🎄  |  📆  |  ⏰  |

### Legend

- Excitement
  1. 😄 smile = passionate
  2. 🫤 face_with_diagonal_mouth = meh
  3. 😓 sweat = chore
- Cost
  1. 🥩 cut_of_meat = profitable
  2. 🍞 bread = cheap
  3. 💍 ring = expensive
- Complexity
  1. 🐁 mouse2 = easy
  2. 🐉 dragon = challenging
  3. ☠️ skull_and_crossbones = extreme
- Duration
  1. 🚀 rocket = less than weeks up front
  2. ✈️ airplane = months up front
  3. 🚌 bus = years up front
- Progress
  1. ([rounded box]) = working deliverable
  2. (semi-rounded box) = making progress
  3. [square box] = new idea
- Maintenance
  1. 🎄 christmas_tree = up to yearly maintenance
  2. 📆 calendar = monthly maintenance
  3. ⏰ alarm_clock = more than weekly maintenance

## Report

### Usable

| Project | Excitement | Cost  | Complexity | Maintenance |
| :--     | :---:      | :---: | :---:      | :---:       |
| Website | 😄 | 🍞 | 🐁 | ⏰ |
| Planning | 🫤 | 🍞 | 🐁 | 📆 |
| Resume | 🫤 | 🍞 | 🐁 | 🎄 |
| Table | 🫤 | 💍 | 🐁 | 🎄 |
| Inclusions Back | 🫤 | 🍞 | 🐉 | 🎄 |

- [Website](/portfolio/website/) - my publicly facing website to have fun and show off
- Planning - the process of coming up with and organizing plans
- [Resume](/portfolio/resume/) - professional achievements formatted for printing
- Table - woodworking & design for living/dining room low table
- Inclusions Back - diffusion, advection, reaction system with statistical inclusions

### Under Construction

| Project | Excitement | Cost  | Complexity | Maintenance |
| :--     | :---:      | :---: | :---:      | :---:       |
| Image Tournament | 😄 | 🍞 | 🐁 | 🚀 |
| Iconography | 🫤 | 🍞 | 🐁 | 🚀 |
| Jack of All Trades | 😄 | 🍞 | 🐁 | 🚀 |
| SpaceWhales! | 😄 | 🍞 | 🐉 | ✈️ |
| Farmer/Soldier | 😄 | 🍞 | 🐁 | 🚀 |
| GraphChat | 😄 | 🍞 | 🐉 | ✈️ |
| Monotext Display | 😄 | 🍞 | 🐁 | ✈️ |
| Spellbook | 😄 | 🍞 | 🐁 | ✈️ |
| Roleplay | 😄 | 🍞 | 🐉 | 🚌 |
| PNG to GCode | 🫤 | 🥩 | 🐁 | 🚀 |
| TTrack Trains | 😄 | 💍 | 🐁 | ✈️ |
| Model Trees | 😄 | 🥩 | 🐉 | ✈️ |
| Handwriting | 🫤 | 🍞 | 🐉 | ✈️ |

- Image Tournament - gamify prioritization from a folder of pictures
- Iconography - custom icons, avatars, and etc for website and more
- Jack of All Trades - 2 player, euchre-like, trick-taking game
- SpaceWhales! - 2d kerbal space program without the construction
- Farmer/Soldier - predator/prey cell state game/simulation
- GraphChat - chat/forum/directory/dependency diagram navigator
- Monotext Display - ASCII art display/editor in the style of vim
- Spellbook - Dresden's skull as a chatbot, armed with my knowledge
- Roleplay - spotify for the mind with roleplay as the medium
- PNG to GCode - convert rasterized images into paths for plotting
- TTrack Trains - server-style rack of ttrack modules for the tree
- Model Trees - artificial tree generator for 3d printing miniatures
- Handwriting - personalized OCR

### Potentials

| Project | Excitement | Cost  | Complexity | Maintenance |
| :--     | :---:      | :---: | :---:      | :---:       |
| Tree Climber | 😄 | 💍 | 🐉 | ✈️ |
| Inclusions Front | 🫤 | 🍞 | 🐉 | ✈️ |

- Tree Climber - camera eyes on a "circular tree centipede"
- Inclusions Front - manipulator for inclusions simulation

## New Ideas

- BegleriBot - animatronic fingers that can do begleri tricks
- Backgammon Board - full size board with leather surface and decorative inlay
- Cheap Polarimeter - polarized camera for imaging and characterization
- LED Cube - classic 3D LED display firmware project
- Spell Looker - track your style for AI image generation
- Digestion Timer - stopwatch to measure processing times
- Tie Dye - making a tie dying workflow for the apartment
- Pit Reload - funnel/reload mechanism for a standard mason jar cherry pitter
- Resources - generalizing the "nutrient" problem: needs vs resources
- Absurdist Kettle - stove-top demonstration industrial boiler
- Everybody Wins - you can only move others, but win or lose yourself
- Spool - 3d lidar projector/scanner that spins like wrapping a spool or bobbin
