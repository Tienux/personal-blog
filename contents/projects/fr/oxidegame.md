---
title: OxideGames - Monteur vidéo
date: 2026-01-20
description: Montage vidéo pour OxideGames sur Bevy
tags: [rust, gamedev, bevy, youtube]
published: true
---

# OxideGames

![OxideGames sur YouTube](/images/oxidegames-banner.png)
*Chaîne Youtube d'OxideGames*

[OxideGames](https://www.youtube.com/@OxideGames-k3f) est une chaîne YouTube
francophone qui documente la création d'un Cozy Farm Game de A à Z, en Rust
avec le moteur **Bevy**. Le contenu technique sur Bevy en français est quasi
inexistant — la plupart des ressources sont en anglais, souvent longues. OxideGames comble ce vide avec un projet fil rouge concret.

## Ce que je fais

Je m'occupe du montage : découpage des rushes, rythme, synchronisation audio,
transitions. L'objectif est qu'une personne curieuse de Bevy puisse comprendre
le moteur sans se noyer — des vidéos courtes, denses sur l'essentiel, avec une
touche d'humour pour que ça reste digeste.

Le format impose une contrainte claire : pas de rembourrage, chaque minute doit
justifier sa présence. Sur du contenu technique, c'est le montage qui fait tenir
l'attention — pas juste le fond.

## Les vidéos

### #1 — Introduction à Bevy & ECS

La vidéo fondatrice. Elle pose les deux concepts sur lesquels tout le reste
s'appuie : **Rust** comme langage, **Bevy** comme moteur, et surtout
l'**ECS** (Entity Component System) comme paradigme de base.

L'ECS, c'est le vrai saut conceptuel pour quelqu'un qui vient de Unity ou
Godot. Pas d'objets `Joueur` ou `Ennemi` qui encapsulent leur logique — à la
place : des **entités** (identifiants numériques), des **composants** (données
brutes : position, vitesse, sprite) et des **systèmes** (fonctions qui
requêtent ces composants et les transforment). Un système de physique ne sait
pas qu'il traite un joueur — il voit des entités qui ont `Transform` et
`Velocity`, c'est tout.

En 4:39, ça demande un montage serré. Chaque coupe doit tomber au bon endroit
pour que la logique tienne.

### #2 — Les déplacements

La vidéo la plus longue des trois, et la plus dense techniquement. Elle aborde
la gestion des **inputs clavier** via les ressources Bevy, et comment déplacer
une entité en modifiant son composant `Transform` depuis un système.

C'est là que l'ECS montre sa cohérence : le système de déplacement ne fait que
lire `KeyboardInput` et écrire dans `Transform`. Pas de couplage, pas d'état
caché. Presque 11 minutes à tenir — le rythme compte encore plus sur cette durée.

### #3 — Animation du sprite

On passe ici à la gestion des **spritesheets** et des **atlas de textures** dans
Bevy. Le principe : un composant `TextureAtlas` pointe sur une grille d'images,
et un système fait défiler l'index de frame à intervalle régulier via un
`Timer`. Le chat qui court, c'est ça derrière.

Ce qui est intéressant : l'animation n'est pas liée au mouvement par héritage
ou callback — c'est un système indépendant qui lit l'état de déplacement
et met à jour l'atlas. Composition pure.

## En ce qui me concerne

Ce projet est un bonus inattendu : en montant ces vidéos, j'ai appris les bases
du montage vidéo et acquis une vraie familiarité avec Rust et Bevy en parallèle.
Les deux apprentissages se sont nourris l'un l'autre.