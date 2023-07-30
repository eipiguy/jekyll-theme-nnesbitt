---
layout: post
title: Website
feature-img: "assets/img/portfolio/cabin.png"
img: "assets/img/portfolio/cabin.png"
date: 2023-07-24
tags: [about, credentials, planning]
---

All things change, and all things in this document and its template will evolve over time. Keep records when things go unexpectedly.

## Current Intent

What's the idea? What are you currently trying to do? What are you trying to get out of the whole thing?

- Front End: Public half of "Single Source of Truth"
- Log and Planning
- Code Demos
- Publicity

## Inspiration

You'll be reinventing the wheel if you don't go to the market and see what other people have already done.

- [Happy Coding](https://happycoding.io/) is a little boxy, but one of the few "blogs" with working demos

There aren't a lot, and that's the problem.

## Off Ramp

What is the bare minimum it takes to have a "usable" result? Without an off ramp you're investing in a new lifestyle.

- Active log with at least a hundred posts.
- All "Projects" up to date
- Scripts in place to convert internal logs to webpages
- Metric/Report updating with scripts to main diagram

## Goals

- [x] Website Up
  - [x] Portfolio Graph
  - [x] Dev-Log
  - [x] Resume
- [ ] 100+ Dev-Log Posts
  - [ ] Each with a code demo
  - [ ] Analytics Framework
- [ ] Portfolio Pages Up To Date
- [ ] Script to convert logs to web format
- [ ] Script to sync project diagram

> *Tasks* age like milk, not like wine.

Only schedule what is necessary. Ideas go in an "IDEAS.md" file, not the road-map. Select tasks from the pool of ideas.

## Constraints

No recurring costs without income.

I don't see the infinite scroll as a viable design, everything needs an end; an off ramp. Mobile first is the correct design strategy though.

- I like simple, no extra junk: ie, single column, hidden menu, paginated. Terminating scroll
- Must have a dark mode and a light mode that doesn't kill your eyes
  - [gruvbox](https://github.com/morhetz/gruvbox) is currently my favorite color scheme
  - [solarized](https://ethanschoonover.com/solarized/) has great design philosophy, but doesn't take eye strain into account. (Too much blue for me)
- Full [Mermaid][mermaid] support is a must. Diagrams are too important to visualization, and they are the best solution hands down.
- Live code demos are also a must. I have to easily be able to embed code that can be run as in-browser javascript. I've taken to [p5js][p5js] for now as my goto front-end language
  - The point is interactivity. This website should not be a passive experience. Learning is not a passive experience.

### Dependencies

[tos]: <https://github.com/sylhare/Type-on-Strap> "Type-on-Strap"
[jekyll]: <https://jekyllrb.com/> "Jekyll"
[md]: <https://www.markdownguide.org/> "Markdown"
[mermaid]: <https://mermaid.js.org/> "Mermaid"
[p5js]: <https://p5js.org/> "p5.js"
