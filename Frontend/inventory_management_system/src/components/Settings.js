import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Settings = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  const themesList = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
    { name: 'Windows 11', value: 'windows11' },
    { name: 'Muted Blue', value: 'mutedBlue' },
    { name: 'Neon', value: 'neon' },
    { name: 'Solarized', value: 'solarized' },
    { name: 'Frosted Glass', value: 'frostedGlass' },
    { name: 'Sunset', value: 'sunset' },
    { name: 'Forest', value: 'forest' },
    { name: 'Ocean', value: 'ocean' },
  ];

  return (
    <div
      className="settings-page"
      style={{
        background: theme.background,
        color: theme.text,
        minHeight: '100vh',
        padding: '20px',
        transition: theme.transition,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem', fontWeight: 'bold' }}>
        Settings
      </h1>
      <p
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '1.2rem',
          fontStyle: 'italic',
        }}
      >
        Select your preferred theme:
      </p>
      <div
        className="theme-options"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {themesList.map((themeOption) => (
          <button
            key={themeOption.value}
            onClick={() => changeTheme(themeOption.value)}
            style={{
              backgroundColor: theme.primary,
              color: theme.text,
              border: 'none',
              borderRadius: '15px',
              padding: '14px 28px',
              cursor: 'pointer',
              fontSize: '1rem',
              boxShadow: theme.boxShadow,
              fontWeight: 'bold',
              transition: theme.transition,
              textTransform: 'uppercase',
              marginBottom: '20px',
              boxSizing: 'border-box',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = theme.text;
              e.target.style.color = theme.primary;
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = theme.primary;
              e.target.style.color = theme.text;
              e.target.style.transform = 'scale(1)';
            }}
          >
            {themeOption.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Settings;
