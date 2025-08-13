# OTN DUT Analyzer - React Application

A comprehensive React application for OTN DUT analysis with modular components and routing.

## Project Structure

```
src/
├── Sidebar.jsx          # Main sidebar navigation wrapper
├── Sidebar.css          # Sidebar styling
├── Dashboard.jsx        # Dashboard component (dashboard content only)
├── Dashboard.css        # Dashboard styling
├── LaneMonitor.jsx      # Lane monitoring component
├── LaneMonitor.css      # Lane monitor styling
├── graph.jsx           # Hex stream graph component
├── graph.css           # Graph styling
├── App.jsx             # Main app with routing
└── App.css             # Global styles
```

## Components Overview

### 1. Sidebar Component (`Sidebar.jsx`)
- **Purpose**: Main navigation wrapper that provides consistent sidebar navigation
- **Features**: 
  - Responsive sidebar with "OTN DUT ANALYZER" header
  - Navigation menu with active state highlighting
  - Uses React Router for navigation
  - Wraps child components in main content area

### 2. Dashboard Component (`Dashboard.jsx`)
- **Purpose**: Dashboard content with widgets and recording controls
- **Features**:
  - System status pie chart
  - Pattern analysis bar chart
  - Performance metrics line chart
  - System alerts
  - Start/Stop recording functionality with timer

### 3. Lane Monitor Component (`LaneMonitor.jsx`)
- **Purpose**: Monitor and analyze logical lanes
- **Features**:
  - 20 logical lanes with status indicators
  - Pattern detection analysis
  - Hex stream visualization
  - Lane statistics and metrics

### 4. Hex Stream Graph Component (`graph.jsx`)
- **Purpose**: Analyze hexadecimal stream patterns
- **Features**:
  - Pattern detection with 16320-byte difference analysis
  - Bar charts with color-coded results
  - Hex stream input and visualization

## Routing Structure

The application uses React Router with the following routes:

- `/` - Dashboard (default)
- `/logical-lanes` - Lane Monitor
- `/frame-alignment` - Frame Alignment (placeholder)
- `/multiframe` - Multiframe (placeholder)
- `/hex-graph` - Hex Stream Graph

## How to Use

### Basic Usage

```jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Sidebar>
        <Dashboard />
      </Sidebar>
    </Router>
  );
}
```

### With Multiple Routes

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import LaneMonitor from './LaneMonitor';

function App() {
  return (
    <Router>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lanes" element={<LaneMonitor />} />
        </Routes>
      </Sidebar>
    </Router>
  );
}
```

### Standalone Components

You can also use components individually without the sidebar:

```jsx
import React from 'react';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}
```

## Dependencies

```json
{
  "dependencies": {
    "react": "^16.8.0",
    "react-dom": "^16.8.0",
    "react-router-dom": "^6.0.0",
    "recharts": "^2.0.0"
  }
}
```

## Key Features

### Sidebar Navigation
- **Consistent Layout**: All pages share the same sidebar navigation
- **Active State**: Current route is highlighted in the navigation
- **Responsive Design**: Adapts to mobile and desktop screens
- **Professional Appearance**: Modern gradient design with smooth transitions

### Dashboard Widgets
- **Real-time Recording**: Start/stop recording with live timer
- **Interactive Charts**: Pie charts, bar charts, and line charts
- **System Monitoring**: Real-time system status and alerts
- **Expandable Widgets**: Click expand icons for detailed views

### Lane Monitoring
- **20 Logical Lanes**: Comprehensive lane management
- **Status Indicators**: Visual status for each lane (IF/OF)
- **Pattern Analysis**: Detect patterns with 16320-byte differences
- **Hex Stream Visualization**: Real-time hex data display

## Styling

All components use modern CSS with:
- **CSS Grid & Flexbox**: Responsive layouts
- **CSS Variables**: Consistent color schemes
- **Smooth Transitions**: Hover effects and animations
- **Mobile-First**: Responsive design for all screen sizes

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

### Running the Application

```bash
npm install
npm start
```

### Building for Production

```bash
npm run build
```

## Customization

### Adding New Routes

1. Add route to `Sidebar.jsx` navItems array
2. Add route to `App.jsx` Routes
3. Create corresponding component
4. Import and use in routing

### Modifying Sidebar

The sidebar component is fully customizable:
- Change navigation items in `navItems` array
- Modify styling in `Sidebar.css`
- Add additional features like user profile, settings, etc.

### Component Integration

All components are designed to work both:
- **With Sidebar**: As child components within the sidebar layout
- **Standalone**: As individual components in any React application

## Migration to Other Projects

To use these components in another React project:

1. Copy component files (.jsx and .css)
2. Install required dependencies (recharts, react-router-dom)
3. Update import paths if needed
4. Use components as shown in examples above

## License

This project is open source and available under the MIT License.
