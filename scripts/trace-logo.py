#!/usr/bin/env python3
"""Trace logo PNG to SVG with inverted colors - yellow text on transparent."""

import subprocess
from PIL import Image
import os

def trace_logo(png_path, svg_path):
    # Load PNG and get alpha channel (the yellow text)
    img = Image.open(png_path).convert('RGBA')
    
    # Extract just the yellow pixels as a binary mask
    # Yellow = high R and G, low B
    pixels = img.load()
    width, height = img.size
    
    # Create a new image where yellow pixels are black, everything else white
    # (potrace traces black areas)
    mask = Image.new('L', (width, height), 255)  # Start white
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # If it's yellow-ish (high R, high G, low B) and has alpha
            if r > 200 and g > 150 and b < 50 and a > 200:
                mask.putpixel((x, y), 0)  # Black (will be traced)
    
    # Save as BMP for potrace
    bmp_path = png_path.replace('.png', '-mask.bmp')
    mask.convert('RGB').save(bmp_path, 'BMP')
    
    # Trace with potrace
    result = subprocess.run([
        'potrace', 
        '-s',           # SVG output
        '-o', svg_path,  # Output file
        bmp_path
    ], capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
        return
    
    print(f"Traced logo saved to {svg_path}")
    
    # Fix color in SVG
    with open(svg_path, 'r') as f:
        svg_content = f.read()
    
    # Change fill to yellow
    svg_content = svg_content.replace('fill="#000000"', 'fill="#F5B700"')
    
    with open(svg_path, 'w') as f:
        f.write(svg_content)
    
    print(f"Fixed color to #F5B700")
    
    # Clean up BMP
    os.remove(bmp_path)

if __name__ == '__main__':
    png_path = '/home/surfy/.openclaw/workspace/apps/moonslide/public/images/logo.png'
    svg_path = '/home/surfy/.openclaw/workspace/apps/moonslide/public/images/logo.svg'
    trace_logo(png_path, svg_path)