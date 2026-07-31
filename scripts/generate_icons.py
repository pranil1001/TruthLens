import os
import struct
import zlib

def create_png(width, height, fill_color=(26, 22, 46, 255), shield_color=(22, 199, 132, 255)):
    # Create raw RGBA image data
    pixels = bytearray()
    
    center_x = width / 2.0
    center_y = height / 2.0
    radius = min(width, height) * 0.42

    for y in range(height):
        pixels.append(0)  # Filter type 0 (None)
        for x in range(width):
            dx = (x - center_x) / radius
            dy = (y - center_y) / radius
            dist = dx * dx + dy * dy
            
            # Simple shield shape mask or rounded square with emerald lens accent
            if dist <= 0.85:
                # Shield body / emerald lens glow
                r, g, b, a = shield_color
                if dist > 0.5:
                    r, g, b, a = (30, 41, 59, 255)  # Dark slate ring
            elif dist <= 1.0:
                r, g, b, a = (22, 199, 132, 200) # Glowing border
            else:
                r, g, b, a = fill_color  # Background
            
            pixels.extend([r, g, b, a])

    # PNG File Header
    png = bytearray(b'\x89PNG\r\n\x1a\n')
    
    # IHDR Chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data)
    png.extend(struct.pack('>I', len(ihdr_data)))
    png.extend(b'IHDR')
    png.extend(ihdr_data)
    png.extend(struct.pack('>I', ihdr_crc))

    # IDAT Chunk (Compressed pixel data)
    compressed = zlib.compress(pixels, 9)
    idat_crc = zlib.crc32(b'IDAT' + compressed)
    png.extend(struct.pack('>I', len(compressed)))
    png.extend(b'IDAT')
    png.extend(compressed)
    png.extend(struct.pack('>I', idat_crc))

    # IEND Chunk
    iend_crc = zlib.crc32(b'IEND')
    png.extend(struct.pack('>I', 0))
    png.extend(b'IEND')
    png.extend(struct.pack('>I', iend_crc))

    return bytes(png)

os.makedirs("public/icons", exist_ok=True)
for size in [16, 48, 128]:
    with open(f"public/icons/icon{size}.png", "wb") as f:
        f.write(create_png(size, size))

print("Icons generated successfully in public/icons/")
