import React,{useEffect, useState} from 'react'
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa'
import { Button, Container,Modal } from 'react-bootstrap'
import './style.css'
import Login from './Login'
import { useNavigate } from 'react-router-dom'
const Home = ({isLoggedIn,setisLoggedIn}) => {
  const navigate=useNavigate()
    const [show, setShow] = useState(false);
      const[login,setLogin]=useState('')
    
      useEffect(() => {
       const token =localStorage.getItem('token')
       if(isLoggedIn || token){
navigate("/therapy-notes")

       }
      }, []);
  const handleClose = () => 
  {
    setShow(false);
     setLogin('')
  }
  const handleShow = (status) => 
{
    setShow(true);
    setLogin(status)
  }
  return (
    <div>
    <div className='top-banner'>
    <div className='top-banner-left-cnt'>
    <div className='top-banner-left-cnt-img'>
    <img  src="/images/header-banner.svg" alt="loading"/>
    </div>
    </div>

    <div className='top-banner-right-cnt'>
   <p className='banner-grey-text'>Please Login and</p> 
   
   <h3 className='blue-heading'>Start Making Notes
    Regarding your therapy</h3>
   <p className='banner-para'>
   Notes For Therapy was created to help maximize your therapy experience. Have you ever felt rushed going into a therapy session and realized you didn’t know what you wanted to talk about?
   </p>
   <div className='btn-head'>
<Button className='button login-btn' onClick={()=>handleShow('login')} variant="primary" size="lg"><FaUserCircle />Login</Button> 
<Modal className='login-modal' show={show}

aria-labelledby="contained-modal-title-vcenter"
centered
>
<div style={{display:"flex",justifyContent:"flex-end"}}>
<button style={{border:"none",background:"transparent"}} onClick={handleClose} ><img className='img-fluid' src="/images/cross.png"/></button> 
</div>

<Login  
login={login}
setLogin={setLogin}
isLoggedIn={isLoggedIn}
 setisLoggedIn={setisLoggedIn}

/>
</Modal>
<Button className='button signup-btn' onClick={()=>handleShow('signup')} variant="primary" size="lg"><FaRegUserCircle /> Signup</Button>
    </div>
    </div>
    
    
    
    </div>
    <div className='download-banner'>
    <div className='dounload-inner'>
    <h2>Download Our app</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
    <div className='download-btn-head'>
    <button><img src='/images/playstore.png'/></button>
    <button><img src='/images/playstore.png'/></button>
    </div>
    </div>
    </div>
    <div className='story-section'>
    <div className='story-head'>
    <p className='banner-grey-text'>Who we are</p>
    <h2 className='blue-heading'>Our Story</h2>
    <h4>Notes For Therapy was created to help maximize your therapy experience. Have you ever felt rushed going into a therapy session and realized you didn’t know what you wanted to talk about?</h4>
    </div>
    <div style={{display:'flex'}}>
    <div  style={{width:'50%' }}>
    <img   src="/images/our-story.png" alt="loading"/>
    </div>
    <div style={{width:'50%',alignSelf: "center"}}>
   <ul className='list-head'>
   <li>
   With this app, you can add notes about relevant topics throughout the week (or longer, if your therapy appointments aren’t weekly). With this tool, you can feel clear and prepared going into your therapy sessions!

   </li>
   <li>
   Once you click on the therapy option (Individual, Couples or Other), you have the option to write journal entries, notes for specific therapy sessions, information on your goals, and entering your sessions on a calendar so that you can track. 
   </li>
   </ul>
   </div>
    </div>
    </div>
    <div className='testinomials'>
    MY CLIENTS
    <h3>Testimonials</h3>
    </div>
    <div className='subscriptions'>
    
    
    <div style={{display:'flex'}}>
    <div className='news-left' style={{width:'50%' }}>

   <p>Mailing List</p>
   <h2>
   Subscribe to our Newsletter
   </h2>
    </div>
    <div className='news-right' style={{width:'50%'}}>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
    <div className='news-input-head'>
   <input type="email" placeholder='Enter your email address'></input><Button>Subscribe<img style={{width: "18px",marginLeft: "10px"}} src='/images/mail.svg'/></Button>
   </div>
   </div>
   </div>
   </div>
   
    
    </div>
  )
}

export default Home