import os
from PIL import Image, ImageDraw, ImageFont

def make_gradient(width, height, color1, color2):
    base = Image.new("RGB", (width, height), color1)
    top = Image.new("RGB", (width, height), color2)
    mask = Image.new("L", (width, height))
    mask_data = []
    for y in range(height):
        for x in range(width):
            val = int(255 * (x / width * 0.6 + y / height * 0.4))
            mask_data.append(min(255, max(0, val)))
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

out_dir = r"d:\NewIdeas\proposalforge-ai\store_assets"
os.makedirs(out_dir, exist_ok=True)

# 1. Logo 300x300
img_logo = make_gradient(300, 300, (10, 14, 23), (5, 150, 105))
draw = ImageDraw.Draw(img_logo)
try:
    font_lg = ImageFont.truetype("arialbd.ttf", 130)
    font_sm = ImageFont.truetype("arialbd.ttf", 28)
except:
    font_lg = ImageFont.load_default()
    font_sm = ImageFont.load_default()

draw.text((150, 120), "⚡", fill=(16, 185, 129), font=font_lg, anchor="mm")
draw.text((150, 230), "PROPOSALFORGE", fill=(255, 255, 255), font=font_sm, anchor="mm")
img_logo.save(os.path.join(out_dir, "logo_300x300.png"), "PNG")
print("Generated logo_300x300.png")

# 2. Small Promo Tile (440x280)
img_small = make_gradient(440, 280, (7, 10, 19), (6, 95, 70))
draw = ImageDraw.Draw(img_small)
try:
    f_title = ImageFont.truetype("arialbd.ttf", 34)
    f_sub = ImageFont.truetype("arial.ttf", 16)
    f_badge = ImageFont.truetype("arialbd.ttf", 14)
except:
    f_title = f_sub = f_badge = ImageFont.load_default()

for x in range(20, 440, 40):
    draw.line([(x, 0), (x, 280)], fill=(16, 185, 129, 30), width=1)
for y in range(20, 280, 40):
    draw.line([(0, y), (440, y)], fill=(16, 185, 129, 30), width=1)

draw.text((220, 80), "ProposalForge AI", fill=(255, 255, 255), font=f_title, anchor="mm")
draw.text((220, 130), "Win Upwork Jobs in 3 Seconds", fill=(16, 185, 129), font=f_sub, anchor="mm")
draw.text((220, 160), "1-Click Tailored Proposals • Auto-Fill Cover Letters", fill=(148, 163, 184), font=f_sub, anchor="mm")

draw.rounded_rectangle([(120, 200), (320, 240)], radius=20, fill=(16, 185, 129))
draw.text((220, 220), "MANIFEST V3 CERTIFIED", fill=(10, 14, 23), font=f_badge, anchor="mm")
img_small.save(os.path.join(out_dir, "small_promo_440x280.png"), "PNG")
print("Generated small_promo_440x280.png")

# 3. Marquee Promo Tile (1400x560)
img_marquee = make_gradient(1400, 560, (7, 10, 19), (6, 95, 70))
draw = ImageDraw.Draw(img_marquee)
try:
    f_mq_head = ImageFont.truetype("arialbd.ttf", 68)
    f_mq_sub = ImageFont.truetype("arial.ttf", 28)
    f_mq_tag = ImageFont.truetype("arialbd.ttf", 22)
except:
    f_mq_head = f_mq_sub = f_mq_tag = ImageFont.load_default()

for x in range(40, 1400, 70):
    draw.line([(x, 0), (x, 560)], fill=(16, 185, 129, 25), width=1)
for y in range(40, 560, 70):
    draw.line([(0, y), (1400, y)], fill=(16, 185, 129, 25), width=1)

draw.text((700, 170), "ProposalForge: AI Proposal Writer for Upwork™", fill=(255, 255, 255), font=f_mq_head, anchor="mm")
draw.text((700, 260), "Generate High-Converting Bids in Seconds • Tailored to Real Job Requirements", fill=(16, 185, 129), font=f_mq_sub, anchor="mm")
draw.text((700, 320), "1-Click Cover Letter Auto-Fill • Tone Controls • Stop Generic Copy-Paste Spam", fill=(148, 163, 184), font=f_mq_sub, anchor="mm")

badges = ["⚡ 3-Second Generation", "✍️ 1-Click Auto-Fill", "🎯 High-Converting Hooks", "🔒 100% Private Local"]
bx = 200
for b in badges:
    draw.rounded_rectangle([(bx, 420), (bx + 230, 470)], radius=25, fill=(19, 28, 46), outline=(16, 185, 129), width=2)
    draw.text((bx + 115, 445), b, fill=(255, 255, 255), font=f_mq_tag, anchor="mm")
    bx += 260

img_marquee.save(os.path.join(out_dir, "marquee_promo_1400x560.png"), "PNG")
print("Generated marquee_promo_1400x560.png")

# 4. Screenshot 1280x800
img_ss = make_gradient(1280, 800, (10, 14, 23), (15, 23, 42))
draw = ImageDraw.Draw(img_ss)
try:
    f_ss_head = ImageFont.truetype("arialbd.ttf", 52)
    f_ss_sub = ImageFont.truetype("arial.ttf", 24)
    f_ss_card = ImageFont.truetype("arialbd.ttf", 20)
    f_ss_code = ImageFont.truetype("arial.ttf", 18)
except:
    f_ss_head = f_ss_sub = f_ss_card = f_ss_code = ImageFont.load_default()

draw.text((640, 80), "Live Tailored Upwork Proposal Generator", fill=(255, 255, 255), font=f_ss_head, anchor="mm")
draw.text((640, 130), "Instantly extracts job scope, client budget, and stack to write winning proposals", fill=(16, 185, 129), font=f_ss_sub, anchor="mm")

# Upwork Job Card Left
draw.rounded_rectangle([(100, 180), (600, 720)], radius=16, fill=(19, 28, 46), outline=(36, 53, 82), width=1)
draw.text((130, 220), "Upwork Job Post Preview", fill=(16, 185, 129), font=f_ss_card)
draw.text((130, 270), "Title: React & Python Developer for SaaS MVP", fill=(255, 255, 255), font=f_ss_card)
draw.text((130, 310), "Budget: $2,500 Fixed Price • Client Spent: $80k+ (4.9★)", fill=(148, 163, 184), font=f_ss_code)
draw.text((130, 350), "Scope: We need an experienced dev to build a fast MVP...", fill=(200, 210, 225), font=f_ss_code)

# ProposalForge Tailored Output Right
draw.rounded_rectangle([(650, 180), (1180, 720)], radius=16, fill=(19, 28, 46), outline=(16, 185, 129), width=2)
draw.text((680, 220), "ProposalForge Tailored Output (Authority Hook)", fill=(16, 185, 129), font=f_ss_card)
draw.text((680, 270), "Hi, Saw your posting for React & Python Developer.", fill=(255, 255, 255), font=f_ss_code)
draw.text((680, 310), "I noticed you need an MVP delivered without technical debt.", fill=(200, 210, 225), font=f_ss_code)
draw.text((680, 350), "• Approach: Modular FastAPI backend with React Tailwind UI", fill=(200, 210, 225), font=f_ss_code)
draw.text((680, 390), "• Experience: 6 years building production SaaS workflows", fill=(200, 210, 225), font=f_ss_code)
draw.text((680, 430), "• Turnaround: Sprint 1 delivered in 4 days with clean docs.", fill=(200, 210, 225), font=f_ss_code)

draw.rounded_rectangle([(680, 580), (900, 630)], radius=10, fill=(36, 53, 82))
draw.text((790, 605), "📋 Copy Proposal", fill=(255, 255, 255), font=f_ss_card, anchor="mm")

draw.rounded_rectangle([(920, 580), (1150, 630)], radius=10, fill=(16, 185, 129))
draw.text((1035, 605), "✍️ Auto-Fill Cover Letter", fill=(10, 14, 23), font=f_ss_card, anchor="mm")

img_ss.save(os.path.join(out_dir, "screenshot_1280x800.png"), "PNG")
print("Generated screenshot_1280x800.png")
