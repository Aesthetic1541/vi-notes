import React ,{useState} from "react";
import '../App.css'

const Login=({ setToken })=>{

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const handlelogin=async()=>{
        const res=await fetch('http://localhost:5000/api/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email:Email,
                password:Password,
            })
        })

        const data=await res.json()

        if (data.token) {
        localStorage.setItem("token", data.token)
        setToken(data.token)
        }else{
            alert(data.message)
        }
    }

    return(
        <div className="login">
            <input placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder="Enter Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handlelogin} >Login</button>
        </div>
    )
}

export default Login