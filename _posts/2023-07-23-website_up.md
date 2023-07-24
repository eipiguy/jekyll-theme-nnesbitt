---
layout: post
author: eipiguy
title: Website Is Up
color: green
tags: [Post, website, planning, goals, jekyll]
excerpt_separator: <!--more-->
---

## How many times have I done this?

I'd say that third time is the charm, but I think we're past 3 by now. I want a website so bad. A clean one that's easy to make, and I think the time has finally come! =D

<!--more-->

1. I tried hardcoding, and it's a steep learning curve, though it's the cleanest I've ever kept things. I want to aim at that again, but I need something up that I can maintain and add to easily.

2. I tried WordPress because I likes how sleek it looks, and how ubiquitous it is. But it also has a steep learning curve, and I can't do all the coding things that I want to do with it.

3. This site is made with Jekyll, which turns markdown documents into HTML (which was kind of the point of markdown in the first place). It works quite well. You find a theme, and then tweak it to your needs, and it often has all the bells and whistles you want out of a modern website by default.

### I'm going to plug for markdown again

Nadia has a mantra she shared with me at one point I've really enjoyed. It was meant in terms of organizing systems, but like all things, I stretch it's intent as much as I can:

>Make it easy to put away.

This is such a big deal because it stops you from accumulating. If it's hard to find things, that can be dealt with, but if it's hard to put them away, you'll never enter anything into the system in the first place.

**Markdown makes it easy to put away notes digitally**

## Now it's time to polish

With something worthwhile in place, the activation energy is done, and the rest is just polishing. We'll approach equilibrium over time, hopefully.

So now what? What can you expect here?

## Demos

The main thing I want to do is have some way of making little games and things. Javascript is the easiest for webpages in that way, so I'm aiming at using [p5js](https://p5js.org/) to handle a lot of the overhead for me.

[For example:]()

<script src="//toolness.github.io/p5.js-widget/p5-widget.js"></script>
<script type="text/p5" data-autoplay data-preview-width="400" data-height="600">
function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}
</script>

## Where I want to be

Current website goals:

- credentials
- fun
- publicity
- weekly-ish devlogs to challenge myself

I'm not quite sure what I want to work on next. Check out my [projects](/projects/) page if you want to see my last update on how things fit together.
