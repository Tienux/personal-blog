---
title: Minecraft Linker Bot — Rust Edition
date: 2026-01-20
description: Un bot Discord en Rust qui relie les événements d'un serveur
  Minecraft à Discord en temps réel.
tags: [rust, discord, minecraft, bot, ci-cd]
published: true
---

# Minecraft Linker Bot — Rust Edition

[Voir le repo](https://github.com/Tienux/Minecraft_Linker_Bot_Rust_Edition)

## Pourquoi ce projet

Ce projet est mon premier repo public sur GitHub et volontairement open
source sous licence MIT. Le sujet, un bot Discord pour Minecraft.

L'objectif principal était de m'exercer à structurer un projet sérieusement :
mettre en place une pipeline CI, organiser le travail avec des issues, suivre
un workflow GitHub propre. Le bot en lui-même est le prétexte, m'exercer sur un vraie projet était le but.

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
└── conf.json
```

`main.rs` est le point d'entrée du programme pour lancer le bot, il orchestre le démarrage et l'arrêt propre du bot. 

Le module `log` surveille le `latest.log` en temps réel et émet des événements selon ce qu'il détecte. C'est ici que sont enregistrer les activités du serveurs lors de son fonctionnement.

![Extrait fichier latest.log](/images/oxidegames/ecs-schema.png)

Le module `stats` lit les fichiers JSON de statistiques Minecraft et calcule des deltas entre deux snapshots. Ce dernier créer un fichier  `session_snapshot.json` au démarage ou le lancement du bot qui enregistre les stats de tous les joueurs. A l’arrêt du bot ou la fermeture du serveur,  le delta est calculé et permet d'avoir les stats de la dernière session du serveur.

Les commandes du bot sont dans le module `commands/`, elle permet de faire la commande `/online` permettant de voir les joueurs connectés aux serveurs. La commande `/stats` affiche les stats de la session en cours pour le joueur qui exécute la commande, résolu automatiquement depuis son ID Discord via le mapping file.

Le `config.json` est le fichier de configuration permettant à l'utilisateur
de configurer l'id du channel Discord cible, le chemin vers le dossier du
serveur Minecraft, le chemin vers le fichier de mapping Discord/Minecraft,
les messages de démarrage et d'arrêt du serveur. Il permet aussi d'activer
ou désactiver individuellement les statistiques affichées dans le rapport de
fin de session (morts, blocs minés, temps de jeu, mobs tués, dégâts...)
ainsi que les événements surveillés (morts PvE, morts PvP, connexions/
déconnexions, arrêt serveur). Enfin, les messages d'événements sont
personnalisables avec des variables dynamiques : `{player}`, `{killer}`,
`{victim}`, `{message}`.
## Stack technique



## Fonctionnalités

## Ce que j'ai appris