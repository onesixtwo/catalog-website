# VARGAS CATALOG 🚀

A retro-themed collection of random utilities built with React.

## 🚀 Quick Start

\`\`\`bash
npm install
npm start
\`\`\`

Open \`http://localhost:3000\`

## 🛠️ Tech Stack

- **React 19** - Modern React with latest features
- **React Router** - Client-side routing
- **CSS3** - Custom styling with CSS variables
- **WebLLM** - Local AI processing for Butterfly Effect
- **Press Start 2P & VT323** - Retro fonts
- **Dancing Script** - Romantic font for Valentine cards

## 🌐 Deployment

### Netlify (Recommended)
The project includes Netlify configuration:

\`\`\`toml
[build]
  command = "CI=false npm run build"
  publish = "build"

[build.environment]
  CI = "false"
  GENERATE_SOURCEMAP = "false"
\`\`\`

### Manual Deployment
1. Run \`npm run build\`
2. Deploy the \`build\` folder to your hosting service
3. Configure redirects for client-side routing

## Known Issues

- **WebLLM**: First-time model download can be slow
- **Mobile**: Some animations may be reduced for performance
- **Safari**: AI features may have limited compatibility

© 2003 VARGAS RANDOM BULLSHIT COLLECTION
