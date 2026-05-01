<script>
  import Home from './lib/Home.svelte';
  import Contact from './lib/Contact.svelte';
  import MenuOverlay from './lib/MenuOverlay.svelte';
  import { translations } from './lib/translations.js';
  
  let currentPage = 'home';
  let menuOpen = false;
  let lang = 'fr'; // French default
  
  // Reactive translation function - updates when lang changes
  $: t = (key) => translations[lang][key] || key;
  
  function navigate(page) {
    currentPage = page;
    menuOpen = false;
  }
  
  function toggleMenu() {
    menuOpen = !menuOpen;
  }
  
  function toggleLang() {
    lang = lang === 'fr' ? 'en' : 'fr';
  }
</script>

<MenuOverlay 
  isOpen={menuOpen} 
  onClose={() => menuOpen = false} 
  onNavigate={navigate}
  {lang}
  {t}
/>

{#if currentPage === 'home'}
  <Home onToggleMenu={toggleMenu} onNavigate={navigate} {lang} {t} toggleLang={toggleLang} />
{:else if currentPage === 'contact'}
  <Contact onToggleMenu={toggleMenu} onNavigate={navigate} {lang} {t} toggleLang={toggleLang} />
{/if}