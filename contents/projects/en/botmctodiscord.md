---
title: Minecraft Linker Bot - Rust Edition
date: 2026-03-06
description: A Discord bot in Rust that links a Minecraft server's events to Discord in real time.
tags: [rust, discord, minecraft, bot, ci-cd]
published: true
---

# Minecraft Linker Bot - Rust Edition

[See the repo](https://github.com/Tienux/Minecraft_Linker_Bot_Rust_Edition)

## Why this project

This is my first public repo on GitHub, deliberately open source under the MIT license.
The premise : a Discord bot to link a Minecraft server to Discord. The real goal : practice
working cleanly on a real project, with issues, a structured GitHub workflow and a CI pipeline.

## Architecture

```
src/
├── main.rs
├── embed.rs
├── model/
│   ├── config.rs
│   └── player.rs
├── stats/
│   ├── constants_stats.rs
│   └── minecraft_stats.rs
├── log/
│   ├── constants_log.rs
│   └── minecraft_log.rs
└── commands/
│   └── minecraft_command.rs
└── config.json
```
`main.rs` is the program's entry point, it orchestrates the bot's startup and clean
shutdown : loading the configuration, sending the startup announcement to Discord,
creating a snapshot of the initial statistics, and launching log monitoring.

The `log` module watches the Minecraft server's log file in real time and emits events
based on what it detects.

The `stats` module reads the server's statistics files and calculates player progression
between the start and end of a session.

Bot commands live in the `commands` module.

`config.json` lets you configure which events to announce and which statistics to display
in the session report.

## Tech stack

The bot is written in Rust, the language I am currently leveling up in, and this project
was a good opportunity to work with async in a concrete context.

**Serenity** is the library that interfaces with the Discord API : sending messages,
rich embeds, slash commands. **Tokio** is the async runtime that drives everything :
log monitoring, shutdown signal handling, Discord API calls, all running in parallel
without blocking.

Configuration is read from a `config.json` via **serde/serde_json**. Secrets (Discord
token, paths to server files) are loaded from a `.env` file using **dotenv**.

## Features

### Real-time announcements

As soon as the server starts, the bot sends a message on Discord to notify players.
On shutdown, the session report goes out (more on that below).

In between, every event is announced as it happens : player connections and disconnections,
PvE and PvP deaths. For the latter, the bot differentiates between the two cases and can
mention the players involved directly via their Discord account.

![Real-time announcement examples in Discord](/images/mcbotlinker/annonces-temps-reel.png)
*An example interaction. The server announcement comes first, then the connection message.
Then I die in-game, which mentions me in Discord thanks to the Player -> Discord ID mapping.*

Messages are customizable via `config.json` with dynamic variables : `{player}`,
`{killer}`, `{victim}`. Each event type can also be enabled or disabled independently.

### End-of-session report

When the server shuts down, the bot publishes a full session report. It shows a player
ranking for each enabled statistic : deaths, blocks mined, playtime, mobs killed, damage
dealt and taken.

![End-of-session report in Discord](/images/mcbotlinker/rapport-fin-session.png)
*Stats for each player on the server*

The displayed statistics are configurable : if you don't care about deaths, disable them
and they won't appear in the report.

![End-of-session report in Discord](/images/mcbotlinker/confjson-stats.png)
*Only stats set to true are displayed. They correspond to the fields shown in the image*

Not all of the game's statistics are implemented yet, but that is tracked as an open Issue.

### Slash commands

Two commands are available during a session.

`/online` displays the list of players currently connected to the server.

`/stats` lets you check your statistics, either for the current session or all-time.

![/online and /stats commands in Discord](/images/mcbotlinker/commandes-slash.png)
*Command output*

## Technical challenges

The bot runs several tasks in parallel : the Log Watcher monitors the log file
continuously, the Gateway Client listens for Discord commands, and main.rs waits for the
shutdown signal to send the final report. All of this without one blocking the other.
That is what Tokio enables with `tokio::spawn` : each task runs asynchronously,
independently of the others.

![Async tasks and shared state diagram](/images/mcbotlinker/async-schema.png)
*Async architecture : tasks, shared state and shutdown signal*

The direct consequence : these tasks need to access the same data. The list of connected
players, for example, is written by the Log Watcher and read by the Gateway Client. In
Rust, you cannot just pass a reference between two tasks living on different threads, the
compiler forbids it. `Arc` is here to share data between tasks, `Mutex` to guarantee
that only one task accesses it at a time. The shutdown signal goes through a
`tokio::sync::oneshot` : a channel that carries exactly one message, in one direction,
to trigger a clean shutdown.

## What I learned

This is the first project where I set up a CI pipeline from scratch. Build, Clippy in
strict mode, format check on every push. I had seen this kind of workflow in a
professional context before, but configuring it yourself makes it stick differently.

![Successful pipeline run](/images/mcbotlinker/ci.png)
*The joy, in one image*

Working with issues on a solo project forced me to break work down into clear units and
maintain an overview of what was left to do. It is a habit I want to keep.

On the Rust side, this project brought me back to concurrent programming. I did some in C
at school, but the approach is different here : the compiler guarantees the absence of
data races instead of letting you discover them at runtime. `Arc<Mutex<T>>` and Tokio
channels replace the kind of manual management I would have done with POSIX mutexes,
with far fewer safety nets.

![Open issues and remaining todos](/images/mcbotlinker/todos.png)
*What's left to do*

The project is not finished. There is still work to do, and the
[Github repository](https://github.com/Tienux/Minecraft_Linker_Bot_Rust_Edition) is
public : contributions are welcome. On my end, other projects are in the works and this
one will move forward at its own pace.