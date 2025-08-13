import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import LaneMonitor from './LaneMonitor';
import HexStreamGraph from './graph';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/logical-lanes" element={<LaneMonitor />} />
            <Route path="/frame-alignment" element={<FrameAlignment />} />
            <Route path="/multiframe" element={<Multiframe />} />
            <Route path="/hex-graph" element={<HexStreamGraph />} />
          </Routes>
        </Sidebar>
      </div>
    </Router>
  );
}

// Placeholder components for other routes
const FrameAlignment = () => (
  <div className="content-area">
    <h2>Frame Alignment</h2>
    <p>Frame alignment analysis and configuration tools.</p>
  </div>
);

const Multiframe = () => (
  <div className="content-area">
    <h2>Multiframe</h2>
    <p>Multiframe processing and analysis tools.</p>
  </div>
);

export default App;
