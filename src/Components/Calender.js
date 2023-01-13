
import React, { useState ,useRef,useLayoutEffect} from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import MiniHeader from './MiniHeader'
import { Button, Modal } from "react-bootstrap";

import "./Calender.css"

import axios from 'axios';
import { filter } from 'draft-js/lib/DefaultDraftBlockRenderMap';
const INITIAL_STATE = {
  
 title: "",
description: "",
type:"",day:'',
starts_at:""
  
};

const Calender = () => {
  const[show,setShow]=useState(false)
  const[showEvent,setShowEvent]=useState(false)
  const [args,setArgs]=useState()
  const [obj,setObj]=useState( INITIAL_STATE)
  const [value, onChange] = useState('10:00');
  const [appData,setAppData]=useState();
  const[dateData,setDateData]=useState()
  const [date,setDate]=useState('')
  const selected=useRef('')
  const token =JSON.parse(localStorage.getItem('token'));
  const url=process.env.REACT_APP_API_KEY
let config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}

useLayoutEffect(() => {
  getEvents()

},[])
const getEvents=async () => {
  try {
    const data = await 
      axios.get(`${url}/event`,config)
      console.log(data);
     const capitals = data.data.data?.map(function(obj) {
        obj['date'] = obj['day']; // Assign new key
        delete obj['day']; // Delete old key
        return obj;
    });

      setAppData(capitals);
      
  }
catch (error) {
  console.log(error);
}
}

  const handleClose = () => 
  {
    setShow(false);
  }
 const handleDateClick = (arg) => { 

  setShow(true)
  setDate(arg.dateStr)
  const filterByDate = appData.filter((app)=>app.date==arg.dateStr
  )
  setDateData(filterByDate)
  setObj({
    ...obj,day:arg.dateStr
  })

  
    
  }
 
 
  const submitHandler =async(e)=>{
e.preventDefault();
const newObj={
 ...obj,
  type:selected.current.value
}


console.log([...appData, newObj])
  await axios.post(`${url}/event`,newObj,config).then((res) => {
  setObj(INITIAL_STATE)
  selected.current.value =""
  getEvents()
  setDateData([...dateData, newObj])
  
}).catch((error) => {
 
    console.log(error)
    
  })
  }



  const handleInput = (e) => {
    const object = {};
    object[e.target.name] = e.target.value;
  //  console.log(e.target.value)
   setObj({...obj,...object})
   console.log('objswfdsa',e.target.value);
  }
  const notesQuestions = [
    { id: 0, title: "Event"},
    { id: 1, title: "Appointment"},
    
  ]
  const getQuestions=()=> {
  
  
    return notesQuestions.map((goal) => {
      return <option  value={goal.title}>{goal.title} 
             </option>;
    });
  }
  
  return (
    <div>
    <MiniHeader head='Calendar'/>
    <FullCalendar
    events={appData}
    eventClick={
      function(arg){
     
      setArgs({
        title:arg.event.title,
        start:arg.event.start,
        time:arg.event.extendedProps.starts_at,
        description:arg.event.extendedProps.description
      })
       setShowEvent(true)
       

      }
    }
    plugins={[ dayGridPlugin, interactionPlugin]}
 dateClick={handleDateClick}
    navLinks={true}

  />
   <Modal className='calendar-modal'  show={showEvent}

   aria-labelledby="contained-modal-title-vcenter"
  centered
   >
   

   <div>
   <button style={{border:"none",background:"transparent"}} onClick={()=>setShowEvent(false)} ><img className='img-fluid' src="/images/cross.png"/></button> 
   <p>
   {args?.start.toISOString().slice(0,10)}
   </p>
   {args?.time}
   <p>
   {args?.title}:{args?.description}
   </p>


   </div>
   
   </Modal>
  <Modal className='calendar-modal' show={show}

  aria-labelledby="contained-modal-title-vcenter"
  centered
  >
  <div>
  <div style={{display:"flex",justifyContent:"flex-end"}}>
  <button style={{border:"none",background:"transparent"}} onClick={handleClose} ><img className='img-fluid' src="/images/cross.png"/></button> 
</div>
<label>{date}</label>
  <form onSubmit={submitHandler}>
  <label>Time</label>
  <input   type="time" name="starts_at"  
  value={obj.starts_at}   onChange={handleInput}></input>
  <label>Title</label>

  <input
    type="text"
    className='inp'
    name="title"
    value={obj.title}
    onChange={handleInput}
    
  /><br />  


  <label>Description</label>
  <input
    type="text"
    className='inp'
    name="description"
    value={obj.description}
    onChange={handleInput}
    
  />
  <label>Type</label>
  <select
  ref={selected}
  className="form-control therepy-select"
 style={{width:'40%'}}
  aria-label="Floating label select example"
  >
  <option value="choose" disabled >
  <p>Select question</p>
  </option>
  {getQuestions()}
  </select>

  <Button type='submit' className='login-btn'  variant="primary" size="lg">Add</Button> 
  </form>
  
  </div>

{
 dateData?.map((data)=>(
    <>
  <p>{data.title}:<span>{data.description}</span></p>

  </>
  
  ))
}
  </Modal>
  
    </div>
  )
}



export default Calender