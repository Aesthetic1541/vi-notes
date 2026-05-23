import { useState } from "react";
import "./App.css";

function App() {

  const [message, setMessage] = useState("");

  return (
    <div className="container">

      <h1>VI Notes</h1>

      <h2>Authenticity Verification Platform</h2>

      <p>
        VI Notes is a secure note management platform designed
        to distinguish human-written content using typing behavior
        and writing characteristics.
      </p>

      <div className="features">

        <div
          className="card"
          onClick={() => setMessage("Secure authentication using JWT")}
        >
          <h3>Secure Login</h3>
          <p>JWT based authentication system</p>
        </div>

        <div
          className="card"
          onClick={() => setMessage("MongoDB stores user notes securely")}
        >
          <h3>Note Storage</h3>
          <p>Store and manage notes using MongoDB</p>
        </div>

        <div
          className="card"
          onClick={() => setMessage("Analyze writing patterns and keystrokes")}
        >
          <h3>Analytics</h3>
          <p>Analyze writing patterns and keystrokes</p>
        </div>

      </div>

      <button
        className="btn"
        onClick={() => alert("Welcome to VI Notes")}
      >
        Get Started
      </button>

      <h3>{message}</h3>

    </div>
  );
}

export default App;