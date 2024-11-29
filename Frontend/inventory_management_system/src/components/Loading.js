import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './Loading.css';

const Loading = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className="loading-container"
            style={{ backgroundColor: theme.background, color: theme.text }}
        >
            {/* Truck Animation */}
            <div className="truck-container">
                <div className="truck">
                    <div className="cab" style={{ backgroundColor: theme.primary }}>
                        <div className="cab-window"></div>
                    </div>
                    <div className="trailer" style={{ backgroundColor: theme.cardBackground }}></div>
                    <div className="wheel"></div>
                    <div className="wheel"></div>
                </div>

                {/* Smoke Emission */}
                <div className="smoke-container">
                    <div className="smoke"></div>
                    <div className="smoke"></div>
                    <div className="smoke"></div>
                </div>
            </div>

            {/* Loading Text */}
            <h1 className="loading-text" style={{ color: theme.text }}>
                UIMS
            </h1>
        </div>
    );
};

export default Loading;
