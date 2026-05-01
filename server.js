import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3003;

// RSS proxy endpoint
app.get('/api/instagram', async (req, res) => {
  try {
    const RSS_URL = 'https://rss.app/feeds/mj5PM4FCVxTf5RsX.xml';
    const response = await fetch(RSS_URL);
    const text = await response.text();
    
    // Parse XML and extract items
    const items = [];
    const itemMatches = text.matchAll(/<item>([\s\S]*?)<\/item>/g);
    
    for (const match of itemMatches) {
      const itemXml = match[1];
      
      // Extract title
      const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
      
      // Extract link
      const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
      const link = linkMatch ? linkMatch[1] : '';
      
      // Extract image from media:content or description
      let imageUrl = '';
      const mediaMatch = itemXml.match(/<media:content[^>]+url="([^"]+)"/);
      if (mediaMatch) {
        imageUrl = mediaMatch[1].replace(/&amp;/g, '&');
      } else {
        const descMatch = itemXml.match(/<img[^>]+src="([^"]+)"/);
        if (descMatch) imageUrl = descMatch[1].replace(/&amp;/g, '&');
      }
      
      if (link) {
        items.push({
          id: link,
          media_url: imageUrl,
          permalink: link,
          caption: title || 'View on Instagram'
        });
      }
    }
    
    res.json(items.slice(0, 6));
  } catch (e) {
    console.error('RSS fetch error:', e);
    res.status(500).json({ error: 'Failed to fetch RSS' });
  }
});

// Serve static files
app.use(express.static(join(__dirname, 'public')));

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Moonslide server running on http://localhost:${PORT}`);
});