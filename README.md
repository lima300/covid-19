# 🦠 COVID-19 Interactive Dashboard

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.21-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vuex](https://img.shields.io/badge/Vuex-4.1.0-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4.5.0-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.6-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

## 📊 Overview

A **production-ready**, enterprise-level COVID-19 dashboard built with modern web technologies. This application demonstrates advanced frontend development skills, featuring real-time data visualization, responsive design, state management, and robust error handling.

### 🚀 Live Demo

- **Local Development**: `http://localhost:5174/`
- **Production Build**: `npm run build && npm run preview`

## ✨ Key Features

### 🎯 **Core Functionality**

- **Real-time COVID-19 Statistics** - Global and country-specific data
- **Interactive Data Visualization** - Dynamic charts with Chart.js integration
- **Country Selection & Filtering** - Comprehensive country picker with search
- **Historical Data Trends** - 30-day historical analysis with smooth animations
- **Analytics Dashboard** - Recovery rates, mortality rates, and active cases

### 🎨 **User Experience**

- **Dark/Light Mode Toggle** - Persistent theme switching with localStorage
- **Responsive Design** - Mobile-first approach, works on all devices
- **Animated Counters** - Smooth number animations for statistics
- **Loading States** - Professional loading indicators and skeleton screens
- **Error Handling** - Graceful fallbacks with user-friendly messages
- **Toast Notifications** - Real-time feedback for user actions

### 🏗️ **Technical Excellence**

- **Type Safety** - 100% TypeScript implementation across all components
- **State Management** - Vuex 4 with modules, actions, mutations, and getters
- **API Integration** - Axios with interceptors and automatic retries
- **Component Architecture** - Reusable, modular Vue 3 components
- **Modern Build System** - Vite for lightning-fast development and builds

## 🛠️ Technology Stack

| Category             | Technology             | Version       | Purpose                          |
| -------------------- | ---------------------- | ------------- | -------------------------------- |
| **Framework**        | Vue.js                 | 3.5.21        | Progressive JavaScript framework |
| **Language**         | TypeScript             | 5.8.3         | Type-safe JavaScript development |
| **State Management** | Vuex                   | 4.1.0         | Centralized state management     |
| **Routing**          | Vue Router             | 4.5.1         | Client-side routing              |
| **Styling**          | TailwindCSS            | 4.1.13        | Utility-first CSS framework      |
| **Charts**           | Chart.js + vue-chartjs | 4.5.0 + 5.3.2 | Interactive data visualization   |
| **HTTP Client**      | Axios                  | 1.12.2        | Promise-based HTTP client        |
| **Icons**            | Heroicons Vue          | 2.2.0         | Beautiful SVG icons              |
| **Build Tool**       | Vite                   | 7.1.6         | Next-generation frontend tooling |
| **Package Manager**  | Yarn                   | Latest        | Dependency management            |

## 📁 Project Architecture

```
src/
├── api/                    # API layer & data fetching
│   ├── covidApi.ts        # COVID-19 API integration
│   └── mockData.ts        # Fallback mock data
├── components/            # Reusable Vue components
│   ├── DashboardCard.vue  # Statistics display cards
│   ├── LineChart.vue      # Interactive chart component
│   ├── CountrySelector.vue # Country dropdown selector
│   ├── AnalyticsPanel.vue # Advanced analytics display
│   ├── AnimatedCounter.vue # Smooth number animations
│   ├── LoadingSpinner.vue # Loading state indicators
│   └── ToastNotification.vue # User feedback system
├── store/                 # Vuex state management
│   ├── index.ts          # Store configuration
│   └── covidModule.ts    # COVID data module
├── types/                 # TypeScript definitions
│   ├── covid.ts          # COVID-19 data interfaces
│   └── index.ts          # Type exports
├── views/                 # Page-level components
│   └── Dashboard.vue     # Main dashboard view
├── router/               # Vue Router configuration
│   └── index.ts          # Route definitions
├── App.vue               # Root component
├── main.ts               # Application entry point
└── style.css             # Global styles & Tailwind
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v20.19.0 or higher)
- **Yarn** or **npm**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/covid-19-dashboard.git
cd covid-19-dashboard

# Install dependencies
yarn install
# or
npm install

# Start development server
yarn dev
# or
npm run dev
```

### Build for Production

```bash
# Type-check and build
yarn build
# or
npm run build

# Preview production build
yarn preview
# or
npm run preview
```

## 🧩 Component Showcase

### 📊 **DashboardCard**

- Animated statistics display
- Color-coded data visualization
- Hover effects and transitions
- Change indicators with arrows

### 📈 **LineChart**

- Interactive Chart.js integration
- Dark mode support
- Responsive design
- Custom tooltips and legends

### 🌍 **CountrySelector**

- Searchable dropdown
- Real-time data fetching
- Loading states
- Error handling

### 📐 **AnalyticsPanel**

- Recovery rate calculations
- Mortality rate visualization
- Progress bars and indicators
- Statistical analysis

## 🎨 Design System

### Color Palette

- **Primary**: Blue (#3B82F6) - Trust and reliability
- **Success**: Green (#10B981) - Recovery data
- **Warning**: Yellow (#F59E0B) - Active cases
- **Danger**: Red (#EF4444) - Critical data
- **Neutral**: Gray scale for backgrounds and text

### Typography

- **System Fonts**: -apple-system, BlinkMacSystemFont, 'Segoe UI'
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
- **Responsive Scaling**: rem units with mobile-first approach

### Animations

- **Duration**: 200ms-300ms for interactions, 2s for counters
- **Easing**: ease-out for natural motion
- **Transitions**: Color, transform, opacity changes

## 🔧 Configuration

### Environment Variables

```env
# API Configuration (optional)
VITE_API_BASE_URL=https://disease.sh/v3/covid-19
VITE_API_TIMEOUT=5000

# Feature Flags
VITE_ENABLE_MOCK_DATA=true
VITE_ENABLE_ANALYTICS=false
```

### Build Configuration

- **TypeScript**: Strict mode enabled
- **ESLint**: Vue 3 + TypeScript rules
- **Vite**: Optimized for modern browsers
- **PostCSS**: TailwindCSS processing

## 📱 Responsive Design

| Breakpoint  | Size           | Layout                          |
| ----------- | -------------- | ------------------------------- |
| **Mobile**  | < 768px        | Single column, stacked cards    |
| **Tablet**  | 768px - 1024px | Two columns, side navigation    |
| **Desktop** | > 1024px       | Three columns, full dashboard   |
| **Large**   | > 1440px       | Expanded spacing, larger charts |

## 🔍 API Integration

### Primary Data Source

- **disease.sh API** - Reliable COVID-19 statistics
- **Endpoints**: `/all`, `/countries`, `/countries/{country}`
- **Rate Limiting**: Respectful request patterns
- **Error Handling**: Automatic fallback to mock data

### Fallback System

- **Mock Data**: Realistic demonstration data
- **Offline Support**: Works without internet connection
- **Development Mode**: Consistent data for testing

## 🧪 Testing Strategy

### Unit Testing (Planned)

- **Vue Test Utils** for component testing
- **Jest** for JavaScript testing
- **TypeScript** type checking
- **Coverage**: Aim for >90% code coverage

### E2E Testing (Planned)

- **Cypress** for integration testing
- **User journey** testing
- **Cross-browser** compatibility
- **Mobile testing** on real devices

## 🚢 Deployment Options

### Static Hosting

```bash
# Build for production
npm run build

# Deploy to Netlify, Vercel, or GitHub Pages
# Output in ./dist directory
```

### Docker Container

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🎯 Performance Optimizations

### Bundle Size

- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Route-based lazy loading
- **Asset Optimization**: Image compression and caching
- **Gzip Compression**: Reduced transfer sizes

### Runtime Performance

- **Virtual Scrolling**: For large data sets
- **Memoization**: Computed properties and watchers
- **Debouncing**: User input handling
- **Lazy Loading**: Components and images

## 🔒 Security Features

- **XSS Protection**: Sanitized data rendering
- **CSRF Prevention**: Token-based requests
- **Content Security Policy**: Restricted resource loading
- **HTTPS Only**: Secure data transmission
- **Input Validation**: Client and server-side checks

## 👥 Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- **ESLint**: Automated code linting
- **Prettier**: Code formatting
- **Conventional Commits**: Standardized commit messages
- **TypeScript**: Strict type checking

## 📊 Browser Support

| Browser           | Version | Support         |
| ----------------- | ------- | --------------- |
| **Chrome**        | > 90    | ✅ Full Support |
| **Firefox**       | > 88    | ✅ Full Support |
| **Safari**        | > 14    | ✅ Full Support |
| **Edge**          | > 90    | ✅ Full Support |
| **Mobile Safari** | > 14    | ✅ Full Support |
| **Chrome Mobile** | > 90    | ✅ Full Support |

## 🏆 Project Highlights

### 💼 **Professional Features**

- Enterprise-grade architecture
- Scalable component design
- Production-ready configuration
- Comprehensive error handling

### 🎨 **Design Excellence**

- Modern, clean interface
- Consistent design system
- Accessibility compliance
- Mobile-first responsive design

### ⚡ **Performance**

- Lightning-fast Vite builds
- Optimized bundle sizes
- Smooth animations
- Efficient state management

### 🔧 **Developer Experience**

- TypeScript for type safety
- Hot module replacement
- Comprehensive tooling
- Clear project structure

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🤝 Acknowledgments

- **Vue.js Team** - For the amazing framework
- **TailwindCSS** - For the utility-first CSS framework
- **Chart.js** - For powerful data visualization
- **disease.sh** - For reliable COVID-19 data API
- **Heroicons** - For beautiful SVG icons

## 👨‍💻 Author

**Otavio Lima**

- 🌐 Portfolio: [Your Portfolio URL]
- 💼 LinkedIn: [https://www.linkedin.com/in/otavio-lima-soares/]
- 📧 Email: [otavio.lima.vga@gmail.com]
- 🐱 GitHub: [@lima300]

---

<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**

Made with ❤️ and Vue.js

</div>
