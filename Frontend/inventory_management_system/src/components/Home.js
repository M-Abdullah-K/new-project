import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Home() {
  // Access the current theme from the context
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className="container-fluid p-5"
      style={{
        backgroundColor: theme.background, // Apply dynamic background color
        color: theme.text, // Apply dynamic text color
        minHeight: '100vh',
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1
          style={{
            fontSize: '2.8rem',
            color: theme.text, // Dynamic text color
            fontWeight: 'bold',
          }}
        >
          Welcome to the Undisputed Inventory Management System
        </h1>
        <p
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            color: theme.text, // Dynamic text color
            fontSize: '1.2rem',
            lineHeight: '1.6',
          }}
        >
          Our Inventory Management System offers advanced features to streamline your business, optimize inventory control, and enhance productivity. Track, manage, and optimize your inventory with ease.
        </p>
        <a
          href="/products"
          className="btn"
          style={{
            padding: '12px 24px',
            fontSize: '1.1rem',
            backgroundColor: theme.primary, // Apply dynamic primary color
            color: theme.text, // Dynamic text color
            border: 'none',
          }}
        >
          Explore Products
        </a>
      </div>

      {/* Key Features Section */}
      <div className="container my-5">
        <h2
          className="text-center"
          style={{
            color: theme.text, // Dynamic text color
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          Key Features
        </h2>
        <div className="row text-center mt-4">
          {[
            { title: 'Real-Time Tracking', description: 'Monitor inventory levels and movements in real time across multiple locations.' },
            { title: 'Analytics & Insights', description: 'Generate in-depth reports and insights to make data-driven decisions.' },
            { title: 'Secure Transactions', description: 'Utilizes blockchain for secure and immutable transaction records.' },
            { title: 'User-Friendly Interface', description: 'Intuitive interface making inventory management efficient and accessible.' },
          ].map((feature, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div
                className="card p-3 h-100"
                style={{
                  border: 'none',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  backgroundColor: theme === 'dark' ? '#343a40' : '#ffffff', // Dynamic background based on theme
                  color: theme.text, // Dynamic text color
                }}
              >
                <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: theme.primary }}>
                  {feature.title}
                </h3>
                <p style={{ color: theme.text, fontSize: '1rem' }}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div
        className="container my-5 py-5"
        style={{
          backgroundColor: theme === 'dark' ? '#495057' : '#e9ecef', // Dynamic background color based on theme
          borderRadius: '8px',
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            fontSize: '2rem',
            color: theme.text, // Dynamic text color
            fontWeight: 'bold',
          }}
        >
          What Our Users Say
        </h2>
        <div className="row text-center">
          {[
            { name: 'Moazam Rathore', feedback: 'An essential tool for our inventory needs. The real-time tracking feature has been a game-changer!' },
            { name: 'Syed Yahya Tariq', feedback: 'The analytics dashboard is very informative, helping us stay on top of inventory trends.' },
          ].map((testimonial, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div
                className="card p-4"
                style={{
                  border: 'none',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  backgroundColor: theme === 'dark' ? '#495057' : '#ffffff', // Dynamic background color
                  color: theme.text, // Dynamic text color
                }}
              >
                <p style={{ color: theme.text, fontSize: '1rem', fontStyle: 'italic' }}>"{testimonial.feedback}"</p>
                <p style={{ fontWeight: 'bold', color: theme.text }}>- {testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center my-5">
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: theme.text, // Dynamic text color
          }}
        >
          Ready to Transform Your Inventory Management?
        </h2>
        <p
          style={{
            color: theme.text, // Dynamic text color
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}
        >
          Sign up today to experience the power and ease of the Undisputed Inventory Management System. Start optimizing your inventory with our advanced tools and expert support.
        </p>
      </div>
    </div>
  );
}
