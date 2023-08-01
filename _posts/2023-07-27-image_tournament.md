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

## Sorting is binary comparisons, all the way down... right?

Let's say that you have a directory full of images. Like say [the one I have for midjourneyed project logos]()!

This particular set happens to come from [my MidJourney adventures]() into trying to make a logo for [my MidJourney adventures project](). So meta! =P

{% include gallery.html gallery_path=page.midjourney_logo_gallery_path %}

*- Now that's a lot of images!*

But...

### Which ones do you like best?

You might imagine just "ordering", or "placing", them in a theoretical line from "best" to "worst", whatever that means, and then trying to sort out what position things should be in. It's definitely my first instinct, but something seems off about it:

<div class="mermaid">
graph LR

best["Best"]-->good["Good"]-->dots["..."]-->bad["Bad"]-->worst["Worst"]
</div>

If we start with a "bag" of images we gather and stick in a directory in no particular order, how would you figure out which ones are the best? What if there were 100 images? 1000? What if groups of 20+ are all essentially the same image with only small variations?

Well, my second instinct is ["that is what sorting algorithms are designed to do!"](https://en.wikipedia.org/wiki/Sorting_algorithm), we want to minimize the number of comparisons needed to figure out that line!

But this is assuming you *want* a computer's help with the sorting process. Your on onw now reading this supposedly, so not doing it with a computer is a bit moot, but you know what I mean: the computer's help with the *sorting system*, not the act of using a computer to do virtual work.

Maybe a grid of drag and drop images is best. You act as your own sorting algorithm, no comparisons necessary.

<div id='container'></div>
<script src="/docs/imagetournament/dragImageGrid.js"></script>
<script src="/docs/imagetournament/imagetournament.js"></script>

I have a sneaking suspicion n-up comparisons might be faster and potentially more reliable if we're clever.

But it comes to mind that there are other ways of sorting things, too. Why am I so stuck in comparison mode? Midjourney uses a 4-up style system, but it's really a branching tree. They're experimenting with the size of their grid too, so that's not set in stone.

I had never heard of "non-comparison sorts" until I opened that wiki above, and now that I think about it, most apps use a 0-5 stars system of rating things. That's not direct comparison at all. It's "rating" rather than "ranking". I suppose one can be derived from the other, and that's essentially what we're exploring here.

How do these all fit together and compare? Are they equivalent or equally useful? In what circumstances?

I will have to admit to being a novice in these things as we move forward. I'm sure some of you may have more experience with these things than I do. Feel free to skip anything you find silly or old hat. ;)

> Here's the gpt + cleaning, throw-together jank that makes the above work. Please excuse the rank smell emanating from all my code samples. At this stage of my life, I care more about getting something out into the world than making it perfect the first time. I can clean it later if I have time and decide it's worthwhile.
>
>I've put this code into 2 files, separating the bulk into its own class. That way it can be reused later.

[**One file for the draggable grid:**](/docs/imagetournament/dragImageGrid.js)

```javascript
class DragImageGrid {
  constructor(relative_paths, containerWidth, containerHeight, cellWidth = 100, cellHeight = 100) {
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;

    this.cell_stacks = [];
    this.cell_coords = [];
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.cols = Math.trunc( containerWidth / cellWidth );
    this.rows = Math.trunc( containerHeight / cellHeight );
    this.num_cells = this.rows * this.cols;

    this.dragCellIndex = -1;
    this.dragImage;
    this.dragImageX = 0;
    this.dragImageY = 0;
    this.mouseOffsetX = 0;
    this.mouseOffsetY = 0;

    let row = 0;
    let col = 0;
    for(let i = 0; i < this.rows; i++) {
      for(let j=0; j< this.cols; j++) {
        let cur_id = (i * this.cols) + j;
        this.cell_stacks[cur_id] = [];
        this.cell_coords[cur_id] = {
          x: j * cellWidth,
          y: i * cellHeight
        };
      }
    }

    for (let i = 0; i < relative_paths.length && i < this.num_cells; i++) {
      let cur_img = loadImage('/docs/midjourney/midjourney/' + relative_paths[i]);
      this.cell_stacks[i].push(cur_img);
    }
  }

  getCellIndex(x, y) {
    let col = Math.trunc( x / this.cellWidth );
    let row = Math.trunc( y / this.cellWidth );
    return ( row * this.cols ) + col;
  }

  draw() {
    let num_stack_imgs = 0;
    for (let i = 0; i < this.cell_stacks.length; i++) {
      num_stack_imgs =  this.cell_stacks[i].length;
      if(num_stack_imgs > 0) {
        image(
          this.cell_stacks[i][ this.cell_stacks[i].length - 1 ],
          this.cell_coords[i].x,
          this.cell_coords[i].y,
          this.cellWidth,
          this.cellHeight
        );
      }
    }

    if(this.dragCellIndex != -1) {
      image(
        this.dragImage,
        this.dragImageX,
        this.dragImageY,
        this.cellWidth,
        this.cellHeight
      );
    }
  }
  
  mousePressed() {
    let cellIndex = this.getCellIndex(mouseX, mouseY);
    if(this.cell_stacks[cellIndex].length > 0) {
      this.dragCellIndex = cellIndex;
      this.dragImage = this.cell_stacks[cellIndex].pop();
      this.dragImageX = this.cell_coords[cellIndex].x;
      this.dragImageY = this.cell_coords[cellIndex].y;
      this.mouseOffsetX = mouseX - this.dragImageX;
      this.mouseOffsetY = mouseY - this.dragImageY;
    }
  }

  mouseDragged() {
    this.dragImageX = mouseX - this.mouseOffsetX;
    this.dragImageY = mouseY - this.mouseOffsetY;
  }

  mouseReleased() {
    if(this.dragCellIndex != -1) {
      let cellIndex = this.getCellIndex(mouseX, mouseY);
      this.cell_stacks[cellIndex].push(this.dragImage);
      this.dragCellIndex = -1;
      this.dragImageX = 0;
      this.dragImageY = 0;
      this.mouseOffsetX = 0;
      this.mouseOffsetY = 0;
    }
  }
}
```

[**One file for the script that calls it:**]()

```javascript
const containerHeight = 500
let grid;

function preload() {
  relative_paths = loadStrings('/docs/midjourney/midjourney/file_paths.txt');
}

function setup() {
  const containerWidth = document.getElementById('container').offsetWidth;
  let canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent('container');
  //noLoop();

  grid = new DragImageGrid(relative_paths, containerWidth, containerHeight);
}

function draw() {
  background(0);
  grid.draw();
}

function mousePressed() {
  grid.mousePressed();
}

function mouseDragged() {
  grid.mouseDragged();
}

function mouseReleased() {
  grid.mouseReleased();
}
```

But they were, all of them, deceived, for another file was made.

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

We'll pick our favorite sorting algorithm and replace the comparison callbacks.

Instead of checking if one element is "less than" the other, which doesn't mean much yet, we'll prompt the user at each comparison to rank the two current images. We'll use "bigger means better" as our guiding design, and then we can order the images in a line, the same way sorting algorithm does.

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
