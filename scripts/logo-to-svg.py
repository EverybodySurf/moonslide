#!/usr/bin/env python3
"""Convert logo PNG to SVG with traced paths."""

from PIL import Image
import subprocess
import os

def png_to_svg(png_path, svg_path):
    # Check if potrace is available
    result = subprocess.run(['which', 'potrace'], capture_output=True)
    if result.returncode != 0:
        print("potrace not found, using PIL approach")
        # Alternative: create high-res PNG and embed as image in SVG
        img = Image.open(png_path)
        
        # Scale up for better quality at large sizes
        scaled = img.resize((img.width * 4, img.height * 4), Image.Resampling.LANCZOS)
        
        # Save high-res version
        high_res_path = png_path.replace('.png', '-hi-res.png')
        scaled.save(high_res_path, 'PNG')
        
        # Create SVG that embeds the high-res PNG
        svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 {scaled.width} {scaled.height}"
  width="100%" height="100%">
  <image xlink:href="/images/logo-hi-res.png" 
         width="{scaled.width}" 
         height="{scaled.height}"/>
</svg>'''
        
        with open(svg_path, 'w') as f:
            f.write(svg_content)
        
        print(f"Created SVG with embedded high-res PNG: {svg_path}")
        print(f"High-res PNG saved: {high_res_path}")
        return
    
    # If potrace available, trace properly
    # Convert PNG to BMP for potrace
    bmp_path = png_path.replace('.png', '.bmp')
    img = Image.open(png_path).convert('RGB')
    img.save(bmp_path, 'BMP')
    
    # Trace with potrace
    subprocess.run(['potrace', '-s', '-o', svg_path, bmp_path], check=True)
    
    # Clean up BMP
    os.remove(bmp_path)
    print(f"Created traced SVG: {svg_path}")

if __name__ == '__main__':
    png_path = '/home/surfy/.openclaw/workspace/apps/moonslide/public/images/logo.png'
    svg_path = '/home/surfy/.openclaw/workspace/apps/moonslide/public/images/logo.svg'
    png_to_svg(png_path, svg_path)