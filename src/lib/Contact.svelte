<script>
  export let onToggleMenu;
  export let onNavigate;
  export let lang;
  export let t;
  export let toggleLang;
  
  let formData = {
    name: '',
    email: '',
    phone: '',
    board: ''
  };
  
  let submitting = false;
  let submitted = false;
  
  const whatsappNumber = '+590690933431';
  const formEmail = 'moonslide.surfing@gmail.com';
  
  function handleSubmit(e) {
    e.preventDefault();
    submitting = true;
    
    // Create mailto link with form data
    const subject = encodeURIComponent(t('emailSubject'));
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}\nPlanche: ${formData.board}`
    );
    
    // Open mailto
    window.location.href = `mailto:${formEmail}?subject=${subject}&body=${body}`;
    
    submitting = false;
    submitted = true;
  }
</script>

<div class="contact">
  <!-- Hamburger Menu Button -->
  <button class="menu-btn" on:click={onToggleMenu}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="2" rx="1" fill="#F5B700"/>
      <rect x="3" y="11" width="18" height="2" rx="1" fill="#F5B700"/>
      <rect x="3" y="17" width="18" height="2" rx="1" fill="#F5B700"/>
    </svg>
  </button>

  <!-- Language Toggle -->
  <button class="lang-toggle" on:click={toggleLang}>
    {lang === 'fr' ? 'EN' : 'FR'}
  </button>

  <!-- Fluid Art Background -->
  <div class="contact-bg"></div>

  <!-- Contact Form Card -->
  <div class="contact-card">
    <!-- WhatsApp Link -->
    <a href="https://wa.me/{whatsappNumber.replace(/\+/g, '').replace(/\s/g, '')}" target="_blank" class="whatsapp-link">
      <!-- WhatsApp icon (clean SVG) -->
      <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor" style="filter: drop-shadow(0 0 0.5px rgba(0,0,0,0.2));">
        <path d="M128 0C57.31 0 0 57.31 0 128c0 26.47 8.22 51.15 23.28 72.32L8.31 247.69l47.37-15.04C76.85 247.78 101.53 256 128 256c70.69 0 128-57.31 128-128S198.69 0 128 0zm0 240c-22.63 0-44.36-6.56-63.05-18.86l-3.45-2.15-33.58 10.68 10.68-33.58-2.15-3.45C22.56 173.64 16 151.91 16 128 16 66.13 66.13 16 128 16s112 50.13 112 112-50.13 112-112 112zm61.76-91.77c-2.86-1.43-16.93-8.33-19.54-9.28-2.61-.95-4.55-1.43-6.48 1.43-1.93 2.86-7.52 9.28-9.21 11.21-1.69 1.93-3.38 2.38-6.24.95-2.86-1.43-12.06-4.43-22.94-14.15-8.52-7.57-14.3-17.13-16.06-20-1.76-2.86-.19-4.43 1.25-5.87 1.3-1.3 2.86-3.38 4.29-5.07 1.43-1.69 1.93-2.86 2.86-4.76.95-1.93.5-3.57-.24-5.01-.74-1.43-6.48-15.62-8.89-21.36-2.31-5.55-4.65-4.81-6.48-4.87-1.69-.05-3.57-.05-5.45-.05-1.88 0-4.93.71-7.52 3.57-2.59 2.86-9.93 9.71-9.93 23.73s10.19 27.56 11.63 29.47c1.43 1.93 19.87 30.68 48.55 42.52 6.87 2.86 12.24 4.55 16.46 5.81 6.87 2.17 13.23 1.87 18.35 1.14 5.59-.79 17.23-7.08 19.64-13.9 2.41-6.82 2.41-12.73 1.69-13.9-.71-1.17-2.59-1.87-5.45-3.31z"/>
      </svg>
      {t('whatsappLabel')}
    </a>

    <form on:submit={handleSubmit}>
      <div class="form-group">
        <input 
          type="text" 
          placeholder={t('namePlaceholder')} 
          bind:value={formData.name}
          required
        />
      </div>

      <div class="form-group">
        <input 
          type="email" 
          placeholder={t('emailPlaceholder')} 
          bind:value={formData.email}
          required
        />
      </div>

      <div class="form-group">
        <input 
          type="tel" 
          placeholder={t('phonePlaceholder')} 
          bind:value={formData.phone}
        />
      </div>

      <div class="form-group">
        <textarea 
          placeholder={t('boardPlaceholder')} 
          bind:value={formData.board}
          rows="3"
        ></textarea>
      </div>

      <button type="submit" class="submit-btn" disabled={submitting}>
        {submitting ? '...' : t('submitBtn')}
      </button>
    </form>
    
    {#if submitted}
      <p class="success-msg">{t('successMessage')}</p>
    {/if}
  </div>
</div>

<style>
  .contact {
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu-btn {
    position: fixed;
    top: 24px;
    left: 24px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 100;
    padding: 8px;
  }

  .lang-toggle {
    position: fixed;
    top: 24px;
    right: 24px;
    background: rgba(26, 26, 26, 0.8);
    border: 1px solid #F5B700;
    color: #F5B700;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    z-index: 100;
    transition: all 0.2s ease;
  }

  .lang-toggle:hover {
    background: #F5B700;
    color: #0D0D0D;
  }

  .contact-bg {
    position: absolute;
    inset: 0;
    background-image: url('/images/fluid-art.png');
    background-size: cover;
    background-position: center;
  }

  .contact-card {
    position: relative;
    z-index: 10;
    background: #1A1A1A;
    border-radius: 16px;
    padding: 2rem;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  }

  .whatsapp-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: #25D366;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .whatsapp-link:hover {
    background: #20BA5C;
    transform: scale(1.02);
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  input, textarea {
    width: 100%;
    background: #2A2A2A;
    border: 1px solid #3A3A3A;
    border-radius: 8px;
    padding: 1rem;
    color: #E5E5E5;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s ease;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #F5B700;
    box-shadow: 0 0 0 2px rgba(245, 183, 0, 0.2);
  }

  input::placeholder, textarea::placeholder {
    color: #6A6A6A;
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  .submit-btn {
    width: 100%;
    background: #2A2A2A;
    color: #F5B700;
    border: none;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.02em;
  }

  .submit-btn:hover:not(:disabled) {
    background: #F5B700;
    color: #0D0D0D;
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .success-msg {
    text-align: center;
    color: #F5B700;
    margin-top: 1rem;
    font-size: 0.9rem;
  }
</style>