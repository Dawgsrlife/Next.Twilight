# Next.js Twilight - Modern Web Development Starter

A beautiful tutorial and playground repository designed for learning and experimenting with modern frontend technologies such as Next.js, TypeScript, Tailwind CSS, and Framer Motion. This project features a stunning twilight-inspired color scheme, smooth animations, and interactive components.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?style=flat-square)](https://github.com/Dawgsrlife/nextjs-typescript-starter)

## 📱 Demo



---

## ✨ Features

- Next.js 14 (App Router)
- TypeScript 5.x
- Tailwind CSS 4.x with custom twilight theme
- Animated dark/light mode with smooth transitions
- Stunning scroll-triggered animations
- Beautiful interactive UI components
- Responsive design with mobile navigation
- Framer Motion animations and transitions
- Local storage persistence
- Zustand for simple state management
- Multiple example pages and features
- Background audio with sound effects

### Interactive Features

- **Todo App**: A fully functional todo application with filtering, animations, and local storage
- **Login Demo**: A beautiful login page with form validation and animations
- **About Page**: Learn about the project with scroll-triggered animations and parallax effects
- **Keyboard Shortcuts**: Global keyboard shortcuts for navigation and theme toggling
- **Hidden Surprises**: Fun Easter eggs waiting to be discovered
- **Audio System**: Background lofi music with sound effects and mute control

---

## 🛠 Tech Stack

- **Frontend Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **State Management:** Zustand
- **Typography:** Custom fonts with Playfair Display and Inter

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>=18)
- pnpm (recommended)

### Setup Instructions

1. Clone the repository
```
git clone https://github.com/Dawgsrlife/nextjs-typescript-starter.git
cd nextjs-typescript-starter
```

2. Install dependencies
```
pnpm install
```

3. Start the development server
```
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧩 Project Structure

```
src/
├── app/
│   ├── animations/      # Animation utilities
│   ├── components/      # React components
│   │   └── ui/          # Reusable UI components
│   ├── store/           # State management
│   ├── about/           # About page with animations
│   ├── login/           # Login demo page
│   ├── todo/            # Todo app page
│   ├── layout.tsx       # Root layout component
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── public/              # Static assets
└── ...
```

---

## 🎨 Twilight Theme

This project features a beautiful twilight-inspired color scheme with smooth transitions between light and dark modes. The colors are designed to create a calming, immersive experience.

### Light Mode
Soft light backgrounds with subtle purple accents create a clean, professional look.

<p align="center">
  <img src="/public/project_screenshots/Home Page, light.png" alt="Light Mode" width="80%">
</p>

### Dark Mode
Rich deep blues and purples provide a comfortable reading experience with reduced eye strain.

<p align="center">
  <img src="/public/project_screenshots/Home Page, dark.png" alt="Dark Mode" width="80%">
</p>

---

## 🥚 Easter Eggs

This project includes a fun Easter egg that can be triggered by typing a specific sequence of letters. Can you find it? 

Hint: Think about spring animals... 🐣

When triggered, you'll hear delightful "chicks_cheeps" sounds accompanying a vibrant animation!

---

## 🌟 Animation Features

- Scroll-triggered animations (Apple-style)
- Parallax effects
- Smooth page transitions
- Interactive UI elements
- Theme transition effects
- Staggered animations

<p align="center">
  <img src="/public/project_screenshots/About Page, dark.png" alt="About Page with Animations" width="80%">
</p>

---

## 📚 Learning Goals

- Learn Next.js App Router structure
- Use Tailwind CSS effectively
- Build beautiful, reusable components
- Create complex animations with Framer Motion
- Implement responsive designs
- Structure a professional frontend project

---

## 💻 Project Screenshots

### Todo Application
Manage tasks with a beautiful interface and animations

<p align="center">
  <img src="/public/project_screenshots/TODO Tasks, dark.png" alt="TODO Tasks" width="80%">
</p>

<p align="center">
  <img src="/public/project_screenshots/TODO Active Tasks, dark.png" alt="TODO Active Tasks" width="80%">
</p>

<p align="center">
  <img src="/public/project_screenshots/TODO Partially Complete Tasks, dark.png" alt="TODO Partially Complete Tasks" width="80%">
</p>

### Music and Hotkeys Interface
Intuitive controls with keyboard shortcuts

<p align="center">
  <img src="/public/project_screenshots/TypeScript Page, light + with music and hotkeys.png" alt="TypeScript Page with Music and Hotkeys" width="80%">
</p>

<p align="center">
  <img src="/public/project_screenshots/Popups, dark.png" alt="Popups Interface" width="80%">
</p>

### Team Page
Beautiful presentation of team members

<p align="center">
  <img src="/public/project_screenshots/Team, dark.png" alt="Team Page" width="80%">
</p>

### Tailwind Components
Reusable UI components built with Tailwind CSS

<p align="center">
  <img src="/public/project_screenshots/Tailwind Components, light.png" alt="Tailwind Components" width="80%">
</p>

---

## 🤝 Contributing

1. Fork this repository
2. Create your branch: 
```
git checkout -b feature/my-new-feature
```
3. Commit your changes:
```
git commit -m "feat: add new feature"
```
4. Push to your branch:
```
git push origin feature/my-new-feature
```
5. Open a Pull Request

---

## 💡 Notes

This project blends beauty with functionality, providing a perfect starting point for learning modern web development or building your next project. Feel free to explore, modify, and build upon this starter.

---

## 🙏 Acknowledgements

- Developed with ❤️ by [AlexanderTheMango / Dawgsrlife](https://github.com/Dawgsrlife)
- Inspired by the beauty of twilight colors and modern web design

---

## 🔊 Audio Features

This project includes a complete audio management system for an enhanced user experience:

- **Background Music**: Relaxing lofi music plays in the background while browsing the site
- **Sound Effects**: Interactive sound effects for special events and Easter eggs
- **Audio Controls**: Easy mute/unmute button in the header
- **Keyboard Shortcuts**: 
  - Toggle audio with CTRL+M 
  - Play/pause with Spacebar
  - Toggle music player with CTRL+J
  - Toggle keyboard shortcuts with CTRL+K or /
  - ESC key closes popups in order (last opened closes first)
- **Music Player**: Beautiful popup player with real-time audio visualization and live waveform display
- **Dedicated Player Button**: Quick access to the music player via a dedicated button next to the keyboard shortcuts
- **Smart UI Positioning**: Interface elements reposition themselves to avoid overlap
- **Smooth Transitions**: Audio fades in/out smoothly between different sounds
- **Error Handling**: Robust error handling for audio playback

The audio system is built with the Web Audio API and includes fallbacks for browsers with autoplay restrictions.

---
