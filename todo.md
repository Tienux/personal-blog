# TODO - Bilan de l'audit

## Priorite 1 - securite et robustesse
- [ ] Remplacer le parseur Markdown maison par une solution plus fiable.
- [ ] Sanitize/echapper le HTML avant tout `v-html` pour eviter l'injection de contenu non souhaite.
- [ ] Verifier le chargement du projet detail sur changement de slug et rendre la page reactive si besoin.

## Priorite 2 - qualite de code
- [ ] Remplacer les `href` internes par `NuxtLink` pour garder une navigation SPA propre.
- [ ] Utiliser une cle stable dans la liste des projets au lieu de l'index.
- [ ] Normaliser le front matter avec un vrai parseur YAML au lieu de `split(':')`.

## Priorite 3 - maintenance
- [ ] Ajouter des scripts `lint`, `typecheck` et idealement `test` dans `package.json`.
- [ ] Ajouter des tests unitaires sur le parseur Markdown et le filtrage des projets.
- [ ] Centraliser les liens et donnees repetes dans des constantes ou fichiers de contenu.

## Priorite 4 - UX / design
- [ ] Revoir la police globale pour ameliorer la lisibilite des contenus longs.
- [ ] Renforcer l'accessibilite: focus visibles, contrastes, structure des titres et des liens.
- [ ] Harmoniser les styles des pages et composants pour eviter les variantes non coherentes.

## Conclusion
Le projet est propre et lisible pour un blog simple, mais le principal risque technique se situe dans la generation de HTML a partir du Markdown et son rendu avec `v-html`.
