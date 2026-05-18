import React from 'react'
import '../App.css'
const Analitics = (props) => {

    const handlesave=async()=>{
        const payload={
            context:props.text,
            keystrokes:props.klength,
            paste:props.plength,
            createdAt:new Date(),
        }

        try{
            const token = localStorage.getItem("token");
            const res =await fetch("http://localhost:5000/api/save-note",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`,
                },
                body:JSON.stringify(payload),
            })

            const data=await res.json()
            console.log("Saved:",data)

            alert("Note saved Successfully")
        }catch(error){
            console.log("Error in saving notes:",error)
        }
    }

    const handlereset=()=>{
        props.settext("")
        props.setstroke([])
        props.setpaste([])
    }

  return (
    <div className='A-body'>
        <div>
            <h1>Analysis</h1>
        </div>
        <div className='feature'>
            <div><b>Keystrokes:</b> {props.klength}</div>
            <div><b>Paste:</b> {props.plength}</div>
            <div><button className='s-button' onClick={handlesave}>Save Note</button></div>
            <div><button className='r-button' onClick={handlereset}>Reset</button></div>
            <button className='l-button' onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
                }}>Logout</button>
        </div>
    </div>
  )
}

export default Analitics
