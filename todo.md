# TODO - Bilan de l'audit

## Priorite 1 - securite et robustesse ✅ FAIT
- [x] Remplacer le parseur Markdown maison par une solution plus fiable (marked).
- [x] Sanitize/echapper le HTML avant tout `v-html` pour eviter l'injection de contenu non souhaite (DOMPurify).
- [x] Verifier le chargement du projet detail sur changement de slug et rendre la page reactive si besoin (watch sur route.params.slug).

## Priorite 2 - qualite de code ✅ FAIT
- [x] Remplacer les `href` internes par `NuxtLink` pour garder une navigation SPA propre.
- [x] Utiliser une cle stable dans la liste des projets au lieu de l'index (key="project.link").
- [x] Normaliser le front matter avec un vrai parseur YAML au lieu de `split(':')` (yaml package).

## Priorite 3 - maintenance EN COURS
- [ ] Ajouter des scripts `lint` et `typecheck` dans `package.json`.
  - Installer ESLint + Prettier pour la mise en forme et les erreurs statiques.
  - Ajouter `typescript` et `vue-tsc` pour verifier les types lors du build.
- [ ] Ajouter des tests unitaires sur le parseur Markdown et le filtrage des projets.
  - Installer Vitest et vue-test-utils.
  - Tester edge cases du front matter YAML.
  - Tester la sanitisation HTML avec divers payloads.
- [ ] Centraliser les liens et donnees repetes dans des constantes ou fichiers de contenu.
  - Creer `constants/routes.ts` pour les routes du blog.
  - Creer `types/project.ts` pour typer les projets.

## Priorite 4 - UX / design
- [ ] Revoir la police globale pour ameliorer la lisibilite des contenus longs.
  - Remplacer monospace par une police lisible pour le corps du texte.
  - Garder monospace uniquement pour les blocs de code.
- [ ] Renforcer l'accessibilite: focus visibles, contrastes, structure des titres et des liens.
  - Ajouter focus rings visibles sur les liens et boutons.
  - Verifier les ratios de contraste WCAG AA minimum.
  - Utiliser une structure de titres coherente (h1 > h2 > h3).
- [ ] Harmoniser les styles des pages et composants pour eviter les variantes non coherentes.
  - Centraliser les couleurs et espacements dans des variables CSS.
  - Utiliser un systeme de spacing coherent.

## Conclusion
✅ Les risques de securite sont elimines (Priorite 1).
✅ La qualite de code est amelioree (Priorite 2).
🔄 Les scripts de maintenabilite (lint, test) sont a mettre en place (Priorite 3).
⏳ L'accessibilite et le design peuvent etre peaufines ensuite (Priorite 4).
