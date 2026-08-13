<script>
  import { onMount } from 'svelte';
  import InstagramModal from './InstagramModal.svelte';
  
  export let onToggleMenu;
  export let onNavigate;
  export let lang;
  export let t;
  export let toggleLang;
  
  // Instagram feed - fetched from RSS.app or fallback to mock
  let instagramFeed = [];
  let modalOpen = false;
  let modalIndex = 0;
  
  function openModal(index) {
    modalIndex = index;
    modalOpen = true;
  }
  
  function closeModal() {
    modalOpen = false;
  }
  
  // Mock fallback data — fresh photos from Moonslide's Facebook page (Aug 2026)
  let usingFallback = false;
  const mockFeed = [
    { id: '1', media_url: '/images/fb-gallery/board-red.jpg', permalink: 'https://www.facebook.com/moonslide.surf.shape', caption: 'New board ready 🏄' },
    { id: '2', media_url: '/images/fb-gallery/shaping-progress.jpg', permalink: 'https://www.facebook.com/moonslide.surf.shape', caption: 'Shaping session' },
    { id: '3', media_url: '/images/fb-gallery/resin-blue.jpg', permalink: 'https://www.facebook.com/moonslide.surf.shape', caption: 'Resin art details' },
    { id: '4', media_url: '/images/fb-gallery/workshop-shaping.jpg', permalink: 'https://www.facebook.com/moonslide.surf.shape', caption: 'In the workshop' },
    { id: '5', media_url: '/images/fb-gallery/board-yellow.jpg', permalink: 'https://www.facebook.com/moonslide.surf.shape', caption: 'Fresh glass job' },
    { id: '6', media_url: '/images/fb-gallery/ocean-waves.jpg', permalink: 'https://www.facebook.com/moonslide.surf.shape', caption: 'Ocean days' },
    { id: '7', media_url: '/images/fb-gallery/resin-logo.jpg', permalink: 'https://www.facebook.com/moonslide.surf.shape', caption: 'Color pour' },
    { id: '8', media_url: '/images/fb-gallery/boards-stacked.jpg', permalink: 'https://www.facebook.com/moonslide.surf.shape', caption: 'Board rack' },
    { id: '9', media_url: '/images/fb-gallery/board-in-water.jpg', permalink: 'https://www.facebook.com/moonslide.surf.shape', caption: 'Ready to surf' },
    { id: '10', media_url: '/images/fb-gallery/board-orange.jpg', permalink: 'https://www.facebook.com/moonslide.surf.shape', caption: 'Bright & bold' },
    { id: '11', media_url: '/images/fb-gallery/board-white.jpg', permalink: 'https://www.facebook.com/moonslide.surf.shape', caption: 'Clean lines' },
    { id: '12', media_url: '/images/fb-gallery/surf-action.jpg', permalink: 'https://www.facebook.com/moonslide.surf.shape', caption: 'Catching waves' },
  ];
  
  // Fetch Instagram feed from server API (bypasses CORS)
  onMount(async () => {
    try {
      const res = await fetch('/api/instagram');
      if (res.ok) {
        const items = await res.json();
        if (items.length > 0 && items[0].media_url) {
          // Proxy Instagram CDN images through our server
          instagramFeed = items.map(item => ({
            ...item,
            media_url: item.media_url.startsWith('https://scontent')
              ? `/api/image?url=${encodeURIComponent(item.media_url)}`
              : item.media_url
          }));
        } else {
          instagramFeed = mockFeed;
          usingFallback = true;
        }
      } else {
        instagramFeed = mockFeed;
        usingFallback = true;
      }
    } catch (e) {
      console.log('API unavailable, using mock data:', e);
      instagramFeed = mockFeed;
      usingFallback = true;
    }
  });
  
  let scrollY = 0;
</script>

<svelte:window bind:scrollY />

<div class="home">
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

  <!-- Hero Section -->
  <div class="hero">
    <div class="hero-bg" style="transform: translateY({scrollY * 0.4}px)"></div>
    <div class="hero-overlay"></div>
    
    <div class="hero-content" style="transform: translateY({scrollY * 0.2}px)">
      <!-- Real Logo (Vector SVG - traced with potrace) -->
      <img src="/images/logo.svg" alt="Moonslide Surfboards" class="logo-img" />
      <p class="tagline">{t('tagline')}</p>
      <button class="cta-btn" on:click={() => onNavigate('contact')}>
        {t('contactBtn')}
      </button>
    </div>
    
    <!-- Scroll Indicator -->
    <button class="scroll-indicator" on:click={() => document.querySelector('.instagram-section').scrollIntoView({ behavior: 'smooth' })}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M6 9l6 6 6-6" stroke="#F5B700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>

  <!-- Instagram Feed Section -->
  <section class="instagram-section">
    <div class="instagram-grid">
      {#each instagramFeed as post, i}
        <div class="ig-post" on:click={() => openModal(i)} role="button" tabindex="0">
          <img src={post.media_url} alt={post.caption || 'Instagram post'} class="ig-image" />
          <div class="ig-overlay">
            <span class="ig-caption">{post.caption}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>
  
  <!-- Instagram Modal -->
  <InstagramModal 
    isOpen={modalOpen} 
    currentIndex={modalIndex} 
    posts={instagramFeed} 
    isFallback={usingFallback}
    onClose={closeModal} 
  />
</div>

<style>
  .home {
    min-height: 100vh;
    position: relative;
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

  .menu-btn:hover {
    opacity: 0.8;
  }

  .lang-toggle {
    position: fixed;
    top: 24px;
    right: 24px;
    background: rgba(26, 26, 26, 0.5);
    border: 1px solid rgba(245, 183, 0, 0.6);
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

  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible; /* Test: let parallax extend beyond hero */
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background-image: url('/images/surfboards-original.jpg');
    background-size: cover;
    background-position: center;
    filter: grayscale(80%);
    will-change: transform;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(13, 13, 13, 0.75);
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    padding: 2rem;
    will-change: transform;
  }

  .logo-img {
    width: clamp(200px, 40vw, 350px);
    height: auto;
    margin-bottom: 1.5rem;
  }

  .tagline {
    font-size: 1.1rem;
    color: #E5E5E5;
    font-weight: 300;
    margin-bottom: 2rem;
    letter-spacing: 0.05em;
  }

  .cta-btn {
    background: #F5B700;
    color: #0D0D0D;
    border: none;
    padding: 1rem 2.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.05em;
  }

  .cta-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(245, 183, 0, 0.3);
  }

  /* Scroll Indicator */
  .scroll-indicator {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;
    animation: chevronBounce 2s infinite;
  }

  .scroll-indicator:hover {
    opacity: 0.7;
  }

  .scroll-indicator svg path {
    stroke: #F5B700;
    stroke-width: 2.5;
  }

  @keyframes chevronBounce {
    0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.8; }
    50% { transform: translateX(-50%) translateY(10px); opacity: 1; }
  }

  /* Instagram Section */
  .instagram-section {
    position: relative;
    background-image: url('/images/fluid-art-gray.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 4rem 2rem;
    min-height: 50vh;
  }
  
  .instagram-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(13, 13, 13, 0.75);
    z-index: 0;
  }
  
  .instagram-section .instagram-grid,
  .instagram-section h2 {
    position: relative;
    z-index: 1;
  }

  .instagram-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  .ig-post {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    display: block;
    text-decoration: none;
    border-radius: 12px;
    cursor: pointer;
  }
  
  /* Slight grey overlay to mute image colors */
  .ig-post::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(13, 13, 13, 0.15);
    z-index: 1;
    border-radius: 12px;
    transition: background 0.3s ease;
  }
  
  .ig-post:hover::after {
    background: rgba(13, 13, 13, 0.25);
  }

  .ig-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .ig-post:hover .ig-image {
    transform: scale(1.1);
  }

  .ig-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    padding: 0.5rem;
    z-index: 2;
    border-radius: 12px;
  }

  .ig-post:hover .ig-overlay {
    opacity: 1;
  }

  .ig-caption {
    color: white;
    font-size: 0.85rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  @media (max-width: 480px) {
    .instagram-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  /* Tablet: bump chevron up */
  @media (min-width: 481px) and (max-width: 1024px) {
    .scroll-indicator {
      bottom: 100px;
    }
  }
  
  @media (min-width: 768px) {
    .instagram-grid {
      grid-template-columns: repeat(4, 1fr);
      max-width: 1000px;
    }
  }
</style>