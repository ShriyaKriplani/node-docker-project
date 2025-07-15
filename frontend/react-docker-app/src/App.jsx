import './tailwind.css';
import NavBar from './pages/NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {function1} from 'shriya_utils'

function App() {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [todo,setTodo]= useState([]);
  const [error,setError] = useState('');
  useEffect(()=>{
  fetchTodo();
  function1();
  },[])
   async function fetchTodo() {
try {
      const response = await axios.get("http://localhost:8001/api/getTodo",{
        headers:{
          "Content-Type":"application/json",
          "Authorization" : "Bearer "
        }
      })
      setTodo(response.data.message.todo)
    } catch (error) {
      setError("Error in fetching the data")
    }
  }
  const addTodo =async ()=>{
    try {
      const response = await axios.post("http://localhost:8001/api/createTodo",{title,description},{
        headers:{
          "Content-Type":"application/json",
          "Authorization" : "Bearer "
        }
      })
      setTitle('');
      setDescription('');
      setError('');
      fetchTodo(); // Refresh the list
    } catch (error) {
      setError("Error in fetching the data")
    }
  }
  return (
    <>
    <NavBar/>
    <br/>
    <input type='text' placeholder='Add a title' value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
    <input type='text' placeholder='Add a description' value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
    <button onClick={addTodo}>Add Todo</button>
    {
      todo.map(item=>{
        return(
          <div>
            <div>
              {item.title} {item.description}
            </div>
          </div>
        )
      })
    }
    {error}
    </>
  )
}

export default App
