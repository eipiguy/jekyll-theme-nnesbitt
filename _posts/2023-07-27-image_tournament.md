---
layout: post
author: eipiguy
title: Image Tournament
color: orange
tags: [Post, image, rank, rate, compare, preferences, p5js, midjourney]
midjourney_logo_gallery_path: "/docs/midjourney/midjourney/"
excerpt_separator: <!--more-->
---
<script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"></script>

How do you decide what you like? You hit a like button!
On the other hand, what if you want everything? ...and so a method is necessary to tame the madness.

Come with me in our first step towards an adventure of preferences!

## Some prelimenaries

Do you know what an "**ordered list**" is?

- It sounds straightforward
- Except you know it may not be
- Otherwise, why would I be asking?

The punchline is the mathematical jargon "[ordering](https://mathworld.wolfram.com/OrderedSet.html)", and I would like to expand *our* word to include its mathematical cousin, the "[*partial* ordering](https://mathworld.wolfram.com/PartiallyOrderedSet.html)".

Now you might say to yourself, "How can you *partially* put things in order? Just sort *some* of them?"

That, dear friends, is the correct answer.

<!--more-->

## Which ones do you like best?

So first things first, let's say that you have a directory full of images. This seems to happen quite frequently for me: pictures I want to choose for my office, logos or designs for a project.

My latest one was my oldest child wanting everything in the toy store. Our solution was to make a "tournament bracket" with printouts of those images, taped to a wall.

![tournament bracket](/docs/imagetournament/tournament_bracket.jpg)

At each bracket we asked, "Which do you like better?" and then that one would "win".

## Sounds easy enough...

So I've primed you to think tournaments and comparisons, but let's go back to basics a sec.

What are we trying to end up with here? You might imagine just "ordering" or "placing" your items in a theoretical line from "best" to "worst", whatever that means.

It's definitely my first instinct! But something seems off about it:

<div class="mermaid">
graph LR

best["Best"]-->good["Good"]-->dots["..."]-->bad["Bad"]-->worst["Worst"]
</div>

If we start with a "bag" of images in no particular order, how would you figure out where to start? What if there were 100 images? 1000? What if groups of 20+ are all essentially the same image with only small variations?

Do all those images really end up in a neat little line from shortest to tallest? I feel like there's some subtlety in the structure we've overlooked.

## Behold, my stuff!

So, now that I've sown seeds of both promise and doubt in your mind, let us see how they grow.

![Behold, my stuff!](/docs/memes/behold.png)

Maybe a grid of drag and drop images *is* best. You act as your own sorting algorithm, no comparisons necessary:

<div id='grid-container'></div>
<script defer src="/docs/imagetournament/dragImageGrid.js"></script>
<script defer src="/docs/imagetournament/imagetournament_grid.js"></script>

But it's a lot to hold in your head, and there are a lot of problems I can immediately start listing:

- You're prejudiced by the shape of the container you present them in and where/how the images are presented.
- What even are the potential relationships between all possible preferences?
- What about consistency? How do you know there even *is* a "best" or a "worst"? Maybe it's a rock, paper, scissors game. Are we forcing a ranking that might be better set up differently?
- Eyesight? How do you even look close enough to see what the images are at all when you have to fit so many in your field of view?

Scroll bars make me dizzy, and I don't want to click buttons to needlessly scroll either. Maybe there's just too much to do all at once. We need to break the problem down.

## Ready? Fight!

So, my second thought is, "This is what [sorting algorithms](https://en.wikipedia.org/wiki/Sorting_algorithm) are designed to do! Minimize the number of comparisons needed to figure out that line!"

I have a sneaking suspicion that n-up comparisons might be faster and potentially more reliable... if we're clever about how we use them.

Let's take that grid and pull out only a couple images at a time. Then we can have an "image tournament" like I did with my kids.

<div id='nup-container'></div>
<script defer src="/docs/imagetournament/cell_grid.js"></script>
<script defer src="/docs/imagetournament/click_image_grid.js"></script>
<script defer src="/docs/imagetournament/imagetournament_compare.js"></script>

But what is a partial ordering?! Come back next time to find out. ;)

## Additional Thoughts

### Non-Comparison Sorting

It comes to mind that there are other ways of sorting things, too. Why am I so stuck in comparison mode? Midjourney uses a 4-up style system. Is that better than 2-up? These n-up choices really form a branching tree where at each split they produce n-"child" choices. They're experimenting with the size of their grid too, so that's not set in stone as the "optimal".

I had never thought of "non-comparison sorts" either until I opened that wiki link above. Now that I think about it, most apps do use a 0-5 stars system of rating things, and that's not direct comparison at all. It's more like a "1-up". It presents a choice of "rating" rather than "ranking".

I suppose one can be derived from the other... can't it? I think that may be worth exploring. Are they equivalent or equally useful? In what circumstances? Can they be combined?

## Code

Here's the throw-together jank that makes the above work. Please excuse the rank smell emanating from all my code samples. At this stage of my life, I care more about getting something usable out into the world than making it perfect the first time. I can put in more time later if I have it and decide the effort is worthwhile.

I've divided the code into files, separating the grid functionality into its own class in an attempt to make it reusable.

[**One file for the draggable grid:**](/docs/imagetournament/dragImageGrid.js)

```javascript
```

[**One file for the script that calls it:**](/docs/imagetournament/dragImageGrid.js)

```javascript
```

[But they were, all of them, deceived, for another file was made.]()

I then stick it into this markdown document by attaching it to the container mentioned in that second file, `canvas.parent('container');`. You also need a way to get p5js online to run the scripts, so I normally include a script link at the top of my files.

```html
# Jekyll FTW!
---
header tags here
---
<script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"></script>

some content here...

<div id='container'></div>
<script src="/docs/imagetournament/dragImageGrid_snap.js"></script>
<script src="/docs/imagetournament/imagetournament_drag_grid.js"></script>

some more content here...
```

I'm going to add a unit test file at some point as well (if I can figure out the correct way to do that in javascript). I've been trying to use popular and well developed libraries like [gtest](https://github.com/google/googletest) and [unittest](https://docs.python.org/3/library/unittest.html) more regularly in my other projects. Test driven development is what enables further work to be done. Without it, no one wants to look at your tangled knot of a repo.

And while I don't like dependencies, or buying into big company ecosystems, testing frameworks seem hard enough to make correctly in a way that grows well and plays well with others, that I feel like I might as well not reinvent the wheel.
