import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import "./login.css"
import axios from 'axios'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaMobile, FaPhone, FaUser } from 'react-icons/fa'
const Login = ({login,setLogin,isLoggedIn,setisLoggedIn}) => {
  const navigate=useNavigate()

  const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(null);
const [obj,setObj]=useState({})
const [image,setImage]=useState('/images/download.png')
useEffect(() => {
  // Good!
 
}, [obj]);
const url=process.env.REACT_APP_API_KEY

const togglePassword =()=>{
  if(passwordType==="password")
  {
   setPasswordType("text")
   return;
  }
  setPasswordType("password")
}

const handleChange=(e)=>{
  console.log("byhuugggh")
  if(error){
  setError(null)
  }
  console.log("sdfssfsf",e.target.name+":"+e.target.value)
  const object = {};
  object[e.target.name] = e.target.value;

 setObj({...obj,...object})
 console.log({...obj,...object})
}



const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
  const submit= async(e)=>{
    e.preventDefault()
    if (!validateEmail(obj.email)) {
      setError('Invalid Email');
    }

    if (obj.password.length < 8) {
      setError('Password must be at least 8 chars long');
    }
    if(!error){
console.log('here')
try{
  const response = await axios.post(`${url}/login`,obj) 
  const token = JSON.stringify(response.data.token);
  localStorage.setItem("token",token)
  localStorage.setItem("user_details",JSON.stringify(response.data.user_details))
  if(token){
    navigate("/therapy-notes")
    setisLoggedIn(true)
  }
  setObj({})
  e.target.reset()
}
    
catch(error){
  console.log(error.response);
      setError(error.response.data.message)
}
    }
}

const toggle=()=>{
  setObj({})
  if(login=='login')
  setLogin('signup')
  else
  setLogin('login')
 
}
const signup= async(e)=>{
    e.preventDefault()
    if (!validateEmail(obj.email)) {
      setError('Invalid Email');
      return
    }

    if (obj.password.length < 8) {
      setError('Password must be at least 8 chars long');
      return
    }
    if(!error){
    var form_data = new FormData();
var item={...obj,image:image}
for ( var key in item ) {
    form_data.append(key, item[key]);
}try{
  const response = await axios.post(`${url}/register`,form_data) 

  const token = JSON.stringify(response.data.token);
  localStorage.setItem("token",token)
  if(token){
    navigate("/home")
    setisLoggedIn(true)
  }
  setObj({})
  e.target.reset()
}
catch(error){
  console.log(error.response);
      setError(error.response.data.message)
}
    }
   
}
const onChangePhoto = async(e) => {
  setImage(e.target.files[0])
};



  return (
  <>
   {login =="login" && <div className='login-wrapper'  >
   <form onSubmit={submit}>
   {error && <div style={{ color: 'red' }}>{error}</div>}
  <div className='login-inner'>
  
  <div className='login-img-wrapper'>
  <img className='img-fluid' src='/images/login.png' />
    </div>

    <div className='login-input-wrapper'>
    <h2 className='mb-0'>Welcome!</h2>
    <p>Login your account here</p>

    <div className="mb-3 input-box">
     
     <FaUser/> <input
        type="email"
       className='inp'
        placeholder="Enter email"
        name="email"
        value={obj.email}
        onChange={handleChange}
        
      />
    </div>
    <div className="mb-3 input-box">
     
     <FaLock /> <input
        type="password"
        className='inp'
        name="password"
        placeholder="Enter password"
        value={obj.password}
        onChange={handleChange}
        
      />
      </div>
      <div className="mb-2">
      <div className="password-section">
      <div className='remember-block'>
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
            </div>
            <div className='forget'>
            <span className="text-right">
             Forgot <a href="#">password?</a>
          </span>
            </div>
            
            </div>
            <Button type='submit' className='login-btn'>Login</Button> 
          </div>
      
      <p className="text-center sign-up-text">
      New member? <Link to="#" onClick={toggle}>Sign up</Link>
</p>   
    </div>  
   
    </div>
    </form>
    </div>}
  {login=='signup'&& <div className='signup-wrapper'>
  <form onSubmit={signup}>
  {error && <div style={{ color: 'red' }}>{error}</div>}
  <h2>Sign up</h2>
  <p>Create your account here</p>
  <div className='signup-inner-wrapper'>
  
  <div className='input-feilds-wrapper'>
   
    <div  className="mb-3 input-box">
    
    <FaUser /><input
      type="name"
     className='inp'
      placeholder="Enter full name"
      name="name"
      value={obj.name}
      onChange={handleChange}
      
    />
  </div>
  
    <div  className="mb-3 signup-password input-box">
     
    <FaLock /> <input
    type={passwordType}
    className='inp'
    name="password"
    placeholder="Password"
    value={obj.password}
    onChange={handleChange}
    
  />
  <div onClick={togglePassword}>
                     { passwordType==="password"?<FaEye /> :<FaEyeSlash /> }
                     </div>
  </div>
  <div  className="mb-3 input-box">
     
 <FaLock /><input
    type="password"
    className='inp'
    name="password_confirmation"
    placeholder="Confirm Password"
    value={obj.password_confirmation}
    onChange={handleChange}
    
  />

  </div>
  <div className="mb-3 input-box">
       
       <FaMobile />  <input
           type="phone"
           className='inp'
           name="phone_number"
           placeholder="Mobile Number"
           value={obj.phone_number}
           onChange={handleChange}
           
         />
         
         </div>
  <div  className="mb-3 email-wrapper input-box">
     
    <FaEnvelope /> <input
            type="email"
           className='inp'
            placeholder="Enter email"
            name="email"
            value={obj.email}
            onChange={handleChange}
            
          />
    </div>
   
  

    </div>
    <div className='image-wrapper'>

        <div className='upload-image'>
        <div className="profile-pic-container">
        <img className="profile-pic" src={image} alt="" />
      </div>

      <div className="profile-pic-update-container">
      
        
          <div className="">
            <label for="profilePhoto" htmlFor="profilePhoto" className="form-label">
              Upload Picture <img src='\images\upload-icon.svg'/>
            </label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              multiple={false}
              id="profilePhoto"
              onChange={onChangePhoto}
            />
          </div>
          <input
            type="button"
            value="Upload"
            className="btn btn-primary btn-block mt-1"
            onClick={onChangePhoto}
          />
       
      </div>
      </div>
       
   </div>
   
   
    </div>
    <div className='button-wrapper'>
   <Button type='submit' className='login-btn'  variant="primary" size="lg">Signup</Button> 
   <p className="text-right login-link">
        Already have an account? <Link to="#" onClick={toggle}>Login</Link>
     </p>
   </div>
    </form>
    </div>}
    </>

  )
}

export default Login