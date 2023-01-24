import React, { useState, useLayoutEffect,useRef} from "react";
import { Link } from 'react-router-dom'
import MiniHeader from './MiniHeader'
import "./Calender.css"
import { Button } from 'react-bootstrap'
import axios from "axios";

const NotesDisp = () => {
  const[notes,setNotes]=useState()
  const token =JSON.parse(localStorage.getItem('token'));
  const url=process.env.REACT_APP_API_KEY
let config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}

  useLayoutEffect(() => {
    (async () => {
      try {
        const response = await 
          axios.get(`${url}/note`,config)
console.log(response.data.data)
        setNotes(
       response.data.data
        
          );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);



    
  return (
    <div>
    
    <div className='search-filter'>
    <input/>
    <div className='short'>
    Short:<Button><img src='/images/short.svg'/></Button></div>
    </div>
  <div className='addnotes-wrapper'>
  <Link to='/therapy-notes'> <div className='addnote-child addone-value'>
    <img src='/images/addnote.svg'/>
   <p>New note</p>
    </div>
    </Link>
    {notes?.length>0&& notes.map(note=><div className='addnote-child'>
    <h5>{note.created_at.slice(0,10)}</h5>
    <p>{note.title}</p>
    <div className='timing'>
    <p>{new Date(note.created_at).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
    <Link to='/therapy-notes' state={{ from: note }} ><img src='/images/right-arrow.svg'/></Link></div>
    </div>)}
    
   
   
    </div>
    </div>
  )
}

export default NotesDisp