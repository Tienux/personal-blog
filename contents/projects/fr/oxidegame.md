---
title: OxideGames - Monteur vidéo
date: 2026-02-03
description: Montage vidéo pour OxideGames sur Bevy
tags: [rust, gamedev, bevy, youtube]
published: true
---

# OxideGames

![OxideGames sur YouTube](/images/oxidegames/oxidegames-banner.png)
*Chaîne Youtube d'OxideGames*

[OxideGames](https://www.youtube.com/@OxideGames-k3f) est une chaîne YouTube francophone qui documente la création d'un jeu de ferme (dans l'esprit de Stardew Valley) de A à Z, en Rust avec le moteur Bevy. Le contenu technique sur Bevy en français est quasi inexistant : la plupart des ressources sont en anglais, parfois dans des vidéos de plusieurs heures. OxideGames comble ce vide avec un projet fil rouge concret.

## Ce que je fais

Je m'occupe du montage : découpage des rushes, rythme, synchronisation audio, transitions. L'objectif est qu'une personne curieuse de Bevy puisse comprendre le moteur sans se noyer. Les vidéos sont courtes, denses sur l'essentiel, avec une touche d'humour pour que ça reste digeste.

## Les vidéos

### #1 Introduction à Bevy & ECS

La vidéo fondatrice. Elle pose les bases sur lesquelles toute la série repose : pourquoi Rust plutôt qu'Unity, Unreal Engine ou Godot, comment fonctionne Bevy, et surtout ce qu'est l'ECS, le paradigme qui structure tout dans ce moteur.

L'analogie utilisée dans la vidéo est parlante : le jeu comme un grand tableau Excel. Chaque entité est une ligne (le joueur, un ennemi, une balle). Chaque composant est une colonne (position, vitesse, texture). Les systèmes sont la logique qui parcourt ce tableau et agit sur les entités qui ont les bonnes colonnes ; un système de déplacement ne s'intéresse qu'aux entités qui ont Position et Velocity, peu importe ce qu'elles représentent.

La conséquence directe : les systèmes sans dépendances communes tournent en parallèle nativement.

L'ensemble est rendu accessible via `use bevy::prelude::*`, une seule ligne qui importe tout le nécessaire : entités, systèmes, clavier, rendu.

![Schéma ECS : entités, composants, systèmes](/images/oxidegames/ecs-schema.png)
*Extrait vidéo Introduction à Bevy, passage sur l'ECS*

Côté pratique, la vidéo couvre l'installation de Rust, la création du projet avec `cargo new farm_game`, la structure `Cargo.toml` / `src/main.rs`, et les deux premiers concepts du scheduler Bevy : Startup pour ce qui s'exécute une fois au lancement, et Update pour ce qui tourne à chaque frame.

Cela aura son utilité dans la suite des vidéos.

![Structure du projet Cargo](/images/oxidegames/cargo-structure.png)
*Structure de base du projet*

### #2 Les déplacements

La vidéo la plus longue des trois, et la plus dense. Elle couvre en réalité
deux sujets : l'intégration des assets graphiques et le déplacement du
personnage.

**Chargement des assets et affichage**

Les textures viennent du pack *Sprout Lands*. Plutôt que de charger des dizaines
d'images séparées, la vidéo introduit le **Texture Atlas** : une seule
spritesheet découpée en grille (10 colonnes × 4 lignes, 48×48px par case)
via `TextureAtlasLayout::from_grid`. Plus performant, et plus simple à gérer
en ECS puisqu'un seul composant suffit à référencer n'importe quelle frame.
On verra que cela aura son utilité dans la vidéo sur les animations.
![Images simples vs Texture Atlas](/images/oxidegames/spritesheet-extraitvideo.png)
*Une multitude d'images vs le spritesheet les regroupant*

Deux problèmes graphiques sont réglés au passage : le sprite apparaît minuscule
par défaut (corrigé via la projection orthographique de la caméra, zoom à `0.3`).
![Projection orthographique vs perspectives](/images/oxidegames/orthographic-vs-perspective.png)
*Projection orthographique vs perspective  [glumpy.readthedocs.io](https://glumpy.readthedocs.io/en/latest/tutorial/cube-ugly.html)*


Bevy applique un filtre de lissage qui floute le pixel art (désactivé dans
les paramètres du plugin d'affichage).

![rendu flou](/images/oxidegames/pixel-flou.png)
*Avec le filtrage linéaire*

![rendu pixel perfect](/images/oxidegames/pixel-perfect.png)
*Avec le filtrage "nearest"*

**Déplacement et physique de base**

Le joueur est représenté par une structure vide `Player` attachée comme
composant, un marqueur ECS. Le système `move_player` requête uniquement
l'entité qui possède ce marqueur via `Single`, lit les entrées clavier, et
modifie son `Transform`.

Deux subtilités importantes sont introduites :

- **Delta time** : sans correction, la vitesse de déplacement dépend des FPS
de la machine. Multiplier par `delta_seconds()` de la ressource `Time` rend
le mouvement identique sur n'importe quel hardware.
- **Normalisation des diagonales** : en diagonale, les vecteurs X et Y
s'additionnent et la vitesse dépasse `1`. Normaliser le vecteur de direction
avant d'appliquer la vitesse règle le problème proprement.

![Schéma vecteur diagonal normalisé](/images/oxidegames/diagonal-normalization.png)
*Pourquoi il faut normaliser le vecteur*

Le système est enregistré dans `Update`, il tourne donc à chaque frame,
contrairement au setup de la caméra qui passe par `Startup`.

### #3 Animation du sprite

L'objectif de cette vidéo est simple : le personnage ne doit plus "glisser".
Il faut que la spritesheet s'anime en fonction du mouvement et dans la
bonne direction.

**Structure de l'animation**

Deux nouveaux composants sont introduits :

- `AnimationIndices` : stocke l'index `first` et `last` de l'animation
en cours dans la grille de la spritesheet.
- `FrameTimer` : un `Timer` réglé à `0.3s` en mode répétable, qui dicte
la cadence de défilement des frames.

Le système `animate_sprite` tourne dans `Update` : à chaque frame il avance
le timer avec le delta time, et quand il arrive à terme il incrémente l'index
de l'atlas ou revient à `first` si on a atteint `last`. C'est le Texture
Atlas de la vidéo précédente qui rend ça possible : changer de frame revient
à changer un index, rien de plus.

![Schéma défilement frames AnimationIndices](/images/oxidegames/animation-indices.png)
*Défilement des frames via AnimationIndices et FrameTimer*

**Gestion des directions et des états**

Pour animer correctement dans les quatre directions plus l'état immobile,
deux propriétés sont ajoutées au composant `Player` :

- `current_direction` : mémorise si le joueur regarde en face, de dos,
à gauche ou à droite.
- `PlayerState` : un enum `Idle` / `Walking`.

Le système `move_player` de l'épisode précédent est modifié pour mettre à
jour ces deux valeurs en temps réel à chaque déplacement.

**Liaison état → sprites**

Une fonction `player_sprite_indices` fait correspondre chaque combinaison
état + direction aux indices exacts dans la grille de la spritesheet
(ex: `Walking` + dos → cases 8 à 11).

Le système `update_indices` surveille en continu l'état du joueur : dès qu'un
changement est détecté, il met à jour `AnimationIndices` et force l'affichage
immédiat de la première frame de la nouvelle animation pour éviter qu'une
frame de la précédente animation ne s'affiche par erreur.

![Spritesheet annotée avec les indices par direction](/images/oxidegames/spritesheet-indices.png)
*Correspondance entre les cases de la spritesheet et les états/directions*

Le prochain épisode sera consacré à la
refactorisation car tout est encore dans `main.rs`, ce qui devient difficile
à maintenir.

## En ce qui me concerne

Cet article est un instantané : il documente le travail de montage réalisé
sur les trois premières vidéos de la chaîne, pas un suivi épisode par épisode.
OxideGames n'est pas mon projet, je n'y suis pas auteur donc ce billet
ne sera pas mis à jour à chaque nouvelle sortie.

Ce que je voulais, c'était mentionner une collaboration qui compte, et donner
un peu de visibilité à du contenu technique francophone qui en mérite.

En montant ces vidéos, j'ai appris les bases du montage vidéo et acquis une
vraie familiarité avec Rust et Bevy en parallèle. C'est en partie grâce à
cette expérience que j'ai voulu me lancer sérieusement dans Rust et certains
de mes projets en sont la preuve directe.