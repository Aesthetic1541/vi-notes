import './App.css'

function App() {
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
        <div>
          <h3>Secure Login</h3>
          <p>JWT based authentication system</p>
        </div>

        <div>
          <h3>Note Storage</h3>
          <p>Store and manage notes using MongoDB</p>
        </div>

        <div>
          <h3>Analytics</h3>
          <p>Analyze writing patterns and keystrokes</p>
        </div>
      </div>
    </div>
  )
}

export default App