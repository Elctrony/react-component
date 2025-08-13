import { useState } from 'react'
import HexStreamGraph from './graph'
import LaneMonitor from './LaneMonitor'
import Dashboard from './Dashboard'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard', 'lanes', or 'graph'

  return (
    <div className="App">
      
      {activeView === 'dashboard' ? <Dashboard /> : 
       activeView === 'lanes' ? <LaneMonitor /> : <HexStreamGraph />}
    </div>
  )
}

export default App
