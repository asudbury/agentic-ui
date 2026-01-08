# Agentic UI

A modern, polished React application demonstrating the principles of Agentic AI design with beautiful light and dark themes.

## 🎯 What is Agentic UI?

Agentic UI represents a paradigm shift in AI interaction design. Unlike traditional chatbots that respond to specific commands, agentic interfaces enable users to specify **goals** rather than tasks, allowing autonomous AI agents to plan, reason, and execute complex workflows independently.

## ✨ Features

### Core Principles
- **Goal-Oriented**: Describe what you want to achieve, not individual tasks
- **Transparent Reasoning**: See how the agent thinks and makes decisions in real-time
- **User Control**: Pause, resume, or stop the agent at any time
- **Activity Tracking**: View a complete history of agent actions with timestamps
- **Adaptive Workflow**: The agent breaks down complex goals into manageable steps

### UI Components
- 🎨 **Theme Toggle**: Seamless light/dark mode with localStorage persistence
- 🤖 **Agent Status**: Real-time visual indicator showing agent state (idle, thinking, active, paused, error)
- 🎯 **Goal Input**: Large, accessible textarea for describing complex objectives
- 🧠 **Reasoning Panel**: Live view of agent's thought process and decision-making
- 📊 **Progress Tracker**: Visual progress through multi-step workflows
- 📝 **Activity Log**: Chronological timeline of all agent actions
- 🎛️ **Control Panel**: User controls for managing agent execution

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Theme Support

The application supports both light and dark themes:
- Automatic detection of system preference
- Manual toggle in the header
- Smooth transitions between themes
- Comprehensive design token system
- WCAG 2.2 AA compliant color contrast

## 📸 Screenshots

### Light Theme
Clean, professional appearance with excellent readability.

### Dark Theme
Eye-friendly dark mode with proper contrast ratios.

### Active Workflow
See the agent in action with reasoning, progress tracking, and activity logs.

## 🏗️ Architecture

Built with modern web technologies and best practices:

- **React 19**: Latest React features including automatic batching
- **TypeScript 5**: Full type safety throughout
- **Vite 7**: Lightning-fast build tool
- **TanStack Query**: Server state management
- **TanStack Router**: Type-safe routing
- **Lucide React**: Beautiful, consistent icons
- **Design Tokens**: CSS variables for comprehensive theming

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run prettier` - Format code with Prettier
- `npm run test` - Run tests
- `npm run docs` - Generate documentation
- `npm run docs:md` - Generate markdown docs
- `npm run docs:html` - Generate HTML docs

## 🧪 Code Quality

- ✅ ESLint configured with strict TypeScript rules
- ✅ Prettier for consistent code formatting
- ✅ Accessibility checks (jsx-a11y)
- ✅ Pre-commit hooks with Husky
- ✅ Comprehensive JSDoc documentation
- ✅ Named exports only (no default exports)
- ✅ useCallback patterns (no inline JSX handlers)
- ✅ Design tokens (no hardcoded colors)

## ♿ Accessibility

This application follows WCAG 2.2 AA guidelines:
- Semantic HTML elements
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Color contrast ratios meet standards
- Focus indicators visible

## 🎓 Learning Resources

To understand the principles behind this implementation:
- [Agentic AI Design Patterns](https://research.aimultiple.com/agentic-ai-design-patterns/)
- [Designing for Autonomy: UX Principles for Agentic AI](https://uxmag.com/articles/designing-for-autonomy-ux-principles-for-agentic-ai-systems)
- [Agentic AI Design Guide](https://www.aufaitux.com/blog/agentic-ai-design-patterns-guide/)

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code passes all linting and formatting checks
- TypeScript types are properly defined
- Components follow accessibility guidelines
- Documentation is updated accordingly

## 📄 License

See LICENSE file for details.
