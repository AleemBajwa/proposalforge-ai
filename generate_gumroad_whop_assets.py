import os
from PIL import Image, ImageDraw, ImageFont

output_dir = r"D:\NewIdeas\proposalforge-ai\store_assets"
os.makedirs(output_dir, exist_ok=True)

def get_font(size, bold=True):
    try:
        font_name = "arialbd.ttf" if bold else "arial.ttf"
        return ImageFont.truetype(font_name, size)
    except Exception:
        try:
            return ImageFont.truetype("segoeui.ttf", size)
        except Exception:
            return ImageFont.load_default()

# 1. Gumroad Cover Image (1280x720)
def generate_cover():
    width, height = 1280, 720
    img = Image.new("RGBA", (width, height), (10, 14, 23, 255)) # Dark slate
    draw = ImageDraw.Draw(img)

    # Decorative background card
    draw.rounded_rectangle([50, 50, width - 50, height - 50], radius=24, fill=(19, 28, 46, 255), outline=(36, 53, 82, 255), width=2)

    # Accent top border
    draw.rounded_rectangle([50, 50, width - 50, 66], radius=8, fill=(16, 185, 129, 255))

    font_title = get_font(54)
    font_sub = get_font(25)
    font_badge = get_font(18)
    font_pill = get_font(18, bold=False)

    # Title & Badge
    draw.text((100, 120), "ProposalForge AI", fill=(255, 255, 255, 255), font=font_title)
    draw.rounded_rectangle([560, 130, 710, 172], radius=8, fill=(16, 185, 129, 255))
    draw.text((580, 140), "EARLY BIRD", fill=(10, 14, 23, 255), font=font_badge)

    # Subtitle
    draw.text((100, 195), "High-Converting Upwork Proposal Writer & Cover Letter Auto-Fill", fill=(16, 185, 129, 255), font=font_sub)

    # Features
    features = [
        "⚡ 3-Second Tailored Proposal Generation from Live Job Scope",
        "✍️ 1-Click Direct Auto-Fill into Upwork's Cover Letter Editor",
        "🎯 3 Winning Frameworks: Authority, Direct/Fast & Technical",
        "⚙️ Custom Freelancer Persona (Experience, Stack, Portfolio)",
        "🔒 100% Client-Side Private • Zero Latency • $0 API Fees"
    ]

    y_pos = 265
    for feat in features:
        draw.text((100, y_pos), feat, fill=(203, 213, 225, 255), font=font_pill)
        y_pos += 46

    # Price box
    draw.rounded_rectangle([100, 520, 520, 595], radius=14, fill=(16, 185, 129, 255))
    draw.text((130, 542), "Launch Special: $4.99 (Save 80%)", fill=(10, 14, 23, 255), font=get_font(22))

    # Right side preview box
    draw.rounded_rectangle([750, 120, 1180, 600], radius=16, fill=(10, 14, 23, 255), outline=(16, 185, 129, 255), width=2)
    draw.text((780, 150), "UPWORK IN-PAGE PROPOSAL MODAL", fill=(16, 185, 129, 255), font=get_font(14))

    # Mock proposal content inside card
    draw.rounded_rectangle([780, 185, 1150, 480], radius=8, fill=(19, 28, 46, 255))
    draw.text((800, 205), "Hi, Saw your posting for React & Node.js Dev.", fill=(240, 244, 248, 255), font=get_font(13))
    draw.text((800, 235), "I noticed you need an MVP delivered cleanly.", fill=(148, 163, 184, 255), font=get_font(13))
    draw.text((800, 275), "• Milestones: Kickoff & PostgreSQL schema", fill=(200, 210, 225, 255), font=get_font(13))
    draw.text((800, 305), "• Execution: React Tailwind UI with API auth", fill=(200, 210, 225, 255), font=get_font(13))
    draw.text((800, 335), "• Experience: 6 years production delivery", fill=(200, 210, 225, 255), font=get_font(13))
    draw.text((800, 375), "Available for a 5-min roadmap call today.", fill=(148, 163, 184, 255), font=get_font(13))

    # Auto-fill button simulation
    draw.rounded_rectangle([780, 510, 1150, 565], radius=10, fill=(16, 185, 129, 255))
    draw.text((865, 526), "✍️ Auto-Fill Cover Letter", fill=(10, 14, 23, 255), font=get_font(17))

    cover_path = os.path.join(output_dir, "gumroad_cover_1280x720.png")
    img.save(cover_path)
    print(f"Cover saved: {cover_path}")

# 2. Gumroad / Whop Thumbnail (600x600)
def generate_thumbnail():
    width, height = 600, 600
    img = Image.new("RGBA", (width, height), (10, 14, 23, 255))
    draw = ImageDraw.Draw(img)

    draw.rounded_rectangle([20, 20, width - 20, height - 20], radius=24, fill=(19, 28, 46, 255), outline=(16, 185, 129, 255), width=2)

    # Icon Circle
    draw.ellipse([210, 70, 390, 250], fill=(16, 185, 129, 255))
    draw.text((250, 110), "PF", fill=(10, 14, 23, 255), font=get_font(74))

    # Title
    draw.text((120, 285), "ProposalForge AI", fill=(255, 255, 255, 255), font=get_font(38))

    # Subtitle
    draw.text((95, 345), "Upwork Proposal Writer &", fill=(16, 185, 129, 255), font=get_font(22))
    draw.text((140, 380), "Cover Letter Auto-Fill", fill=(16, 185, 129, 255), font=get_font(22))

    # Pill badge
    draw.rounded_rectangle([150, 450, 450, 515], radius=16, fill=(16, 185, 129, 255))
    draw.text((185, 470), "⚡ $4.99 EARLY BIRD", fill=(10, 14, 23, 255), font=get_font(22))

    thumb_path = os.path.join(output_dir, "thumbnail_600x600.png")
    img.save(thumb_path)
    print(f"Thumbnail saved: {thumb_path}")

if __name__ == "__main__":
    generate_cover()
    generate_thumbnail()
