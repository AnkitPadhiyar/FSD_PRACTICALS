import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [customIncrement, setCustomIncrement] = useState(1);
  const [history, setHistory] = useState([]);

  const addToHistory = (action, value) => {
    const timestamp = new Date().toLocaleTimeString();
    setHistory(prev => [{action, value, timestamp}, ...prev.slice(0, 4)]);
  };

  const handleIncrement = () => {
    setCount(count + 1);
    addToHistory("Increment", 1);
  };
  
  const handleDecrement = () => {
    setCount(count - 1);
    addToHistory("Decrement", -1);
  };
  
  const handleReset = () => {
    setCount(0);
    addToHistory("Reset", 0);
  };
  
  const handleCustomIncrement = () => {
    setCount(count + customIncrement);
    addToHistory("Custom Increment", customIncrement);
  };

  // Dynamic greeting based on time and name
  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = firstName || lastName || "User";
    
    if (hour < 12) return `Good morning, ${name}!`;
    if (hour < 17) return `Good afternoon, ${name}!`;
    return `Good evening, ${name}!`;
  };

  // Dynamic theme based on count
  const getThemeClass = () => {
    if (count < 0) return "theme-negative";
    if (count > 10) return "theme-high";
    if (count > 5) return "theme-medium";
    return "theme-default";
  };

  return (
    <div className={`container ${getThemeClass()}`}>
      <div className="counter-box">
        <h1 className={`count-title ${count !== 0 ? 'count-animate' : ''}`}>Count: {count}</h1>
        <div className="button-row">
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleIncrement}>+1</button>
          <button onClick={handleDecrement}>-1</button>
          <button onClick={() => setCount(count + 5)}>+5</button>
        </div>
        
        <h2 className="welcome">{getGreeting()}</h2>
        <p className="charusat-text">Welcome to CHARUSAT!!!</p>
        <form className="name-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-row">
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="input-row">
            <label htmlFor="lastName">Last Name:</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="off"
            />
          </div>
        </form>
        <div className="output-row">
          <div>
            First Name: <span className="output-value">{firstName}</span>
          </div>
          <div>
            Last Name: <span className="output-value">{lastName}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
