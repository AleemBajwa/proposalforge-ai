import os
from PIL import Image, ImageDraw, ImageFont

def generate_icon(size, output_path):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    corner_radius = int(size * 0.22)
    # Deep emerald to mint gradient base
    draw.rounded_rectangle(
        [(0, 0), (size - 1, size - 1)],
        radius=corner_radius,
        fill=(16, 185, 129, 255)
    )

    # Center text "PF" or lightning
    text = "PF"
    try:
        font_size = int(size * 0.55)
        font = ImageFont.truetype("arialbd.ttf", font_size)
    except:
        font = ImageFont.load_default()

    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = (size - tw) // 2
    ty = (size - th) // 2 - int(size * 0.05)

    draw.text((tx, ty), text, fill=(10, 14, 23, 255), font=font)

    # Sparkle / pip in top right
    pip_radius = max(2, int(size * 0.12))
    px = size - pip_radius - int(size * 0.08)
    py = pip_radius + int(size * 0.08)
    draw.ellipse(
        [(px - pip_radius, py - pip_radius), (px + pip_radius, py + pip_radius)],
        fill=(255, 255, 255, 255),
        outline=(16, 185, 129, 255),
        width=max(1, size // 32)
    )

    img.save(output_path, "PNG")
    print(f"Generated {output_path} ({size}x{size})")

os.makedirs(r"d:\NewIdeas\proposalforge-ai\icons", exist_ok=True)
for s in [16, 48, 128]:
    generate_icon(s, rf"d:\NewIdeas\proposalforge-ai\icons\icon{s}.png")
