import React, { useState,useEffect } from 'react'

import { Link } from 'react-router-dom'
import "./Sidebar.css"
const Sidebar = () => {
const [user,setUser]=useState(null)
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user_details")))
    
  }, [])
  console.log(user)
  return (
    <div className='sidenav'>
      {user &&<div className='side-bar-user-icon'>
      <img src={`https://kate.nvinfobase.com/storage/${user.image}`}/>
      <p>Hey! , <span>{user.name}</span></p>
      </div>}
    <Link to="/therapy-notes" className="nav-item nav-link px-3">Therapy Notes<img src='/images/icons/Vector.svg'/></Link>
    <Link to="/goals" className="nav-item nav-link px-3">Goal<img src='/images/icons/Vector.svg'/></Link>
    <Link to="/profile" className="nav-item nav-link px-3">Profile<img src='/images/icons/Vector.svg'/></Link>
    <Link to="/Calendar" className="nav-item nav-link px-3">Calendar<img src='/images/icons/Vector.svg'/></Link>
   <Link to="/symptom-tracking" className="nav-item nav-link px-3">Symptom-tracking<img src='/images/icons/Vector.svg'/></Link>
 
   <Link to="/notes" className="nav-item nav-link px-3">Notes<img src='/images/icons/Vector.svg'/></Link>
    <Link to="/notification" className="nav-item nav-link px-3">Notification<img src='/images/icons/Vector.svg'/></Link>
    <Link to="/homework" className="nav-item nav-link px-3">Homework<img src='/images/icons/Vector.svg'/></Link>
    <Link to="/tracking" className="nav-item nav-link px-3">Tracking<img src='/images/icons/Vector.svg'/></Link>
    </div>
  )
}

export default Sidebar