# 🌸 FLOWSTATE — Focus Better. Live Better.

> A serene, minimalist digital wellness web application designed for students and mindful thinkers to study deeply, calm cognitive overload, audit attention-draining notifications, and sleep with peace.

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Philosophy & Overview

**FLOWSTATE** is built on the core principle:
> **"FLOWSTATE should never feel like another application demanding the user's attention. It should feel like a quiet space where users can regain control of their attention."**

Unlike aggressive productivity apps that guilt students with broken streaks, red alerts, and toxic productivity scores, FLOWSTATE offers:
- **Distraction-Free Focus Studio** with single-tasking timer, **Distraction Parking Lot**, and non-punitive **Rescue Mode**.
- **Digital Detox** with a 6-category **Notification Audit** and intentional **Mindful Scrolling Simulation**.
- **Sleep & Relax** with a Circadian Bedtime Planner, customizable wind-down checklist, 4-7-8 relaxation breathing, and full-screen **Digital Sunset** warm amber mode.
- **My Garden** where daily habits nurture botanical plants (Lavender, Peace Lily, Bonsai, Jade, Mint) that grow with consistency and **never wither on missed days**.
- **Insights & Analytics** with non-clinical, gentle focus trends, habit consistency matrices, and automatic weekly reflection reports.
- **Privacy First**: 100% client-side, zero trackers, stored securely in browser `LocalStorage`.

---

## 📐 Design System & Palette

Carefully balanced minimalist SaaS aesthetics:
- **Deep Navy (`#171A2E`)**: Reserved for typography and selected UI focus anchors.
- **Lavender (`#A99BFF`)**: Luminous, peaceful primary accent.
- **Soft Purple (`#EAE6FF`)**: Subtle background tinting and tags.
- **Mint (`#B8E6D0`)**: Refreshing habit growth and positive milestones.
- **Off-white (`#F8F8FC`)**: Spacious, distraction-free daylight canvas.
- **Digital Sunset (`#191516` / `#E09F67`)**: Warm evening dusk palette to minimize blue light excitation.

---

## 🧭 Application Modules & Routes

1. **Page 1: Welcome & Onboarding (`#/onboarding`)**
   - Introduces the FLOWSTATE philosophy with feature highlights.
   - Interactive setup of student goal, default focus block (25, 45, or 60m), and theme preference.

2. **Page 2: Wellness Dashboard (`#/`)**
   - Real-time time-of-day greeting and formatted date.
   - **Daily Pulse**: 5-mood check-in (`Energetic`, `Focused`, `Okay`, `Overwhelmed`, `Tired`).
   - **Today's Overview**: 3 minimal metrics (Focus Time, Completed Sessions, Habits Completed).
   - **Daily Intention**: Editable personal priority with completion toggle.
   - **Quick Actions**: Start Focus Session, Take a Mindful Break (4-7-8 breathing modal), Wind Down.
   - **Gentle Recommendation**: Non-intrusive encouragement tailored to the day's mood.

3. **Page 3: Focus Studio (`#/focus`)**
   - Presets for 25m (Pomodoro), 45m (College Block), and 60m (Deep Flow) plus custom duration slider.
   - Animated SVG circular countdown timer with start, pause, resume, and reset.
   - Short break (5m) and long break (15m) modes.
   - **Distraction Parking Lot**: Temporary thought capture list to park impulses without context switching.
   - **Rescue Mode**: "Lost your flow? That's okay." Non-punitive quick restart with 10 minutes or short break.
   - Synthesized Web Audio harmonic singing bowl chime (works 100% offline).

4. **Page 4: Digital Detox (`#/detox`)**
   - **Notification Audit**: Classify 6 major notification categories (Emergency, Academic, Work/Email, Social Media, Promotional, Entertainment) into `Essential`, `Important`, or `Distracting`.
   - Visual Attention Breakdown summary with actionable student recommendations.
   - **Mindful Scrolling Simulation**: Timed intentional browsing windows (5, 10, 15m) with awareness prompt: *"Are you still scrolling intentionally?"*.
   - **Digital Habits Reflection**: Saved local reflections on notification frequency and screen boundaries.

5. **Page 5: Sleep & Relax (`#/sleep`)**
   - **Bedtime Planner**: Target bedtime & wake-up time calculator showing planned sleep hours and optimal 45m wind-down start.
   - **Wind-down Routine**: Customizable night checklist (close tabs, put away devices, read, stretch).
   - **Interactive 4-7-8 Breathing Guide**: Parasympathetic nerve reset with animated expanding and contracting visual guide.
   - **Digital Sunset Mode**: Dedicated nighttime UI switch with warm amber tones and distraction-free checklist view.

6. **Page 6: My Garden (`#/garden`)**
   - "Small habits. Meaningful growth."
   - 5 default daily student habits + ability to add custom habits.
   - **Habit Garden**: SVG botanical illustrations (Serene Lavender, Peace Lily, Zen Bonsai, Jade Succulent, Sweet Mint).
   - Growth stages: *Sprouting -> Young Foliage -> Budding -> Blooming -> Flourishing*.
   - Unlockable plants based on cumulative growth points.
   - Missed days never destroy plants.
   - 7-Day Habit Matrix weekly grid.

7. **Page 7: Insights & Analytics (`#/insights`)**
   - Total focus time, completed sessions count, and average session length.
   - Recharts Area Chart: Daily focus duration trends over the past 7 days.
   - Recharts Bar Chart: Habit consistency rates and most consistent habit recognition.
   - Recharts Donut Chart: Emotional energy distribution across check-ins.
   - Automated Weekly Wellness Report summarizing achievements in plain English.
   - **Sample Student Data (Demo Mode)** toggle for instant rich evaluation.

8. **Page 8: Settings (`#/settings`)**
   - Light, Dark, and Digital Sunset theme switcher.
   - Audio chime toggle (synthesized Web Audio API).
   - Notification audit classification reset.
   - Student profile & primary focus customization.
   - Safe data reset with confirmation modal.

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/flowstate.git
cd flowstate

# Install dependencies
npm install

# Run development server with Hot Module Replacement
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📦 Production Build & Testing

```bash
# Build production bundle to /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 GitHub Pages Deployment

The application is pre-configured with:
1. `base: './'` in `vite.config.js` to ensure all JS, CSS, and SVG assets resolve relatively.
2. `HashRouter` routing so direct links and page refreshes work without server-side redirects on GitHub Pages.
3. Pre-configured `predeploy` and `deploy` scripts using `gh-pages`.

### Deploying via npm:
1. In `package.json`, optionally add your repository homepage:
   ```json
   "homepage": "https://<your-username>.github.io/<your-repo-name>"
   ```
2. Run:
   ```bash
   npm run deploy
   ```

### Deploying via GitHub Actions (Recommended):
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## ♿ Accessibility & Responsiveness

- **WCAG AA Compliance**: High contrast ratios across Light, Dark, and Sunset palettes.
- **Keyboard Navigation**: Standard Tab, Shift+Tab, and Enter/Escape support on modals and form inputs.
- **Visible Focus Rings**: Distinct `:focus-visible` styling without relying on color alone.
- **Responsive Navigation**: Persistent desktop sidebar (`md:`) transforming cleanly into top header + bottom navigation bar and slide-out drawer on mobile screens.

---

## 📄 License

MIT License. Designed and crafted with intention for student wellness.
