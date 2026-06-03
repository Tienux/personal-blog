---
title: OxideGames - Video Editor
date: 2026-02-03
description: Video editing for OxideGames about Bevy
tags: [rust, gamedev, bevy, youtube]
published: true
---

# OxideGames

![OxideGames on YouTube](/images/oxidegames/oxidegames-banner.png)
*OxideGames YouTube channel*

[OxideGames](https://www.youtube.com/@OxideGames-k3f) is a French-speaking YouTube channel
documenting the creation of a farming game (think Stardew Valley) from scratch, in Rust
using the Bevy engine.

## What I do

I handle the editing : cutting rushes, pacing, audio sync, transitions. The goal is for
someone curious about Bevy to understand the engine without drowning in it. Videos are
short, dense on what matters, with a touch of humor to keep things digestible.

## The videos

### #1 Introduction to Bevy & ECS

The founding video. It lays the groundwork for the entire series : why Rust over Unity,
Unreal Engine or Godot, how Bevy works, and most importantly what ECS is, the paradigm
that structures everything in this engine.

The analogy used in the video is clear : the game as a giant Excel spreadsheet. Each entity
is a row (the player, an enemy, a bullet). Each component is a column (position, speed,
texture). Systems are the logic that iterates over that spreadsheet and acts on entities
that have the right columns ; a movement system only cares about entities that have Position
and Velocity, regardless of what they represent.

The direct consequence : systems with no shared dependencies run in parallel natively.

Everything is made accessible via `use bevy::prelude::*`, a single line that imports
everything you need : entities, systems, keyboard input, rendering.

![ECS diagram : entities, components, systems](/images/oxidegames/ecs-schema.png)
*Video extract — Introduction to Bevy, ECS section*

On the practical side, the video covers installing Rust, creating the project with
`cargo new farm_game`, the `Cargo.toml` / `src/main.rs` structure, and the first two
Bevy scheduler concepts : Startup for what runs once at launch, and Update for what
runs every frame.

This will come in handy in later videos.

![Cargo project structure](/images/oxidegames/cargo-structure.png)
*Basic project structure*

### #2 Movement

The longest of the three videos, and the densest. It actually covers two topics :
integrating graphic assets and moving the character.

**Loading assets and rendering**

The textures come from the *Sprout Lands* pack. Rather than loading dozens of separate
images, the video introduces the **Texture Atlas** : a single spritesheet cut into a grid
(10 columns × 4 rows, 48×48px per cell) via `TextureAtlasLayout::from_grid`. More
performant, and simpler to manage in ECS since a single component is enough to reference
any frame. This will prove useful in the animation video.

![Simple images vs Texture Atlas](/images/oxidegames/spritesheet-extraitvideo.png)
*Multiple individual images vs the spritesheet grouping them*

Two rendering issues are fixed along the way : the sprite appears tiny by default
(fixed via the camera's orthographic projection, zoom set to `0.3`).

![Orthographic vs perspective projection](/images/oxidegames/orthographic-vs-perspective.png)
*Orthographic vs perspective projection — [glumpy.readthedocs.io](https://glumpy.readthedocs.io/en/latest/tutorial/cube-ugly.html)*

Bevy applies a smoothing filter that blurs pixel art (disabled in the display plugin
settings).

![Blurry rendering](/images/oxidegames/pixel-flou.png)
*With linear filtering*

![Pixel perfect rendering](/images/oxidegames/pixel-perfect.png)
*With "nearest" filtering*

**Movement and basic physics**

The player is represented by an empty `Player` struct attached as a component, an ECS
marker. The `move_player` system queries only the entity that has this marker via `Single`,
reads keyboard input, and modifies its `Transform`.

Two important subtleties are introduced :

- **Delta time** : without correction, movement speed depends on the machine's FPS.
Multiplying by `delta_seconds()` from the `Time` resource makes movement identical
on any hardware.
- **Diagonal normalization** : on diagonals, the X and Y vectors add up and speed exceeds
`1`. Normalizing the direction vector before applying speed fixes the problem cleanly.

![Normalized diagonal vector diagram](/images/oxidegames/diagonal-normalization.png)
*Why the vector needs to be normalized*

The system is registered in `Update`, so it runs every frame, unlike the camera setup
which goes through `Startup`.

### #3 Sprite animation

The goal of this video is simple : the character should no longer "slide". The spritesheet
needs to animate based on movement and in the right direction.

**Animation structure**

Two new components are introduced :

- `AnimationIndices` : stores the `first` and `last` index of the current animation
in the spritesheet grid.
- `FrameTimer` : a `Timer` set to `0.3s` in repeating mode, which dictates the frame
cycling rate.

The `animate_sprite` system runs in `Update` : every frame it advances the timer with
delta time, and when it expires it increments the atlas index or wraps back to `first`
if `last` has been reached. It's the Texture Atlas from the previous video that makes
this possible : changing frame means changing an index, nothing more.

![AnimationIndices frame cycling diagram](/images/oxidegames/animation-indices.png)
*Frame cycling via AnimationIndices and FrameTimer*

**Direction and state management**

To animate correctly in all four directions plus the idle state, two properties are
added to the `Player` component :

- `current_direction` : tracks whether the player is facing forward, backward,
left or right.
- `PlayerState` : an `Idle` / `Walking` enum.

The `move_player` system from the previous episode is updated to keep these two values
in sync on every movement.

**State → sprites mapping**

A `player_sprite_indices` function maps each state + direction combination to the exact
indices in the spritesheet grid (e.g. `Walking` + back → cells 8 to 11).

The `update_indices` system continuously monitors the player's state : as soon as a
change is detected, it updates `AnimationIndices` and forces immediate display of the
first frame of the new animation, to avoid a leftover frame from the previous animation
showing up by mistake.

![Annotated spritesheet with indices by direction](/images/oxidegames/spritesheet-indices.png)
*Mapping between spritesheet cells and states/directions*

The next episode will focus on refactoring, as everything is still in `main.rs` which
is becoming difficult to maintain.

## About me

This article is a snapshot : it documents the editing work done on the first three videos
of the channel, not an episode-by-episode follow-up. OxideGames is not my project and I
am not its author, so this post will not be updated with each new release.

What I wanted was to mention a collaboration that matters, and give some visibility to
French-speaking technical content that deserves it.

Editing these videos taught me the basics of video editing and gave me a real familiarity
with Rust and Bevy along the way. That experience is part of what pushed me to get serious
about Rust, and some of my projects are direct proof of that.