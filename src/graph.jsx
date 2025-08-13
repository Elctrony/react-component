import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import './graph.css';

const HexStreamGraph = () => {
    const [hexStream, setHexStream] = useState('');
    const [patternData, setPatternData] = useState([]);
    const [currentState, setCurrentState] = useState('Out of Frame');
    const [patternCount, setPatternCount] = useState(0);

    // Generate dummy data for visualization
    useEffect(() => {
        generateDummyData();
    }, []);

    const generateDummyData = () => {
        // Generate a long hex string with some patterns
        let dummyHex = '';
        const hexChars = '0123456789abcdef';

        // Generate random hex string with embedded patterns
        for (let i = 1; i <= 20*16320; i++) {
            if (Math.floor(Math.random() * 16320*2) % (16320) === 0 && i > 0) {
                // Insert pattern every 50 characters
                dummyHex += 'f6f6f62828';
                i += 10; // Skip ahead since we added 12 characters
            } else {
                dummyHex += hexChars[Math.floor(Math.random() * hexChars.length)];
            }
        }

        setHexStream(dummyHex);
        processHexStream(dummyHex);
    };

    const processHexStream = (stream) => {
        const pattern = 'f6f6f62828';
        const patternLength = pattern.length;
        const allPatterns = [];
        let lastPatternIndex = -1;

        // First, collect all pattern positions
        for (let i = 0; i <= stream.length - patternLength; i++) {
            const segment = stream.substring(i, i + patternLength);
            if (segment === pattern) {
                allPatterns.push({
                    index: i,
                    timestamp: new Date(Date.now() + i * 100).toLocaleTimeString()
                });
                lastPatternIndex = i;
            }
        }

        // Filter patterns that have difference of 16320 from previous
        const filteredData = [];
        for (let i = 1; i < allPatterns.length; i++) {
            const currentPos = allPatterns[i].index;
            const previousPos = allPatterns[i-1].index;
            const bytesBetween = (currentPos - previousPos) / 2; // Divide by 2 since 2 hex chars = 1 byte
            
            if (Math.abs(bytesBetween - 16320) < 1) { // Allow small tolerance for floating point
                filteredData.push({
                    pattern: i,
                    bytesBetween: Math.round(bytesBetween),
                    index: currentPos,
                    timestamp: allPatterns[i].timestamp,
                    isCorrect: true
                });
            } else {
                filteredData.push({
                    pattern: i,
                    bytesBetween: Math.round(bytesBetween),
                    index: currentPos,
                    timestamp: allPatterns[i].timestamp,
                    isCorrect: false
                });
            }
        }

        setPatternData(filteredData);
        setPatternCount(filteredData.length);

        // Simulate state changes based on pattern frequency
        if (filteredData.length > 0) {
            const lastPattern = filteredData[filteredData.length - 1];
            const timeSinceLastPattern = Date.now() - (lastPattern.index * 100);

            if (timeSinceLastPattern < 5000) { // Within 5 seconds
                setCurrentState('In Frame');
            } else {
                setCurrentState('Out of Frame');
            }
        }
    };

    const handleHexInput = (event) => {
        const input = event.target.value.replace(/[^0-9a-fA-F]/g, '').toLowerCase();
        setHexStream(input);
        processHexStream(input);
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

    return (
        <div className="hex-stream-container">
            <h1>Hexadecimal Stream Pattern Detector</h1>

            {/* State Widget */}
            <div className="state-widget">
                <h2>Stream State</h2>
                <div className={`state-indicator ${currentState === 'In Frame' ? 'in-frame' : 'out-frame'}`}>
                    <div className="state-dot"></div>
                    <span className="state-text">{currentState}</span>
                </div>
                <div className="state-stats">
                    <p>Patterns Detected: <strong>{patternCount}</strong></p>
                    <p>Last Detection: {patternData.length > 0 ? patternData[patternData.length - 1]?.timestamp : 'None'}</p>
                </div>
            </div>

            {/* Hex Input */}
            <div className="hex-input-section">
                <h3>Hexadecimal Stream Input</h3>
                <textarea
                    value={hexStream}
                    onChange={handleHexInput}
                    placeholder="Enter or paste hexadecimal string here..."
                    className="hex-textarea"
                    rows={4}
                />
                <button onClick={generateDummyData} className="generate-btn">
                    Generate Dummy Data
                </button>
            </div>

            {/* Pattern Visualization */}
            <div className="pattern-visualization">
                <h3>Pattern Detection Visualization</h3>
                <div className="hex-display">
                    <div className="hex-content">
                        {highlightPatterns(hexStream.substring(0, 200))}
                        {hexStream.length > 200 && <span className="truncated">...</span>}
                    </div>
                </div>
            </div>

            {/* Graph Section */}
            <div className="graph-section">
                <h3>Pattern Detection Analysis</h3>

                {/* Bytes Between Patterns Chart */}
                <div className="chart-container">
                    <h4>Patterns with 16320 Byte Differences</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={patternData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="pattern"
                                label={{ value: 'Pattern Detection Number', position: 'insideBottom', offset: -5 }}
                            />
                            <YAxis
                                label={{ value: 'Bytes Between Patterns', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip
                                formatter={(value, name) => [value, 'Bytes']}
                                labelFormatter={(label) => `Pattern ${label}`}
                            />
                            <Bar dataKey="bytesBetween">
                                {patternData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={entry.isCorrect ? '#78C841' : '#FF3F33'} 
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="chart-description">
                        Green bars: Patterns with exactly 16320 bytes difference from previous pattern<br/>
                        Red bars: Patterns with different byte differences
                    </p>
                </div>

                {/* Pattern Timeline Chart */}
                <div className="chart-container">
                    <h4>Pattern Detection Timeline</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={patternData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="pattern"
                                label={{ value: 'Pattern Detection Number', position: 'insideBottom', offset: -5 }}
                            />
                            <YAxis
                                label={{ value: 'Position in Stream', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip
                                formatter={(value, name) => [value, 'Position']}
                                labelFormatter={(label) => `Pattern ${label}`}
                            />
                            <Line type="monotone" dataKey="index" stroke="#82ca9d" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Pattern Data Table */}
                <div className="data-table">
                    <h4>Pattern Detection Details</h4>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Pattern #</th>
                                    <th>Position</th>
                                    <th>Bytes Between</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patternData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.pattern}</td>
                                        <td>{item.index}</td>
                                        <td>{item.bytesBetween}</td>
                                        <td>{item.timestamp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HexStreamGraph;
