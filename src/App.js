import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';
import MeView from './components/MeView';
import CertificationsView from './components/CertificationsView';
import GridView from './components/GridView';
import ListView from './components/ListView';
import SplashScreen from './components/SplashScreen';

// Handles dynamic theme toggling and scroll reveals on route changes
const ThemeManager = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '') {
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
    }
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Dynamic scroll reveal trigger
    const handleScrollReveal = () => {
      const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-line');
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 80; // Trigger when element is 80px into viewport

        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScrollReveal);
    // Trigger once on route load
    setTimeout(handleScrollReveal, 200);

    return () => {
      window.removeEventListener('scroll', handleScrollReveal);
    };
  }, [location]);

  return null;
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <ThemeManager />
      <div className="App">
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
        <Menu />
        <Routes>
          <Route path="/" element={<MeView />} />
          <Route path="/certifications" element={<CertificationsView />} />
          <Route path="/grid" element={<GridView />} />
          <Route path="/list" element={<ListView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
