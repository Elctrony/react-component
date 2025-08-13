import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import LaneMonitor from './LaneMonitor';
import './Dashboard.css';

const Dashboard = () => {
    const [activeView, setActiveView] = useState('dashboard');
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    // Mock data for dashboard widgets
    const systemStats = [
        { name: 'Active Lanes', value: 15, color: '#28a745' },
        { name: 'Inactive Lanes', value: 5, color: '#dc3545' }
    ];

    const patternData = [
        { pattern: 1, count: 25, status: 'normal' },
        { pattern: 2, count: 18, status: 'warning' },
        { pattern: 3, count: 32, status: 'normal' },
        { pattern: 4, count: 15, status: 'error' },
        { pattern: 5, count: 28, status: 'normal' }
    ];

    const performanceData = [
        { time: '00:00', efficiency: 95 },
        { time: '00:05', efficiency: 92 },
        { time: '00:10', efficiency: 88 },
        { time: '00:15', efficiency: 94 },
        { time: '00:20', efficiency: 96 }
    ];

    const handleRecordingToggle = () => {
        if (isRecording) {
            setIsRecording(false);
            setRecordingTime(0);
        } else {
            setIsRecording(true);
            // Start timer
            const interval = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const renderDashboardContent = () => (
        <div className="dashboard-content">
            <div className="dashboard-header">
                <h1>DASHBOARD</h1>
                <div className="recording-controls">
                    <div className="recording-timer">
                        <div className="timer-display">{formatTime(recordingTime)}</div>
                    </div>
                    <button 
                        className={`recording-btn ${isRecording ? 'stop' : 'start'}`}
                        onClick={handleRecordingToggle}
                    >
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                </div>
            </div>

            <div className="dashboard-widgets">
                {/* Top Row */}
                <div className="widget-row top-row">
                    <div className="widget system-status-widget">
                        <div className="widget-header">
                            <h3>System Status</h3>
                            <div className="expand-icon">⤢</div>
                        </div>
                        <div className="widget-content">
                            <ResponsiveContainer width="100%" height={150}>
                                <PieChart>
                                    <Pie
                                        data={systemStats}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={60}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {systemStats.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="status-summary">
                                <div className="status-item">
                                    <span className="status-dot active"></span>
                                    <span>15 Active Lanes</span>
                                </div>
                                <div className="status-item">
                                    <span className="status-dot inactive"></span>
                                    <span>5 Inactive Lanes</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="widget pattern-analysis-widget">
                        <div className="widget-header">
                            <h3>Pattern Analysis</h3>
                            <div className="expand-icon">⤢</div>
                        </div>
                        <div className="widget-content">
                            <ResponsiveContainer width="100%" height={150}>
                                <BarChart data={patternData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="pattern" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count">
                                        {patternData.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={entry.status === 'normal' ? '#28a745' : 
                                                      entry.status === 'warning' ? '#ffc107' : '#dc3545'} 
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="widget-row bottom-row">
                    <div className="widget performance-widget">
                        <div className="widget-header">
                            <h3>Performance Metrics</h3>
                        </div>
                        <div className="widget-content">
                            <ResponsiveContainer width="100%" height={150}>
                                <LineChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis domain={[80, 100]} />
                                    <Tooltip />
                                    <Line 
                                        type="monotone" 
                                        dataKey="efficiency" 
                                        stroke="#007bff" 
                                        strokeWidth={2}
                                        dot={{ fill: '#007bff', strokeWidth: 2, r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="performance-summary">
                                <div className="metric">
                                    <span className="metric-label">Current Efficiency:</span>
                                    <span className="metric-value">96%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="widget alerts-widget">
                        <div className="widget-header">
                            <h3>System Alerts</h3>
                        </div>
                        <div className="widget-content">
                            <div className="alerts-list">
                                <div className="alert-item info">
                                    <span className="alert-icon">ℹ</span>
                                    <span>System operating normally</span>
                                </div>
                                <div className="alert-item warning">
                                    <span className="alert-icon">⚠</span>
                                    <span>Lane #3 pattern count low</span>
                                </div>
                                <div className="alert-item success">
                                    <span className="alert-icon">✓</span>
                                    <span>All critical lanes active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderLogicalLanesContent = () => (
        <div className="content-area">
            <h2>Logical Lanes</h2>
            <LaneMonitor />
        </div>
    );

    const renderFrameAlignmentContent = () => (
        <div className="content-area">
            <h2>Frame Alignment</h2>
            <p>Frame alignment analysis and configuration.</p>
        </div>
    );

    const renderMultiframeContent = () => (
        <div className="content-area">
            <h2>Multiframe</h2>
            <p>Multiframe processing and analysis tools.</p>
        </div>
    );

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return renderDashboardContent();
            case 'logical-lanes':
                return renderLogicalLanesContent();
            case 'frame-alignment':
                return renderFrameAlignmentContent();
            case 'multiframe':
                return renderMultiframeContent();
            default:
                return renderDashboardContent();
        }
    };

    return (
        <div className="dashboard-container">
            {/* Left Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>OTN DUT ANALYZER</h2>
                </div>
                <nav className="sidebar-nav">
                    <button 
                        className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveView('dashboard')}
                    >
                        Dashboard
                    </button>
                    <button 
                        className={`nav-item ${activeView === 'logical-lanes' ? 'active' : ''}`}
                        onClick={() => setActiveView('logical-lanes')}
                    >
                        Logical Lanes
                    </button>
                    <button 
                        className={`nav-item ${activeView === 'frame-alignment' ? 'active' : ''}`}
                        onClick={() => setActiveView('frame-alignment')}
                    >
                        Frame Alignment
                    </button>
                    <button 
                        className={`nav-item ${activeView === 'multiframe' ? 'active' : ''}`}
                        onClick={() => setActiveView('multiframe')}
                    >
                        Multiframe
                    </button>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
