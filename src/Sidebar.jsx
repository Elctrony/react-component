import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Dashboard', view: 'dashboard' },
        { path: '/logical-lanes', label: 'Logical Lanes', view: 'logical-lanes' },
        { path: '/frame-alignment', label: 'Frame Alignment', view: 'frame-alignment' },
        { path: '/multiframe', label: 'Multiframe', view: 'multiframe' }
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="sidebar-layout">
            {/* Left Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>OTN DUT ANALYZER</h2>
                </div>
                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <button 
                            key={item.path}
                            className={`nav-item ${isActiveRoute(item.path) ? 'active' : ''}`}
                            onClick={() => handleNavigation(item.path)}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="main-content">
                {children}
            </div>
        </div>
    );
};

export default Sidebar;
