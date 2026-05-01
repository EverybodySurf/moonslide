#!/usr/bin/env python3
"""Clean up jagged inner edges of 'oo' letters in Moonslide logo."""

from PIL import Image, ImageDraw, ImageFilter
import sys

def clean_logo(input_path, output_path):
    # Load the logo
    img = Image.open(input_path).convert('RGBA')
    width, height = img.size
    
    # Create a mask for the yellow text (MOON)
    # Yellow is approximately RGB(245, 183, 0)
    yellow_lower = (240, 175, 0, 200)
    yellow_upper = (255, 200, 50, 255)
    
    # Find yellow pixels
    pixels = img.load()
    mask = Image.new('L', (width, height), 0)
    mask_pixels = mask.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if r >= 240 and r <= 255 and g >= 175 and g <= 200 and b <= 50 and a >= 200:
                mask_pixels[x, y] = 255
    
    # The "oo" holes are dark pixels inside the yellow mask area
    # We need to find them and smooth them
    
    # Approach: Anti-alias the mask edges
    # Apply slight blur then threshold
    smoothed_mask = mask.filter(ImageFilter.GaussianBlur(radius=0.5))
    
    # Re-threshold at 128 to get clean edges
    final_mask = smoothed_mask.point(lambda p: 255 if p > 128 else 0)
    
    # Create final image: dark background + yellow text from cleaned mask
    # Detect if background is dark (black-ish)
    bg_color = (13, 13, 13, 255)  # Dark background
    
    # Create new image with TRANSPARENT background
    result = Image.new('RGBA', (width, height), (0, 0, 0, 0))  # Transparent!
    
    # Fill yellow where mask is white
    yellow = (245, 183, 0, 255)
    for y in range(height):
        for x in range(width):
            if final_mask.getpixel((x, y)) == 255:
                result.putpixel((x, y), yellow)
    
    # Save
    result.save(output_path, 'PNG')
    print(f"Saved cleaned logo to {output_path}")

if __name__ == '__main__':
    input_path = '/home/surfy/.openclaw/workspace/apps/moonslide/public/images/logo.png'
    output_path = '/home/surfy/.openclaw/workspace/apps/moonslide/public/images/logo.png'
    clean_logo(input_path, output_path)