import axios from 'axios';
import React, { useState } from 'react';

function NavBar() {
    const [isLoggedin,setisLoggedIn] = useState(false);
    const handleLogin = async()=>{
      const response = await axios.post("http://localhost:8001/api/login",{emailId:'kriplanishriya@gmail.com',password:'shriya'},{
        headers:{
          "Content-Type":"application/json"
        }
      })
      console.log(response)
      setisLoggedIn(!isLoggedin)
    }
    const handleLogout = async()=>{
       const resposne = await axios.get("http://localhost:8001/api/logout",{
        headers:{
          "Content-Type":"application/json"
        }
      })
      setisLoggedIn(!isLoggedin)
    }
  return (
    <div>
      <div>
        <h1>Navbar</h1>
        <div>
          {!isLoggedin ? 
          <button onClick={handleLogin}>Login</button> :
          <button onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </div>
  );
}

export default NavBar;