export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const imageUrl = url.searchParams.get('url');
  
  if (!imageUrl) {
    return new Response('Missing url parameter', { status: 400 });
  }
  
  try {
    // Instagram CDN requires specific headers
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Accept': 'image/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.instagram.com/',
        'Origin': 'https://www.instagram.com',
        'Sec-Fetch-Site': 'same-site',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Dest': 'image'
      }
    });
    
    if (!response.ok) {
      // Fallback: return placeholder
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/images/surfboards-original.jpg'
        }
      });
    }
    
    const imageData = await response.blob();
    
    return new Response(imageData, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (e) {
    // Fallback: redirect to placeholder
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/images/surfboards-original.jpg'
      }
    });
  }
}