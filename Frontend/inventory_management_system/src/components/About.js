import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function About() {
  const [images, setImages] = useState(Array(4).fill(null)); // Initialize with 4 empty slots
  const { theme } = useContext(ThemeContext); // Use theme from ThemeContext

  // Handle image upload
  const handleImageUpload = (event, index) => {
    const files = event.target.files;
    if (files.length > 0) {
      const uploadedImages = [...images];
      const reader = new FileReader();

      reader.onload = (e) => {
        uploadedImages[index] = e.target.result;
        setImages(uploadedImages);
      };

      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div
      className="container-fluid p-5"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: '100vh',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 style={{ fontSize: '2.8rem', fontWeight: 'bold', color: theme.text }}>
          About the Undisputed Inventory Management System
        </h1>
        <p
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            fontSize: '1.2rem',
            lineHeight: '1.6',
          }}
        >
          The Undisputed Inventory Management System is an advanced MERN CRUD application designed to streamline inventory management efficiently.
        </p>
      </div>

      {/* Mission and Benefits Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.text }}>
          Our Mission
        </h2>
        <p
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            fontSize: '1.1rem',
            lineHeight: '1.6',
          }}
        >
          We aim to empower businesses by providing an all-in-one solution for managing inventory with precision and ease. Our commitment is to ensure every business has the tools needed for efficient, accurate, and secure inventory tracking.
        </p>

        <div className="row text-center mt-5">
          {[
            { title: 'Real-Time Analytics', description: 'Get real-time insights to optimize inventory turnover and maintain adequate stock levels.' },
            { title: 'User-Friendly Interface', description: 'Easy-to-navigate dashboards and tools, designed for all user levels.' },
            { title: 'Enhanced Security', description: 'Blockchain-powered transactions ensure all data remains secure and immutable.' },
            { title: 'Customizable Alerts', description: 'Set up alerts for low stock, reorder levels, and inventory movement.' },
          ].map((benefit, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div
                className="card p-3 h-100"
                style={{
                  border: 'none',
                  backgroundColor: theme.secondary,
                  color: theme.text,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                }}
              >
                <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: theme.primary }}>{benefit.title}</h3>
                <p style={{ fontSize: '1rem' }}>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.text }}>
          Meet Our Team
        </h2>
        <div className="row text-center">
          {[
            { name: 'Mohadis Khan', title: 'CEO', intro: 'Visionary leader, driving innovation and growth.' },
            { name: 'Muhammad Abdullah', title: 'Finance Minister', intro: 'Expert in financial strategy and business planning.' },
            { name: 'Muhammad Usman', title: 'Human Resource Specialist', intro: 'Fostering a productive and inclusive work environment.' },
            { name: 'Abdullah Khan', title: 'Programmer', intro: 'Crafting code with precision and creativity.' },
          ].map((member, index) => (
            <div className="col-md-3 mb-4 d-flex flex-column align-items-center" key={index}>
              <div
                className="upload-slot d-flex align-items-center justify-content-center"
                style={{
                  border: `2px dashed ${theme.primary}`,
                  borderRadius: '50%',
                  width: '180px',
                  height: '180px',
                  overflow: 'hidden',
                  backgroundColor: theme.secondary,
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                  onChange={(event) => handleImageUpload(event, index)}
                />
                {images[index] ? (
                  <img src={images[index]} alt={`Uploaded ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '1rem', color: theme.text }}>Click to upload</span>
                )}
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: theme.primary, marginTop: '1rem' }}>{member.name}</h3>
              <p style={{ fontSize: '1.1rem' }}>{member.title}</p>
              <p style={{ fontSize: '1rem', color: theme.text }}>{member.intro}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
