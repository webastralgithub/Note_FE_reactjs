
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ColorSchemesExample({isLoggedIn,setisLoggedIn}) {
const navigate=useNavigate()
  const onLogout=()=>{
    localStorage.clear()
    setisLoggedIn(false)
navigate("/")
  }
  return (

    <div className='top_nav'>
  
       
      <Navbar expand="lg"  >
     <Container fluid>
        <Link className='header-logo-top' to="/"><img src="/images/logo.svg" /></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
      
           
        
             
       {!isLoggedIn ?   <Nav className="me-auto"> <Link to="/home" class="nav-item nav-link px-3">Home</Link>
            <Link to="/therapy-notes" class="nav-item nav-link px-3">Therapy Notes</Link>
            <Link to="/goals" class="nav-item nav-link px-3">Goals</Link>
            <Link to="/profile" class="nav-item nav-link px-3">Profile</Link>
            <Link to="/Calendar" class="nav-item nav-link px-3">Calendar</Link>
            <Link to="/notification" class="nav-item nav-link px-3">Notification</Link>
            <Link to="/homework" class="nav-item nav-link px-3">Homework</Link>
            </Nav>: <Nav className="me-auto">   <Link to="/goals" class="nav-item nav-link px-3">Goals</Link>
            <Button onClick={onLogout} class="nav-item nav-link px-3">Logout</Button>   </Nav>}
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
   
      
    </div>
  );
}

export default ColorSchemesExample;