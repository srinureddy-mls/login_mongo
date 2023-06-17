import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [auth,setAuth]=useState(false)
  const [name,setName]=useState('')
  const [message,setMessage] =useState('')
// axios.defaults.withCredentials=false;
  useEffect(()=>{
    axios.get('http://localhost:3001/main')
    .then(res=>{
      if(res.data.Status ==="success"){
        setAuth(true);
        setName(res.data.name);
      }else{
        setAuth(false);
        setMessage(res.data.Message)
      }
    })
  },[])

  const handleLogout=()=>{
    axios.get('http://localhost:3001/logout')
    .then(res =>{
      if(res.data.Status ==="success"){
       return ("hello")
      }else {
        alert("error");
      }
      
    }).catch(err=>console.log(err))
  }

  return (
    <div className='container mt-4'>
     {
      auth ?
      <div>
        <h3 className='text-center'>Welcome <br/>  {name}</h3>
        <div className="d-flex justify-content-md-between">
        <Link to ="/ex" className='btn btn-primary' >View_Products</Link>
        <Link to="/" className='btn btn-danger' onClick={handleLogout}>Logout</Link>
       
        </div>
       
      </div>
      :
      <div>
        <h3>please be  login with login credentials </h3>
        <h3>Login Now</h3>
        <Link to='/' className='btn btn-primary'>Login</Link>
        </div>
     } 
    </div>
  )
}

export default Home
