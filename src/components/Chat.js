import React, { useState } from "react";




function Chat() {
const [prompt, setPrompt] = useState('');
const [answer, setAnswer] = useState('');


const generateAnswer = async() => {
    try {
       const response = await fetch(`http://localhost:8080/ask-ai?prompt=${prompt}`);

    const data = response.json();
    setAnswer(data); 
    } catch (error) {
        console.log("Error:",error)
    }
    
}
    return(
        <div>
            <h2>Talk to AI</h2>
            <input 
              type="text"
              value={prompt}
              onChange={(e)=>{setPrompt(e.target.value)}}
              placeholder="Enter prompt for your answer"
              />
              <button onClick={generateAnswer}>Generate Answer</button>
              <div>
                <p>{answer}</p>
              </div>
        </div>
        
        
    );
}

export default Chat