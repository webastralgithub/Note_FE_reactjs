import React,{useState,useLayoutEffect,useRef} from 'react'
import { Editor } from 'react-draft-wysiwyg'

import "./Projects.css"
import TextEditor from './ProjectEdit';
import MiniHeader from './MiniHeader';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import NotesDisp from './NotesDisp';


const Projects = () => {
 

 

  const[goals,setGoals]=useState([])
  const[notes,setNotes]=useState()
  const[notesText,setNotesText]=useState("")
  const[notesScreen,setNotesScreen]=useState(false)
  const [selected, setSelected] = useState();
  const [weekly, setWeekly] = useState();
  const [achieved,setAchieved]=useState()
  const [selectedGoal, setSelectedGoal] = useState();
  const url=process.env.REACT_APP_API_KEY
  
  const[title,setTitle]=useState()
 
  const text=useRef('')
  const previous=useRef('')



 

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


  const changeScreen=(from)=>{
    
  console.log('here',from.title)
    
        title.current.value=from.title
        setNotesText(from.description)
       
   
    
    setNotesScreen(true)
  }


  const token =JSON.parse(localStorage.getItem('token'));
  let config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  
 
   
   const submit= async()=>{
    const body ={
    
     
     title:title.current.value,
   //  question_id:selected,

     description:notesText,
    //  answer:text.current.value,
    //  goal_rating:achieved,
    //  weekly_rating:weekly,
    //  goal_id:selectedGoal,
    //  previous_week_description:previous.current.value

    }
    var form_data = new FormData();
   
    for ( var key in body ) {
        form_data.append(key, body[key]);
    }
console.log(body)
    const res = await axios.post(`${url}/note`,form_data,config);

   }
 
  return (
    <div>
    <MiniHeader head='Therapy Notes' />
   {!notesScreen&& <div>
    
    <div className='search-filter'>
    <input/>
    <div className='short'>
    Short:<Button><img src='/images/short.svg'/></Button></div>
    </div>
  <div className='addnotes-wrapper'>
   <div className='addnote-child addone-value' onClick={()=>{
    setNotesScreen(true)
  }}>
    <img src='/images/addnote.svg'/>
   <p>New note</p>
    </div>
    
    {notes?.length>0&& notes.map(note=><div className='addnote-child'>
    <h5>{note.created_at.slice(0,10)}</h5>
    <p>{note.title}</p>
    <div className='timing'>
    <p>{new Date(note.created_at).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
<img onClick={()=>{
  changeScreen(note)

}} src='/images/right-arrow.svg'/></div>
    </div>)}
    
   
   
    </div>
    </div>}
    {notesScreen && <div>
    <form >
  <div className="input-group">
  
    <div className="input-group-btn">
      <button className="btn btn-default" type="submit">
        <i className="glyphicon glyphicon-search"></i>
      </button>
    </div>
 
  </div>
</form>
<label>Title</label>
<input ref={title} style={{width:'100%',height:"107px"}} type='text'></input>   
<TextEditor setNotesText={setNotesText} notesText={notesText}/>


   <button><img src="/images/del.png" alt="my image"  /></button>.
   <button onClick={submit}><img src="/images/save.png" alt="my image" /></button>
   </div>}
 </div>

  )
}

export default Projects