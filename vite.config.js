import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// RSS proxy plugin for Vite dev server
function rssProxy() {
  return {
    name: 'rss-proxy',
    configureServer(server) {
      // Instagram feed API
      server.middlewares.use('/api/instagram', async (req, res) => {
        try {
          const RSS_URL = 'https://rss.app/feeds/mj5PM4FCVxTf5RsX.xml';
          const response = await fetch(RSS_URL);
          const text = await response.text();
          
          // Parse XML with regex
          const items = [];
          const itemRegex = /<item>([\s\S]*?)<\/item>/g;
          let match;
          
          while ((match = itemRegex.exec(text)) !== null) {
            const itemXml = match[1];
            
            const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
            const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
            
            const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
            const link = linkMatch ? linkMatch[1] : '';
            
            let imageUrl = '';
            const mediaMatch = itemXml.match(/<media:content[^>]+url="([^"]+)"/);
            if (mediaMatch) {
              imageUrl = mediaMatch[1].replace(/&amp;/g, '&');
            }
            
            if (link) {
              // Proxy images through our server
              const proxiedUrl = imageUrl ? `/api/image?url=${encodeURIComponent(imageUrl)}` : '';
              items.push({
                id: link,
                media_url: proxiedUrl,
                permalink: link,
                caption: title || 'View on Instagram'
              });
            }
          }
          
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(items)); // All posts, no limit
        } catch (e) {
          console.error('RSS fetch error:', e);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to fetch RSS' }));
        }
      });
      
      // Image proxy - fetch Instagram CDN images server-side
      server.middlewares.use('/api/image', async (req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const imageUrl = url.searchParams.get('url');
        
        if (!imageUrl) {
          res.statusCode = 400;
          res.end('Missing url parameter');
          return;
        }
        
        try {
          const imgRes = await fetch(imageUrl);
          if (!imgRes.ok) {
            res.statusCode = imgRes.status;
            res.end('Image fetch failed');
            return;
          }
          
          const buffer = await imgRes.arrayBuffer();
          res.setHeader('Content-Type', 'image/jpeg');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          res.end(Buffer.from(buffer));
        } catch (e) {
          console.error('Image proxy error:', e);
          res.statusCode = 500;
          res.end('Image proxy failed');
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [svelte(), rssProxy()],
  server: {
    port: 3003,
    host: true
  }
});