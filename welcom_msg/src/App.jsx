import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return (
    <div className="app-container">
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div className="welcome-card">
        <h1 className="welcome-title">Welcome to CHARUSAT!!!!</h1>
        <div className="date-time-container">
          <div className="date-display">📅 {formattedDate}</div>
          <div className="time-display pulse">🕐 {formattedTime}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
