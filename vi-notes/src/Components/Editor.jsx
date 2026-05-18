import React, { useState,useRef } from 'react'
import '../App.css'
const Editor = (props) => {

    

    const lastKeyTime = useRef(null)

    // const [Keystroke, setKeystroke] = useState([])

    const handletype=()=>{
        const currenttime=Date.now()

        if(lastKeyTime.current!==null){
            const timediff=currenttime-lastKeyTime.current
            props.setstroke((e)=>[...e,timediff])
        }

        lastKeyTime.current=currenttime
    }

    const handlepaste=(e)=>{
        const pastedtext=e.clipboardData.getData("text")

        const pasteData={
            length:pastedtext.length,
            time:Date.now(),
        }

        props.setpaste((e)=>[...e,pasteData])
    }

  return (
    <div className='E-body'>
      <textarea 
        value={props.text}
        onChange={(e)=>props.settext(e.target.value)}
        onKeyDown={handletype}
        onPaste={handlepaste}
        placeholder='Start Typing...'
      />
    </div>
  )
}
export default Editor
