# ProposalForge AI — Chrome Web Store & Edge Add-ons Listing Assets

---

## 📌 Extension Details

- **Title (Store Name):**  
  `ProposalForge: AI Proposal Writer for Upwork™`  *(45 characters max)*

- **Short Summary (Store Subtitle):**  
  `Generate winning, tailored Upwork proposals in 3 seconds. Instant cover letter writer, screening question helper & auto-fill.` *(124 characters)*

- **Category:**  
  `Workflow & Planning` (or `Productivity`)

- **Primary Language:**  
  `English (United States)`

- **Pricing:**  
  `Free with Pro License Upgrade option`

---

## 📝 Detailed Description (Formatted for Chrome Web Store)

```markdown
⚡ Stop Losing Upwork Jobs to Generic Template Bidders. Win More Contracts in 3 Seconds.

Clients on Upwork receive dozens of generic ChatGPT proposals within minutes of posting. If your bid looks like an AI template ("Dear Hiring Manager, I am thrilled to apply..."), it gets archived immediately.

ProposalForge AI writes high-converting, tailored Upwork proposals directly on your active job tab in 3 seconds flat—then auto-fills the Upwork cover letter with a single click.

----------------------------------------------------------------
🚀 WHY TOP FREELANCERS USE PROPOSALFORGE AI
----------------------------------------------------------------
• ⚡ 3-Second Tailored Generation: Ingests the actual project title, technical scope, budget tier, client spend, and required skills right from the page.
• ✍️ 1-Click Auto-Fill: Never copy and paste again. One click places your finished proposal directly into Upwork's Cover Letter form field.
• 🎯 3 Proven Frameworks:
    1. 🏆 Authority Hook: Highlights domain depth, fast turnaround, and zero hand-holding.
    2. ⚡ Direct & Fast: 3-step actionable milestone roadmap for quick-start projects.
    3. 💻 Technical & Scalable: Deep architecture and clean-code positioning.
• ⚙️ Custom Freelancer Persona: Save your credentials, years of experience, and portfolio links once. Every proposal automatically reflects your real expertise.
• 🔒 100% Client-Side & Private: Zero remote tracking. Everything runs locally inside your browser with zero latency.

----------------------------------------------------------------
💡 HOW IT WORKS IN 3 STEPS
----------------------------------------------------------------
1. Open any job posting on Upwork.
2. Click the floating "⚡ ProposalForge AI" pill or the extension icon.
3. Select your desired tone and click "Auto-Fill Cover Letter". Your custom proposal is ready to submit!

----------------------------------------------------------------
🔒 PRIVACY & SECURITY FIRST
----------------------------------------------------------------
ProposalForge AI operates strictly on client-side browser APIs. We never collect, sell, or transmit your proposals, client job history, or personal data to external servers.

----------------------------------------------------------------
DISCLAIMER:
ProposalForge AI is an independent productivity extension created by Aleemice and is not officially affiliated with or endorsed by Upwork Global Inc. Upwork™ is a registered trademark of Upwork Inc.
```

---

## 🛡️ Privacy Policy & Single Purpose Disclosures

### Single Purpose Description
> "To assist freelancers in drafting and formatting personalized job proposals based on visible Upwork project requirements and automatically populating them into the Upwork cover letter textarea."

### Permissions Justification:
- `activeTab`: Used strictly to detect when the user is viewing an Upwork job post and extract the visible job requirements (title, budget, required skills) to compose the proposal.
- `storage`: Used solely to store the freelancer's custom profile credentials (name, years of experience, title, portfolio link) and tone preferences locally in browser storage.
- `scripting`: Used to populate the generated proposal text into the on-page cover letter input field upon explicit user action.
- `host_permissions` (`https://*.upwork.com/*`): Required to inject the floating helper button and interact with Upwork job post pages.

---

## 🎨 Graphic Assets Checklist

All required store graphic assets are generated and located in `store_assets/`:
1. **Store Icon:** `store_assets/store_icon_128x128.png` (128 x 128 px)
2. **Small Promo Tile:** `store_assets/small_promo_440x280.png` (440 x 280 px)
3. **Marquee Promo Tile:** `store_assets/marquee_promo_1400x560.png` (1400 x 560 px)
4. **Primary Screenshot:** `store_assets/screenshot_1280x800.png` (1280 x 800 px)
5. **App Package:** `proposalforge-v1.0.0.zip` (14.2 KB)
