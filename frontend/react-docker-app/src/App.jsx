import './tailwind.css';
import NavBar from './pages/NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [todo,setTodo]= useState([]);
  const [error,setError] = useState('');
  useEffect(()=>{
  fetchTodo();
  },[])
   async function fetchTodo() {
try {
      const response = await axios.get("http://192.168.29.183/api/getTodo",{
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
      const response = await axios.post("http://192.168.29.183/api/createTodo",{title,description},{
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
