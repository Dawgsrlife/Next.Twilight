# Next.js + TypeScript + Tailwind CSS Starter

A tutorial and playground repository designed for learning and experimenting with modern frontend technologies such as Next.js, TypeScript, Tailwind CSS, Framer Motion, and next-themes. Created to help newcomers (and my friend Richard) get comfortable building sleek, animated, and themeable web applications.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?style=flat-square)](https://github.com/yourusername/nextjs-typescript-starter)

---

## ✨ Features

- Next.js 14 (App Router)
- TypeScript 5.x
- Tailwind CSS 4.x
- Dark/Light mode support via next-themes
- Smooth animations with Framer Motion
- Zustand for simple state management
- Example pages, components, and layouts
- Pre-configured with common patterns

---

## 🛠 Tech Stack

- **Frontend Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **State Management:** Zustand
- **Theme Switching:** next-themes

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>=18)
- pnpm (recommended)

### Setup Instructions

1. Clone the repository
```
git clone https://github.com/yourusername/nextjs-typescript-starter.git
cd nextjs-typescript-starter
```

2. Install dependencies
```
pnpm install
```

3. Start the development server
```
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧩 Project Structure

```
src/
├── components/
├── pages/
├── app/
├── styles/
├── lib/
└── hooks/
```

---

## 🌙 Dark / Light Mode

This starter comes with built-in dark/light mode support using `next-themes`.

Example usage:
```tsx
import { ThemeProvider } from 'next-themes'

export default function App({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
```

---

## 📚 Learning Goals

- Learn Next.js App Router structure
- Use Tailwind CSS effectively
- Build reusable components
- Animate with Framer Motion
- Manage theme switching
- Organize and structure a real frontend project

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

This repo is intentionally kept simple and beginner-friendly, perfect for learning or building a small project on top.

---
