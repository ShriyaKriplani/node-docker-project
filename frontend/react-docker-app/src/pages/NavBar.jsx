import axios from 'axios';
import React, { useState } from 'react';

function NavBar() {
    const [isLoggedin,setisLoggedIn] = useState(false);
    const handleLogin = async()=>{
      const response = await axios.post("http://192.168.29.183/api/login",{emailId:'kriplanishriya@gmail.com',password:'shriya'},{
        headers:{
          "Content-Type":"application/json"
        }
      })
      setisLoggedIn(!isLoggedin)
    }
    const handleLogout = async()=>{
       const resposne = await axios.get("http://192.168.29.183/api/logout",{
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