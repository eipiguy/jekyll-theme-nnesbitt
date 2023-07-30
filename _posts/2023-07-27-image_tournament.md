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

## Sorting is binary comparisons, all the way down

Let's say that you have a directory full of images. Like say [the one I have for midjourneyed project logos]()!

This particular set happens to come from [my MidJourney adventures]() into trying to make a logo for [my MidJourney adventures project](). So meta! =P

{% include gallery.html gallery_path=page.midjourney_logo_gallery_path %}

*- Now that's a lot of images!*

But...

### Which ones do you like best?

You might imagine just "ordering", or "placing", them in a theoretical line from "best" to "worst", whatever that means, and then trying to sort out what position in that line things should be in:

<div class="mermaid">
graph LR

best["Best"]-->better["Better"]-->dots["..."]-->worse["Worse"]-->worst["Worst"]
</div>

How would we find out what that line is from a "bag" of images? Well, [that's what sorting algorithms are](). We want to minimize the number of comparisons needed to figure out that line!

This is assuming you *want* the computer's help with the process. I can of course just give a grid of drag and drop images, and let you act as your own sorting algorithm.

<div id='container'></div>
<script src="/docs/imagetournament/dragImageGrid.js"></script>
<script src="/docs/imagetournament/imagetournament_0.js"></script>

I have a sneaking suspicion the computer might be faster and more reliable though. We'll compare in the end.

Just to put a name on what we're working with, let's imagine we have a collection of $$N$$ images,

$$C = \{ C_k \vert k = \overline{1,N} \}$$, so that $$\|C\| = N$$.

We'll pick our favorite sorting algorithm and replace the comparison callbacks by prompting the user to rank the two current images. Then we can fill out the line in the same way the algorithm sorts the images.

## Sub-Groups

But I bet the first thing you thought when looking at those images is "man, there's a lot of this same thing over and over!"

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
graph LR

best["A1"]-->a_dots["..."]-->better["Am"]-->worse["B1"]-->b_dots["..."]-->worst["Bn"]
</div>

A bit like mutually exclusive segments on a line. In fact this feels a bit like looking at segments on a discrete number line, but through the perspective of a linked list!

> I really want a discrete number line graphic here, but I'm having a hard time find an easy way to make them.

So what if these segments overlap? What if the "best bad image" is better than the "worst good image"?

Then there is some mixing, and that's when things are more interesting from a structure standpoint.
