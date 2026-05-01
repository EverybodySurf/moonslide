export const config = { runtime: 'edge' };

const RSS_URL = process.env.RSS_URL || 'https://rss.app/feeds/mj5PM4FCVxTf5RsX.xml';

export default async function handler(req) {
  try {
    const response = await fetch(RSS_URL);
    const text = await response.text();
    
    const items = [];
    const itemMatches = text.matchAll(/<item>([\s\S]*?)<\/item>/g);
    
    for (const match of itemMatches) {
      const itemXml = match[1];
      
      const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
      
      const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
      const link = linkMatch ? linkMatch[1] : '';
      
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
    
    return new Response(JSON.stringify(items.slice(0, 6)), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to fetch RSS' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}