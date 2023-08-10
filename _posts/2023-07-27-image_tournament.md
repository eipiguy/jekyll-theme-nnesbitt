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

Do you know what an "**ordered list**" is?

- It sounds straightforward
- Except you know it may not be
- Otherwise, why would I be asking?

The punchline is that I'm talking about the mathematical jargon term for an "[ordering](https://mathworld.wolfram.com/OrderedSet.html)", and I would like to expand our word to include its mathematical cousin, the "[*partial* ordering](https://mathworld.wolfram.com/PartiallyOrderedSet.html)".

Now you might say to yourself, "How can you *partially* put things in order? Just sort *some* of them?"

That, dear friends, is the correct answer.

<!--more-->

## Which ones do you like best?

Let's say that you have a directory full of images. Like say [the one I have for midjourneyed project logos]()!

This particular set happens to come from [my MidJourney adventures]() into trying to make a logo for [my MidJourney adventures project](). So meta! =P

{% include gallery.html gallery_path=page.midjourney_logo_gallery_path %}

*- Now that's a lot of images!*

But...

### Which ones do you like best?

You might imagine just "ordering", or "placing", them in a theoretical line from "best" to "worst", whatever that means, and then trying to sort out what position things should be in all at once. It's definitely my first instinct, but something seems off about it:

<div class="mermaid">
graph LR

best["Best"]-->good["Good"]-->dots["..."]-->bad["Bad"]-->worst["Worst"]
</div>

If we start with a "bag" of images we gather and stick in a directory in no particular order, how would you figure out which ones are the best? What if there were 100 images? 1000? What if groups of 20+ are all essentially the same image with only small variations?

Is this really the right structure for encompassing the relationships between the preferences?

## Behold, my stuff!

This project actually came from my daughter's insatiable love of everything she sees. ;)

Now we have a system: we go through the toy store (or Claires), and take pictures of everything she wants and can afford. We print out little pictures of all those images that we tape to the wall, or a mirror, or window in a tournament-style bracketing system!

Pick pairs and ask "do you like this one or this one better?". Give yourself a loser bracket as well. Semi-finals come and you'll have substantial desires emerging from the rest.

## Sorting is comparing ...right?

So, my second instinct is ["that is what sorting algorithms are designed to do!"](https://en.wikipedia.org/wiki/Sorting_algorithm), we want to minimize the number of comparisons needed to figure out that line!

But this is assuming you *want* a computer's help with the sorting process. You now reading this on a computer of some sort, supposedly, so not doing it with a computer is a bit moot. But you know what I mean: the computer's help with the *sorting system*, not the act of using a computer to do virtual work.

Maybe a grid of drag and drop images is best. You act as your own sorting algorithm, no comparisons necessary.

<div id='grid-container'></div>
<script defer src="/docs/imagetournament/dragImageGrid.js"></script>
<script defer src="/docs/imagetournament/imagetournament_grid.js"></script>

But it's a lot to hold in your head. You're prejudiced by the shape of the container you present them in and where/how the images are presented. How do you look close enough to see what the images are at all when you have to fit so many in your field of view? A scroll bar makes me dizzy, and I don't want to click buttons to needlessly scroll either.

There's just too much to do all at once. We need to break the problem down.

I have a sneaking suspicion n-up comparisons might be faster and potentially more reliable if we're clever anyway.

### Non-Comparison Sorting

But it comes to mind that there are other ways of sorting things, too. Why am I so stuck in comparison mode? Midjourney uses a 4-up style system, so that' what I've gotten stuck in lately. These n-up choices really form a branching tree where at each split they produce n-"child" choices. They're experimenting with the size of their grid too, so that's not set in stone as the "optimal".

I had never thought of "non-comparison sorts" either until I opened that wiki link above, and now that I think about it, most apps do use a 0-5 stars system of rating things. That's not direct comparison at all. It's more like a "1-up". It presents a choice of "rating" rather than "ranking".

I suppose one can be derived from the other... can't it? I guess that's essentially what we're exploring here.\
Are they equivalent or equally useful? In what circumstances? Can they be combined?

I will have to admit to being a novice in these things as we move forward. I'm sure some of you may have more experience than I do. Feel free to skip anything you find silly or old hat. ;)

## Let the computer do the work

So let's try to break the problem down in the easiest way first. We'll pick our favorite sorting algorithm and replace the comparison callbacks.

Instead of checking if one element is "less than" the other automatically, which doesn't mean much yet, we'll prompt the user at each comparison to rank the two current images. We'll use "bigger means better" as our guiding design, and then we can order the images in a line using the same method the sorting algorithm does.

Maybe we can make a tournament for the sorting algorithms too! ...idk, that sounds like work. <_<

<div id='nup-container'></div>
<script defer src="/docs/imagetournament/imagetournament_compare.js"></script>

> Here's the gpt + 4 * (cleaning + refactor), throw-together jank that makes the above work. Please excuse the rank smell emanating from all my code samples. At this stage of my life, I care more about getting something usable out into the world than making it perfect the first time. I can put in more time later if I have it and decide the effort is worthwhile.
>
>I've divided this code into 2 files, separating the grid functionality into its own class in an attempt to make it reusable.

[**One file for the draggable grid:**](/docs/imagetournament/dragImageGrid.js)

```javascript
```

[**One file for the script that calls it:**](/docs/imagetournament/dragImageGrid.js)

```javascript
```

[But they were, all of them, deceived, for another file was made.]()

I then stick it into this markdown document by attaching it to the container mentioned in that second file, `canvas.parent('container');`. You also need a way to get p5js online to run the scripts, so I normally include a script link at the top of my files.

```html
...header tags here...
<script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"></script>

...some content here...

<div id='container'></div>
<script src="/docs/imagetournament/dragImageGrid_snap.js"></script>
<script src="/docs/imagetournament/imagetournament_drag_grid.js"></script>

...some more content here...
```

I'm going to add a unit test file at some point as well (if I can figure out the correct way to do that in javascript). I've been trying to use [gtest](https://github.com/google/googletest) and [unittest](https://docs.python.org/3/library/unittest.html) more regularly in my other projects. Test driven development is what enables further work to be done. Without it, no one wants to look at your tangled knot of a repo.

And while I don't like dependencies, or buying into big company ecosystems, testing frameworks seem hard enough to make correctly in a way that grows well, that I feel like I might as well not reinvent the wheel.

### Maybe some math? Don't run! Please come back!

Just to be able to talk about what we're working with, let's give our collection of images a name,

$$C = \{ C_k \vert k = \overline{1,N} \}$$, so that $$\|C\| = N$$,\
$$\|C\|$$ means the "[cardinality](https://mathworld.wolfram.com/CardinalNumber.html)", which is like the "size" of the collection, and *in this case*, is equivalent to the number of elements in the set.

"$$C$$" is not a descriptive name for sure, but it's short and unique, and that's what matters normally when trying to talk about lots of complicated things. It's built for typing and writing quickly. For encompassing an idea that would normally take a sentence, in a single character.

Quite useful if you're careful about the symbols really. We can always drift into [UTF-8](https://en.wikipedia.org/wiki/UTF-8) if we run out of [ASCII](https://en.wikipedia.org/wiki/ASCII). Different fonts are another way to work around things.

## Now for something completely different

Now that you have what you think is your line of images, let us try to replicate the same thing with other methods. I'll start with my second instinct: more rudimentary, but hopefully fewer, comparisons.



## Sub-Groups

I bet the first thing you thought when looking at those images is "man, there's a lot of this same thing over and over!"

Indeed there is. And you might then realize that our line is going to end up with them either bunched up, or mixed together, depending on the user's choices.

### Simple Examples

So let's just imagine a simple example where there are only 2 image types, $$A$$ and $$B$$, with $$m$$ and $$n$$ versions of each, such that $$m + n = N$$

$$A = \{ A_i \vert i = \overline{ 1, m } \}$$\
$$B = \{ B_i \vert i = \overline{ 1, n } \}$$

They are both part of a collection of images, $$C = A \cup B$$, that we will put an unknown ordering on, using the standard operator "$$>$$" to mean "left hand side better than right hand side".

We can assume without loss of generality that the groups are sorted with the first being the "best" of the group, and the last corresponding to the "worst", so that
$$i > j$$ implies $$A_i > A_j$$

If there is no overlap between $$A$$ and $$B$$, and you take a similar convention that for each element of $$A_i \in A$$ and $$B_j \in B$$, $$A_i > B_j$$, then the graph is quite uninteresting.

<div class="mermaid">
graph LR

subgraph better_group["Better Group"]
  best["A1"]-->a_dots["..."]-->better["Am"]
end

subgraph worse_group["Worse Group"]
  worse["B1"]-->b_dots["..."]-->worst["Bn"]
end

better_group-->worse_group
</div>

Implying the global ranking: $$A_1 > \dots > A_m > B_1 > \dots > B_n$$.
<div class="mermaid">

best["A1"]-->a_dots["..."]-->better["Am"]-->worse["B1"]-->b_dots["..."]-->worst["Bn"]
</div>

A bit like mutually exclusive segments on a line. In fact this feels a bit like looking at segments on a discrete number line, but through the perspective of a linked list!

> I really want a discrete number line graphic here, but I'm having a hard time find an easy way to make them.

So what if these segments overlap? What if the "best bad image" is better than the "worst good image"?

Then there is some mixing, and that's when things are more interesting from a structure standpoint.
