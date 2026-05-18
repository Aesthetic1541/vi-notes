import React ,{useState} from 'react'

const Register=()=>{

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister=async()=>{
        const res = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        alert(data.message);
    }

    return(
        <div className='register'>
            {/* <h2>Register</h2> */}
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default Register