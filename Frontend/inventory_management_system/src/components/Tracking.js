import React, { useEffect, useRef, useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const statusList = ["Processing", "Out for Delivery", "Delivered"];

export default function Tracking() {
  const { theme } = useContext(ThemeContext); // Access the theme context
  const mapRef = useRef(null);
  const [status, setStatus] = useState("Processing");
  const statusIndex = useRef(0);
  const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to New York

  // Cycle through statuses every 3 seconds
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatus(statusList[statusIndex.current]);
      statusIndex.current = (statusIndex.current + 1) % statusList.length;
    }, 3000);

    return () => clearInterval(statusInterval);
  }, []);

  // Initialize map and place marker
  useEffect(() => {
    const initMap = () => {
      if (window.google && window.google.maps) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 12,
        });

        new window.google.maps.Marker({
          position: userLocation,
          map,
          title: 'Current Location',
        });
      }
    };

    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB4ZPmMI9s-6SHGloU5tTYScH7QhHTOzA8`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);

      script.onerror = () => {
        console.error("Google Maps script failed to load.");
      };
    } else {
      initMap();
    }
  }, [mapRef, userLocation]);

  // Get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ backgroundColor: theme.background, color: theme.text, minHeight: '100vh', padding: '20px', transition: theme.transition }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Tracking Page</h1>

      {/* Tracking Number Section */}
      <div
        style={{
          width: '80%',
          margin: '0 auto 20px auto',
          padding: '15px',
          borderRadius: theme.borderRadius,
          backgroundColor: theme.cardBackground,
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          color: theme.primary,
          boxShadow: theme.boxShadow,
          transition: theme.transition,
        }}
      >
        <span style={{ color: theme.textSecondary }}>Tracking Number:</span> <span>123456789</span>
      </div>

      {/* Map Section */}
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '400px',
          marginBottom: '20px',
          borderRadius: theme.borderRadius,
          overflow: 'hidden',
          boxShadow: theme.boxShadow,
          transition: theme.transition,
        }}
      ></div>

      {/* Dynamic Status Bar */}
      <div
        style={{
          width: '80%',
          margin: '0 auto',
          padding: '10px',
          borderRadius: theme.borderRadius,
          backgroundColor: theme.cardBackground,
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
          color: theme.textSecondary,
          boxShadow: theme.boxShadow,
          transition: theme.transition,
        }}
      >
        <div
          style={{
            backgroundColor: theme.primary,
            borderRadius: theme.borderRadius,
            width: `${(statusList.indexOf(status) + 1) * (100 / statusList.length)}%`,
            height: '30px',
            transition: 'width 0.5s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.text,
          }}
        >
          {status}
        </div>
      </div>
    </div>
  );
}
