# Locate Peers - Interactive User Map

Find peers by location and interests on an interactive map with advanced clustering and filtering.

## 🌟 Features

- 🗺️ **Interactive Map** - Powered by Leaflet.js with smooth navigation
- 📍 **10,000 Users** - Real-time visualization with marker clustering
- 🔍 **Smart Filtering** - Filter users by interests with instant results
- 🎯 **Auto-clustering** - Markers automatically group based on zoom level
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Performance Optimized** - Chunked loading and viewport-based rendering
- 🎨 **Modern UI** - Beautiful gradient markers and popups

## 🚀 Quick Start


### Installation

```bash
# Clone the repository
git clone https://github.com/yevhenii-mironenko/locate-peers.git
cd locate-peers/app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Available Scripts

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run deploy        # Deploy to GitHub Pages
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint errors
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
npm run test          # Run tests (watch mode)
npm run test:ui       # Run tests with UI
npm run test:coverage # Generate coverage report
```

## 🛠️ Tech Stack

### Core
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool

### Mapping
- **Leaflet.js** - Interactive map library
- **react-leaflet** - React bindings for Leaflet
- **leaflet.markercluster** - Efficient marker clustering

### Styling
- **CSS3** - Modern CSS with gradients and animations
- **Responsive Design** - Mobile-first approach

### Development Tools
- **ESLint 9** - Code quality and consistency
  - `eslint-plugin-react-hooks` - React hooks rules
  - `eslint-plugin-simple-import-sort` - Auto-sort imports
  - `eslint-plugin-unused-imports` - Remove unused imports
- **Prettier** - Opinionated code formatter
- **Vitest 4** - Fast unit and integration testing
- **Testing Library** - User-centric testing
- **Happy DOM** - Lightweight DOM implementation for tests

## 📁 Project Structure

```
app/
├── public/
│   ├── favicon/              # Favicon files for all platforms
│   └── users.json            # Mock user data (10,000 users)
├── src/
│   ├── assets/               # SVG icons and images
│   │   └── marker-icon.svg
│   ├── components/           # React components
│   │   ├── error-boundary/   # Error boundary component
│   │   ├── error-screen/     # Error display component
│   │   ├── interest-filter/  # Filter input component
│   │   ├── loading-screen/   # Loading spinner component
│   │   └── map/              # Main map component
│   │       ├── hooks/        # Map state management
│   │       ├── map-bounds-tracker/
│   │       └── map-marker-cluster/
│   ├── constants/            # Application constants
│   │   ├── map.constants.ts  # Map config, colors, sizes
│   │   └── ui.constants.ts   # UI text and icons
│   ├── test/                 # Test setup and mocks
│   │   ├── helpers/          # Test helper functions
│   │   └── mocks/            # Mock data and libraries
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   │   ├── create-cluster-icon-html/
│   │   ├── create-popup-html/
│   │   ├── get-cluster-size/
│   │   └── validate-users/
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── .prettierrc              # Prettier configuration
├── eslint.config.js         # ESLint configuration
├── vite.config.ts           # Vite & Vitest configuration
└── tsconfig.json            # TypeScript configuration
```

## 🎯 Key Features Explained

### Marker Clustering
Markers automatically group into clusters when zoomed out, showing the count of users. Click a cluster to zoom in and reveal individual markers.

### Interest Filtering
Type any interest (e.g., "music", "coding", "travel") in the filter box to show only matching users. Filtering is case-insensitive and works in real-time.

### Performance Optimization
- **Viewport-based rendering** - Only visible markers are rendered
- **Chunked loading** - Markers load in batches to prevent UI blocking
- **Debounced updates** - Map bounds updates are debounced for smooth performance
- **Memoization** - Expensive calculations are cached

### User Popups
Click any individual marker to see:
- User's name with gender icon
- List of interests

## 🧪 Testing

The project includes comprehensive tests for all major components:

```bash
npm run test          # Run all tests
npm run test:ui       # Interactive test UI
npm run test:coverage # Coverage report
```

**Test Coverage:**
- Map component integration tests
- User data loading and error handling
- Interest filtering functionality
- Error boundary and error screen
- Utility functions (validation)
- Custom hooks

## 🏗️ Architecture

### State Management Pattern
All hooks follow a consistent `state/actions` pattern:

```typescript
const { state, actions } = useMap()

// state: All readonly data
// actions: All functions to modify state
```

### Component Organization
- Components are named in `kebab-case` (folder names)
- Each component has its own folder with hooks
- Hooks are named `use-[component-name].ts`
- Tests are co-located with components (`*.test.tsx`)
- Utilities are organized in separate folders with tests

### Type Safety
- Strict TypeScript configuration
- Explicit types (no `any` or `as` type assertions)
- Runtime validation for external data (JSON)
- Type-safe utility functions and helpers

## 🎨 Customization

### Map Configuration
Edit `src/constants/map.constants.ts`:

```typescript
export const MAP_CONFIG = {
  CENTER: [50.4501, 30.5234], // [lat, lon]
  INITIAL_ZOOM: 10,
  MIN_ZOOM: 3,
  MAX_ZOOM: 19,
}
```

### Colors
```typescript
export const COLORS = {
  PRIMARY: '#667eea',
  SECONDARY: '#764ba2',
  SPINNER: '#4A90E2',
}
```
