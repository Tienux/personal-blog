<template>
  <div class="about">
    <h1>Qui suis je ?</h1>
    <p>
      Je m'appelle Etienne, j'ai 23 ans, et je suis un passionné de programmation et d'algorithme.
    </p>
    <h2>Mon parcours</h2>
    <p>
      Diplômé à l'université de Poitiers. J'y ai obtenu ma licence en informatique en 2024 avant de
      partir à Tours pour le nouveau Master Intelligent System and Application (ISA). Ce dernier est
      actuellement en cours d'obtention.
    </p>
    <h2>Pourquoi ce blog ?</h2>
    <p>
      J'utilise ce blog pour publier mes activités externes en lien avec la tech. Vous pourrez
      retrouver mes collaborations sur Youtube, mes explorations techniques ainsi que mes différents
      projets externes. Par défaut, le contenu de ce site est publié sous la licence
      <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons CC BY license</a>
    </p>
    <h2>Compétences Techniques</h2>
    <p>
      Langage de programmation : <br />
      - Java <br />
      - Python <br />
      - Rust <br />
      - JavaScript/TypeScript <br />
      - C <br />
      - C# <br />
      <br />
      Frameworks et outils : <br />
      - Nuxt.js <br />
      - Spring Boot <br />
      - Git / GitHub / GitLab
    </p>
    <h2>Parcours professionnel</h2>
    <p>
      <strong>Stage - CGI France pour la MGEN</strong> (Avril-Août 2025)<br />
      Développement et maintenance d'outils internes avec SpringBoot et GitLab.
    </p>
    <p>
      <strong>Stage - Mutuelle de Poitiers</strong> (Avril-Juillet 2024)<br />
      Évolution d'un outil interne d'entreprise avec SpringBoot et VueJS.
    </p>
    <p>
      <strong>Emploi saisonnier - Mutuelle de Poitiers</strong> (Étés 2021-2023)<br />
      Support technique et gestion de micro-réseau.
    </p>
    <h2>Autres informations</h2>
    <p>
      Ce blog est personnel et non professionnel, mes opinions sont les miennes et ne reflètent pas
      nécessairement celles de mes employeurs ou affiliations. <br />
      Je suis ouvert à la collaboration et aux discussions sur des sujets liés à la technologie,
      n'hésitez pas à me contacter via les réseaux sociaux ou par email.
      <br />
      <br />
      <br />
      L'intégralité du site a été conçue avec Nuxt 4
    </p>
  </div>
</template>

<style>
.about {
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 2rem;
  font-size: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  text-align: justify;
  line-height: 1.6;
}

.about h2 {
  margin-top: 2rem;
  margin-bottom: 0.8rem;
  font-size: 1.8rem;
}

.about h2:first-of-type {
  margin-top: 0;
}

.about p {
  margin-bottom: 0.8rem;
  line-height: 1.7;
}

.about a {
  font-weight: bold;
  color: var(--color-accent);
  text-decoration: underline;
  transition: color var(--transition-normal);
}

.about a:hover {
  color: var(--color-accent-hover);
}

@media (max-width: 768px) {
  .about {
    margin: 2rem auto;
    padding: 0 1.5rem;
    text-align: left;
    line-height: 1.75;
  }

  .about p {
    line-height: 1.75;
  }

  .about h2 {
    font-size: 1.5rem;
    margin-top: 1.5rem;
  }
}
</style>
