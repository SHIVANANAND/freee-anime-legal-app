# FreeAnime - Static Web App & Android APK

A modern, fully static anime streaming application that can be deployed to GitHub Pages and converted to an offline Android app using Capacitor.js.

## 🚀 Features

- **Static Site Generation**: All pages pre-rendered for optimal performance
- **GitHub Pages Ready**: Automatic deployment with GitHub Actions
- **Android App**: Offline-capable APK using Capacitor.js
- **YouTube Integration**: Embedded video player for episodes
- **Responsive Design**: Works on all devices
- **Bookmark System**: Save favorite anime series
- **Multiple Categories**: Hindi Dub, English Dub, Hindi Sub, English Sub
- **Search Functionality**: Find anime by title

## 📱 Live Demo

- **Web App**: [GitHub Pages](https://SHIVANANAND.github.io/freee-anime-legal-app/)
- **Android APK**: Download from releases

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom anime theme
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Mobile App**: Capacitor.js
- **Deployment**: GitHub Pages & GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Android Studio (for APK building)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/freee-anime-legal-app.git
   cd freee-anime-legal-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## 📦 Build Commands

### Static Web App
```bash
# Build for production
npm run build

# Preview static build
npx serve out
```

### Android App
```bash
# Build static app and sync with Capacitor
npm run build:android

# Build APK
cd android && gradlew.bat assembleDebug

# APK location: android/app/build/outputs/apk/debug/app-debug.apk
```

## 🌐 GitHub Pages Deployment

### Automatic Deployment (Recommended)

1. **Push to main branch** - GitHub Actions will automatically deploy
2. **Access your site** at `https://yourusername.github.io/freee-anime-legal-app/`

### Manual Deployment

```bash
# Build static site
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Repository Settings

1. Go to **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"
3. The workflow will handle the rest

## 📱 Android App Setup

### Building APK

1. **Install Capacitor globally** (if not already installed)
   ```bash
   npm install -g @capacitor/cli
   ```

2. **Build and sync**
   ```bash
   npm run build:android
   ```

3. **Build APK**
   ```bash
   cd android
   gradlew.bat assembleDebug
   ```

4. **Find APK**
   - Location: `android/app/build/outputs/apk/debug/app-debug.apk`
   - Install on Android device for testing

### Windows Commands

If you're on Windows, use these commands:

```bash
# Build static app
npm run build

# Build Android app
npm run build:android

# Build APK
cd android && gradlew.bat assembleDebug
```

### Release APK

For production release:
```bash
cd android
gradlew.bat assembleRelease
```

## 🏗️ Project Structure

```
freee-anime-legal-app/
├── .github/workflows/        # GitHub Actions
├── android/                  # Capacitor Android project
├── app/                      # Next.js app directory
│   ├── anime/[id]/          # Dynamic anime pages
│   ├── bookmarks/           # Bookmarks page
│   ├── home/                # Home page
│   ├── search/              # Search page
│   └── splash/              # Splash screen
├── components/              # Reusable components
├── data/                    # Anime data and types
├── lib/                     # Utility functions
├── public/                  # Static assets
└── out/                     # Static build output
```

## 🔧 Configuration

### Next.js Config (`next.config.js`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Static export
  trailingSlash: true,        // Required for static hosting
  images: {
    domains: ['placehold.co'],
    unoptimized: true,        // Required for static export
  },
  // Uncomment for GitHub Pages:
  // basePath: '/freee-anime-legal-app',
  // assetPrefix: '/freee-anime-legal-app/',
}

module.exports = nextConfig
```

### Capacitor Config (`capacitor.config.ts`)

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.freeanime.app',
  appName: 'FreeAnime',
  webDir: 'out'  // Static build directory
};

export default config;
```

## 📊 Static Generation

The app uses **Static Site Generation (SSG)** for all pages:

- **Static Pages**: Home, Bookmarks, Search, Splash
- **Dynamic Pages**: All anime detail pages are pre-generated
- **Total Pages**: 571+ static pages generated

## 🎨 Customization

### Theme Colors

Edit `app/globals.css` to customize the anime theme:

```css
:root {
  --background: 210 40% 8%;
  --foreground: 210 40% 98%;
  --primary: 142 100% 60%;    /* Anime green */
  --card: 210 40% 10%;
}
```

### Card Sizes

The app includes different card sizes for optimal display:

- **Medium**: Used in horizontal scroll sections (192px wide)
- **Compact**: Used in category grids (144px wide on mobile)
- **Small**: Minimal size for special cases

Grid layouts automatically use compact cards for better mobile experience.
```

### Adding New Anime Data

1. Update JSON files in `data/` directory
2. Run build to regenerate static pages
3. All new anime pages will be automatically created

## 🚀 Performance

- **Static Generation**: All pages pre-rendered
- **Optimized Images**: Automatic image optimization
- **Code Splitting**: Automatic chunk splitting
- **Caching**: Service worker ready for PWA features

## 📱 Mobile Features

- **Touch Optimized**: All interactions work on mobile
- **Offline Support**: Full app works offline
- **Native Feel**: Capacitor provides native app experience
- **YouTube Player**: Embedded videos work perfectly

## 🐛 Troubleshooting

### Build Issues

**Static export fails:**
- Ensure all dynamic routes have `generateStaticParams`
- Check that images have `unoptimized: true`

**Android build fails:**
- Ensure Android SDK is installed
- Check Java version (17+ recommended)

### GitHub Pages Issues

**404 on refresh:**
- Ensure `trailingSlash: true` in next.config.js
- Check repository name matches `basePath`

## 📄 License

This project is for educational purposes. Please respect copyright laws and content ownership.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

For issues and questions:
- Create GitHub issue
- Check existing issues first
- Provide detailed error logs

---

**Built with ❤️ using Next.js, Capacitor.js, and modern web technologies**
