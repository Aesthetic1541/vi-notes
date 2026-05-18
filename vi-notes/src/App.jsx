import { useState,useEffect } from 'react'
import Editor from './Components/Editor'
import Analitics from './Components/Analitics'
import Login from './Components/Login'
import Register from './Components/Register'
import './App.css'

function App() {
  const [text, settext] = useState("")
  const [Keystroke, setKeystroke] = useState([])
  const [paste, setpaste] = useState([])
  const [token, setToken] = useState(null)
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  return (
    <>      
      {token && <h1 className='font-size'>VI-Notes</h1>}
      {!token ?(
        showRegister?(
          <div className='flex'>
            <h1>VI-Notes</h1>
            <Register />
            <button className='app' onClick={() => setShowRegister(false)}>Go to Login</button>
          </div>
        ):(
          <div className='flex'>
          <h1>VI-Notes</h1>
            <Login setToken={setToken} />
            <button className='app' onClick={() => setShowRegister(true)}>Create Account</button>
          </div>
        )
      ):( 
        <div className='body'>
          <Editor text={text} settext={settext} setstroke={setKeystroke} setpaste={setpaste}/>
          <Analitics settext={settext} setstroke={setKeystroke} setpaste={setpaste} text={text} klength={Keystroke.length} plength={paste.length}/>
        </div>
      )}
      
    </>
  )
}
export default App
