import React from 'react'
import { Link } from 'react-router-dom'
import MiniHeader from './MiniHeader'

const Notifications = () => {
  return (
    <div>
    <MiniHeader head='Notifications'/>
   
    <p><Link to='#'>Therapy  </Link><Link to='#'>  Challenges</Link></p>
    
    </div>
  )
}

export default Notifications