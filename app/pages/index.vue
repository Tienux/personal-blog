<template>
  <div class="welcome">
      <div class="welcome-intro">
            <img :src="profileImage" alt="Profile picture" class="profile-img">
            <h2>Bonjour, je suis Etienne Portron</h2>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dolore reprehenderit ea doloribus necessitatibus nam reiciendis in cum esse aut sint ad ut modi adipisci quasi ratione, quia quaerat eum.</p>
      </div>
      <div class="contact">
        <h3>Contact : </h3>
        <ul>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            Email: <a href="mailto:etienneportron@gmail.com">etienneportron@gmail.com</a>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            Github: <a href="https://github.com/Tienux">Tienux</a>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn: <a href="https://www.linkedin.com/in/etienne-portron-4b9645242/">Etienne Portron</a>
          </li>
        </ul>
      </div>
  </div>
</template>
<style>
  .welcome {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 90vh;
    padding-top: 5vh;
    font-size: 2rem;
    font-weight: bold;
    color: white;
  }

  .welcome-intro {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
    justify-content: flex-start;
    padding-top: 1rem;
  }

  .welcome-intro h2 {
    margin: 0;
  }

  .welcome-intro p {
    font-size: 1rem;
    font-weight: normal;
    margin: 0;
  }
  .contact {
    align-self: flex-start;
    padding: 2rem;
    font-size: 1.2rem;
    font-weight: normal;
    margin-top: auto;
    padding-bottom: 2rem;
  }
  .contact h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  .contact ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .contact li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .contact a {
    color: #ffffff;
    font-weight: bold;
    text-decoration: none;
  }

  .profile-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #070707;
  }
</style>

<script setup>
import profileImage from 'images/placeholder.jpg'
</script>
