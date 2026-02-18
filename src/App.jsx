import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [task,setTask] = useState(()=>{
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [date,setDate] = useState('');
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(task));
  }, [task]);

  function handleclick(e){
    e.preventDefault();
    if(!input){
      alert('enter some value')
      return ;
    }

    setTask((prevTask)=>[...prevTask,input])
    setInput('')
  }

  function handledelete(value){
    console.log(value);
    let newtask = task.filter((val)=> val !== value )
    setTask(newtask);
  }

  const time = Date.now();
  const curr = new Date(time).toLocaleDateString();

  
  useEffect(()=>{
    const interval = setInterval(()=>{
    const curr = new Date().toLocaleTimeString();
    setDate(curr)
  },1000)

  return () => clearInterval(interval);
  },[])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-body");
    } else {
      document.body.classList.remove("dark-body");
    }
  }, [darkMode]);

  return (
    
      <div className={`container ${darkMode ? "dark" : ""}`} >
        <button 
          className="theme-toggle"
          onClick={() => setDarkMode(prev => !prev)}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
          
        </button>

        <h2>
        {`${curr} - ${date}`}
      </h2>

      <div>
      <input
        type="text"
        value={input}
        placeholder="Enter todo here.."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleclick(e);
          }
        }}
      />


        <button type="submit" onClick={handleclick} >add</button>
        <button type="submit" onClick={()=>setTask([])} >clear</button>
      </div>
      
      <ul>
      {
        task.map((value,index)=>{
            return(
              <li key={index} >
              <span>{value}</span>
              <button onClick={()=>handledelete(value)} >delete</button> 
              </li>
            )
        })
      }
      </ul>
      </div>

    
  )
}

export default App
