import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './LaneMonitor.css';

const LaneMonitor = () => {
    const [selectedLane, setSelectedLane] = useState(1);
    const [lanes, setLanes] = useState([
        { id: 1, status: 'IF', isActive: true, patternCount: 15, lastDetection: '2.3s ago' },
        { id: 2, status: 'IF', isActive: true, patternCount: 12, lastDetection: '1.8s ago' },
        { id: 3, status: 'OF', isActive: false, patternCount: 8, lastDetection: '15.2s ago' },
        { id: 4, status: 'IF', isActive: true, patternCount: 20, lastDetection: '0.5s ago' },
        { id: 5, status: 'IF', isActive: true, patternCount: 18, lastDetection: '1.2s ago' },
        { id: 6, status: 'OF', isActive: false, patternCount: 5, lastDetection: '22.7s ago' },
        { id: 7, status: 'IF', isActive: true, patternCount: 25, lastDetection: '0.8s ago' },
        { id: 8, status: 'IF', isActive: true, patternCount: 14, lastDetection: '3.1s ago' },
        { id: 9, status: 'OF', isActive: false, patternCount: 9, lastDetection: '18.4s ago' },
        { id: 10, status: 'IF', isActive: true, patternCount: 22, lastDetection: '0.3s ago' },
        { id: 11, status: 'IF', isActive: true, patternCount: 16, lastDetection: '2.9s ago' },
        { id: 12, status: 'IF', isActive: true, patternCount: 19, lastDetection: '1.5s ago' },
        { id: 13, status: 'OF', isActive: false, patternCount: 7, lastDetection: '25.1s ago' },
        { id: 14, status: 'IF', isActive: true, patternCount: 21, lastDetection: '0.7s ago' },
        { id: 15, status: 'IF', isActive: true, patternCount: 17, lastDetection: '2.1s ago' },
        { id: 16, status: 'IF', isActive: true, patternCount: 23, lastDetection: '0.9s ago' },
        { id: 17, status: 'OF', isActive: false, patternCount: 6, lastDetection: '19.8s ago' },
        { id: 18, status: 'IF', isActive: true, patternCount: 13, lastDetection: '4.2s ago' },
        { id: 19, status: 'IF', isActive: true, patternCount: 24, lastDetection: '0.6s ago' },
        { id: 20, status: 'IF', isActive: true, patternCount: 11, lastDetection: '3.7s ago' }
    ]);

    const [selectedLaneData, setSelectedLaneData] = useState([]);
    const [hexStream, setHexStream] = useState('');

    useEffect(() => {
        generateLaneData();
        generateHexStream();
    }, [selectedLane]);

    const generateLaneData = () => {
        // Generate pattern data for selected lane
        const data = [];
        let lastPatternIndex = -1;
        
        for (let i = 1; i <= 20; i++) {
            const bytesBetween = Math.random() > 0.7 ? 16320 : Math.floor(Math.random() * 20000) + 8000;
            const currentIndex = lastPatternIndex === -1 ? 0 : lastPatternIndex + bytesBetween * 2;
            
            data.push({
                pattern: i,
                bytesBetween: bytesBetween,
                index: currentIndex,
                isCorrect: Math.abs(bytesBetween - 16320) < 1
            });
            
            lastPatternIndex = currentIndex;
        }
        
        setSelectedLaneData(data);
    };

    const generateHexStream = () => {
        // Generate a hex stream with embedded patterns
        let stream = '';
        const hexChars = '0123456789abcdef';
        const pattern = 'f6f6f62828';
        
        for (let i = 0; i < 1000; i++) {
            if (Math.random() > 0.95) {
                stream += pattern;
                i += pattern.length - 1;
            } else {
                stream += hexChars[Math.floor(Math.random() * hexChars.length)];
            }
        }
        
        setHexStream(stream);
    };

    const highlightPatterns = (text) => {
        const pattern = 'f6f6f62828';
        const parts = text.split(pattern);
        return parts.map((part, index) => (
            <span key={index}>
                {part}
                {index < parts.length - 1 && (
                    <span className="pattern-highlight">{pattern}</span>
                )}
            </span>
        ));
    };

    const getLaneStatusClass = (status, isActive) => {
        if (status === 'IF' && isActive) return 'status-if-active';
        if (status === 'IF' && !isActive) return 'status-if-inactive';
        return 'status-of';
    };

    return (
        <div className="lane-monitor-container">
            <h1>Lane Monitoring System</h1>
            
            <div className="monitor-layout">
                {/* Left Section: Logical Lane Processes */}
                <div className="logical-lanes-section">
                    <h2>Logical Lane Processes</h2>
                    
                    <div className="overview-area">
                        <h3>Overview of Lanes States</h3>
                        <div className="lanes-summary">
                            <div className="summary-item">
                                <span className="summary-label">Total Lanes:</span>
                                <span className="summary-value">{lanes.length}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Active Lanes:</span>
                                <span className="summary-value">{lanes.filter(l => l.isActive).length}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Inactive Lanes:</span>
                                <span className="summary-value">{lanes.filter(l => !l.isActive).length}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Total Patterns:</span>
                                <span className="summary-value">{lanes.reduce((sum, lane) => sum + lane.patternCount, 0)}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Avg Patterns/Lane:</span>
                                <span className="summary-value">{Math.round(lanes.reduce((sum, lane) => sum + lane.patternCount, 0) / lanes.length)}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">System Status:</span>
                                <span className="summary-value status-good">Operational</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lanes-list">
                        {lanes.map((lane) => (
                            <div 
                                key={lane.id} 
                                className={`lane-item ${selectedLane === lane.id ? 'selected' : ''}`}
                                onClick={() => setSelectedLane(lane.id)}
                            >
                                <div className={`lane-status ${getLaneStatusClass(lane.status, lane.isActive)}`}>
                                    {lane.status}
                                </div>
                                <div className="lane-info">
                                    <span className="lane-name">Lane #{lane.id}</span>
                                    <span className="lane-patterns">{lane.patternCount} patterns</span>
                                    <span className="lane-last">{lane.lastDetection}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section: Lane #X */}
                <div className="lane-detail-section">
                    <h2>Lane #{selectedLane}</h2>
                    
                    <div className="lane-header">
                        <div className={`if-box ${lanes.find(l => l.id === selectedLane)?.isActive ? 'active' : 'inactive'}`}>
                            {lanes.find(l => l.id === selectedLane)?.status || 'IF'}
                        </div>
                        
                        <div className="chart-container">
                            <h4>Pattern Detection Analysis</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={selectedLaneData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                        dataKey="pattern" 
                                        label={{ value: 'total AMs: X', position: 'insideBottom', offset: -5 }}
                                    />
                                    <YAxis />
                                    <Tooltip 
                                        formatter={(value, name) => [value, 'Bytes']}
                                        labelFormatter={(label) => `Pattern ${label}`}
                                    />
                                    <Bar dataKey="bytesBetween">
                                        {selectedLaneData.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={entry.isCorrect ? '#78C841' : '#FF3F33'} 
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    <div className="hex-stream-display">
                        <h4>Hex Stream Data</h4>
                        <div className="stream-content">
                            {highlightPatterns(hexStream.substring(0, 300))}
                            {hexStream.length > 300 && <span className="truncated">...</span>}
                        </div>
                    </div>
                    
                    <div className="lane-stats">
                        <div className="stat-item">
                            <span className="stat-label">Patterns Detected:</span>
                            <span className="stat-value">{selectedLaneData.length}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Correct Intervals:</span>
                            <span className="stat-value">
                                {selectedLaneData.filter(d => d.isCorrect).length}
                            </span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Last Detection:</span>
                            <span className="stat-value">2.3s ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaneMonitor;
