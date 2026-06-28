# Abhimanyu Badiger — Systems & MLOps Engineering Portfolio

A bespoke, production-ready, highly-optimized Single Page Application (SPA) showcasing the technical craftsmanship, low-level hypervisor development, bare-metal networking systems, and MLOps workflows of Abhimanyu Badiger.

Designed with an **Anti-AI-Native Industrial Aesthetic**—favoring minimalist layouts, precise 1px grids, specialized technical fonts, and active telemetries over generic landing page templates.

## 🛠️ Architecture & Tech Stack

- **Core**: React 19 (TypeScript) + Vite
- **Styling**: Tailwind CSS v3 (Customized Theme)
- **Icons**: Lucide React + Custom Inline SVGs
- **Fonts**:
  - `IBM Plex Sans` (Google Fonts): Primary content presentation and headers.
  - `IBM Plex Mono` (Google Fonts): Technical readouts, configuration flags, code metrics, and logs.
- **Diagnostics**: Custom state-driven terminal monitors simulating runtime steps of system processes (ELF parser, BGP negotiations, LoRA weight hot-swapping, eBPF telemetry hooks).
- **Home Lab Monitor**: Interactive schematic depicting the physical server rack (1U–4U) stack.

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install the development dependencies:
```bash
npm install
```

### 2. Run Local Development Server
Launch the hot-reloading development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
Compile and bundle the application into highly-optimized, static assets:
```bash
npm run build
```
The output will be placed in the `/dist` directory.

---

## ☁️ Cloudflare Pages Deployment

This project is statically compatible and fully ready for instant deployment to Cloudflare Pages.

### Setup Settings
When linking this repository to your Cloudflare dashboard, use the following build configurations:

| Parameter | Configuration Value |
| :--- | :--- |
| **Framework Preset** | `Vite` |
| **Build Command** | `npm run build` |
| **Build Output Directory** | `dist` |
| **Root Directory** | `/` (or current directory path) |

---

## 🎨 Theme & Customization Specs

Our customized configuration (`tailwind.config.js`) integrates:
- **Base Background**: `#0a0a0c` (Charcoal Carbon) paired with a `24px` grid pattern representing system blueprint grids.
- **Layout Borders**: `#222227` (Muted Steel), shifting to `#38383f` or `#e05a36` (Safety Orange) on active focus states.
- **Mechanical Transitions**: Deliberate `150ms-200ms` cubic-bezier ease-out animations mimicking high-end diagnostic hardware dashboards.
