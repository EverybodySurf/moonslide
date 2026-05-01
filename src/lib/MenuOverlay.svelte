<script>
  export let isOpen;
  export let onClose;
  export let onNavigate;
  export let lang;
  export let t;
</script>

{#if isOpen}
  <div class="menu-overlay" on:click={onClose}>
    <div class="menu-panel" on:click|stopPropagation>
      <!-- Close Button -->
      <button class="close-btn" on:click={onClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="#F5B700" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- Navigation Links -->
      <nav class="nav-links">
        <button class="nav-link" on:click={() => onNavigate('home')}>
          {t('home')}
        </button>
        <button class="nav-link" on:click={() => onNavigate('contact')}>
          {t('contact')}
        </button>
      </nav>
    </div>
  </div>
{/if}

<style>
  .menu-overlay {
    position: fixed;
    inset: 0;
    background: rgba(13, 13, 13, 0.5);
    z-index: 200;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .menu-panel {
    width: 50%;
    min-width: 280px;
    height: 100vh;
    background: rgba(13, 13, 13, 0.92);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    margin-bottom: 3rem;
    margin-left: 0;
  }

  .close-btn:hover {
    opacity: 0.8;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }

  .nav-link {
    background: none;
    border: none;
    color: #F5B700;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    opacity: 0.9;
  }
</style>