---
title: Minecraft Linker Bot - Rust Edition
date: 2026-01-20
description: Un bot Discord en Rust qui relie les événements d'un serveur
  Minecraft à Discord en temps réel.
tags: [rust, discord, minecraft, bot, ci-cd]
published: true
---

# Minecraft Linker Bot - Rust Edition

[Voir le repo](https://github.com/Tienux/Minecraft_Linker_Bot_Rust_Edition)

## Pourquoi ce projet

C'est mon premier repo public sur GitHub, volontairement open source sous
licence MIT. Le prétexte : un bot Discord pour relier un serveur Minecraft
à Discord. L'objectif réel : m'exercer à travailler proprement sur un vrai
projet, avec des issues, un workflow GitHub structuré et une pipeline CI.

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

`main.rs` est le point d'entrée du programme, il orchestre le démarrage et
l'arrêt propre du bot : chargement de la configuration, envoi de l'annonce
de démarrage sur Discord, création d'un snapshot des statistiques initiales,
et lancement de la surveillance des logs.

Le module `log` surveille le fichier de log du serveur Minecraft en temps réel
et émet des événements selon ce qu'il détecte.

Le module `stats` lit les fichiers de statistiques du serveur et calcule la
progression des joueurs entre le début et la fin de session.

Les commandes du bot sont dans le module `commands/`.

Le `config.json` permet de configurer quels événements annoncer et quelles
statistiques afficher dans le rapport de session.

## Stack technique

Le bot est écrit en Rust, le langage sur lequel je monte en compétences
en ce moment, et ce projet était une bonne occasion de travailler avec de
l'asynchrone dans un contexte concret.

**Serenity** est la bibliothèque qui fait le lien avec l'API Discord : envoi
de messages, messages enrichis (embeds), commandes slash. **Tokio** est le
runtime asynchrone qui fait tourner le tout : surveillance des logs, gestion
des signaux d'arrêt, appels Discord, tout tourne en parallèle sans bloquer.

La configuration est lue depuis un `config.json` via **serde/serde_json**.
Les secrets (token Discord, chemins vers les fichiers du serveur) passent
par un `.env` chargé avec **dotenv**.

## Fonctionnalités

### Annonces en temps réel

Dès que le serveur démarre, le bot envoie un message sur Discord pour
prévenir les joueurs. À l'arrêt, c'est le rapport de session qui part
(on y revient juste après).

Entre les deux, chaque événement est annoncé au fil de l'eau : connexion
et déconnexion des joueurs, morts PvE et PvP. Pour ces dernières, le bot
différencie les deux cas et peut mentionner les joueurs concernés directement
via leur compte Discord.

![Exemples d'annonces en temps réel dans Discord](/images/mcbotlinker/annonces-temps-reel.png)

Les messages sont personnalisables via le `config.json` avec des variables
dynamiques : `{player}`, `{killer}`, `{victim}`. Chaque type d'événement
peut aussi être activé ou désactivé indépendamment.

### Rapport de fin de session

À l'arrêt du serveur, le bot publie un rapport complet sur la session.
Il présente un classement des joueurs pour chaque statistique activée :
morts, blocs minés, temps de jeu, créatures tuées, dégâts infligés et subis.

![Rapport de fin de session dans Discord](/images/mcbotlinker/rapport-fin-session.png)

Les statistiques affichées sont configurables : si les morts ne vous
intéressent pas, vous les désactivez et elles n'apparaissent pas dans
le rapport.

### Commandes slash

Deux commandes sont disponibles pendant la session.

`/online` affiche la liste des joueurs actuellement connectés au serveur.

`/stats` permet de consulter ses statistiques, soit sur la session en cours,
soit depuis le début (all-time).

![Commande /online et /stats dans Discord](/images/mcbotlinker/commandes-slash.png)
*Résultat des commandes*

## Défis techniques

Le bot fait tourner plusieurs tâches en parallèle : le Log Watcher surveille
le fichier de log en continu, le Gateway Client écoute les commandes Discord,
et main.rs attend le signal d'arrêt pour envoyer le rapport final. Tout ça
sans que l'un bloque l'autre. C'est ce que Tokio permet avec `tokio::spawn` :
chaque tâche tourne de façon asynchrone, indépendamment des autres.

![Schéma des tâches asynchrones et de l'état partagé](/images/mcbotlinker/async-schema.png)
*Architecture async : tâches, état partagé et signal d'arrêt*

La conséquence directe : ces tâches ont besoin d'accéder aux mêmes données.
La liste des joueurs connectés, par exemple, est écrite par le Log Watcher
et lue par le Gateway Client. `Arc` est ici pour partager la donnée entre les tâches,
`Mutex` pour garantir qu'une seule tâche y accède à la fois. Le signal
d'arrêt, lui, passe par un `tokio::sync::oneshot` : un canal qui ne transmet
qu'un seul message, dans un seul sens, pour déclencher le shutdown propre.

## Ce que j'ai appris

C'est le premier projet sur lequel j'ai mis en place une pipeline CI de
zéro. Build, Clippy en mode strict, vérification du format à chaque push.
J'avais déjà vu ce type de workflow en contexte professionnel, mais le
configurer soi-même ancre les choses différemment.

![Image d'une pipeline réussi ](/images/mcbotlinker/ci.png)
* La joie en une image *

Travailler avec des issues sur un projet solo m'a forcé à découper le
travail en unités claires et à maintenir une vision d'ensemble sur ce
qui restait à faire. C'est une habitude que je veux conserver.

Côté Rust, ce projet m'a remis le pied dans la programmation "Threadé".
J'en faisais en C à l'école, mais l'approche est différente ici : le
compilateur garantit l'absence de data races au lieu de te laisser les
découvrir à l'exécution. `Arc<Mutex<T>>` et les canaux Tokio remplacent
une gestion manuelle que j'aurais faite avec des mutex POSIX avec
beaucoup moins de filets de sécurité.

![Issues et todos restants](/images/mcbotlinker/todos.png)
*Ce qu'il reste à faire*

Le projet n'est pas terminé. Il reste du boulot, et le [dépot Github](https://github.com/Tienux/Minecraft_Linker_Bot_Rust_Edition) est public : toute contribution est la bienvenue. De mon côté, d'autres
projets sont sur le feu et la suite viendra à son rythme.

