<script>
  export let isOpen;
  export let currentIndex;
  export let posts;
  export let onClose;
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % posts.length;
  }
  
  function prevImage() {
    currentIndex = currentIndex === 0 ? posts.length - 1 : currentIndex - 1;
  }
  
  function handleKeydown(e) {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && posts[currentIndex]}
  <div class="modal-overlay" on:click={onClose} role="dialog" aria-modal="true">
    <div class="modal-content" on:click|stopPropagation>
      <!-- Close button -->
      <button class="close-btn" on:click={onClose} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="#F5B700" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      
      <!-- Main image -->
      <div class="image-container">
        <img src={posts[currentIndex].media_url} alt={posts[currentIndex].caption} class="modal-image" />
        
        <!-- Navigation arrows -->
        <button class="nav-btn prev" on:click={prevImage} aria-label="Previous">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="nav-btn next" on:click={nextImage} aria-label="Next">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <!-- Caption & Instagram link -->
      <div class="modal-footer">
        <p class="caption">{posts[currentIndex].caption}</p>
        <a href={posts[currentIndex].permalink} target="_blank" class="ig-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          See on Instagram
        </a>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    z-index: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  .modal-content {
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .close-btn {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    opacity: 0.8;
    transition: opacity 0.2s;
  }
  
  .close-btn:hover {
    opacity: 1;
  }
  
  .image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-image {
    max-width: 80vw;
    max-height: 70vh;
    object-fit: contain;
    border-radius: 12px;
  }
  
  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  
  .nav-btn:hover {
    background: rgba(245, 183, 0, 0.8);
  }
  
  .nav-btn:hover svg path {
    stroke: #0D0D0D;
  }
  
  .nav-btn.prev {
    left: -60px;
  }
  
  .nav-btn.next {
    right: -60px;
  }
  
  @media (max-width: 768px) {
    .nav-btn.prev {
      left: 10px;
    }
    .nav-btn.next {
      right: 10px;
    }
  }
  
  .modal-footer {
    margin-top: 1rem;
    text-align: center;
    max-width: 80vw;
  }
  
  .caption {
    color: #E5E5E5;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .ig-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #F5B700;
    text-decoration: none;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background: rgba(245, 183, 0, 0.1);
    transition: all 0.2s;
  }
  
  .ig-link:hover {
    background: #F5B700;
    color: #0D0D0D;
  }
</style>