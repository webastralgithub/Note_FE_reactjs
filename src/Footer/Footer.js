import React from 'react'
import { Container,Row,Col} from 'react-bootstrap'
import "./footer.css"

import { Link } from 'react-router-dom'


const Footer = () => {

  return (
    <div className='footer py-5'>
 <Container fluid >
 <Row>
 <Col md={2} className='d-flex align-items-center'>
 <div className='footer-logo'>
 <Link  to="/"><img src="./images/logo.svg" /></Link>
 </div>
 </Col>
 
 <Col md={5} >
 <div className='footer-link'>
 <h4>Quick links</h4>
 <Row>
 <Col md={4}>
 <Link to="/therapy-notes">Therapy Notes</Link>
 </Col>
 <Col md={4}>
 <Link to="/therapy-notes">Contact </Link>
 </Col>
  <Col md={4}>
 <Link to="/therapy-notes">Terms and Conditions</Link>
 </Col> 
 <Col md={4}>
 <Link to="/therapy-notes">Calendar</Link>
 </Col>
 <Col md={4}>
 <Link to="/therapy-notes">Privacy & Policy</Link>
 </Col>
 <Col md={4}>
 <Link to="/therapy-notes">Therapy Notes</Link>
 </Col>
 </Row>
 </div>
 </Col>
 <Col md={3}>
 <div className='footer-download'>
 <h4>Download Our App</h4></div>
 <div className='footer-download-btns platform'>
 <Link to="#"><img src='/images/playstore.png'/></Link>
 <Link to="#"><img src='/images/appstore.png'/></Link></div></Col>
 <Col md={2}>
 <div className='social-link'>
 <h4>Follow Us on</h4>
 <div className='icon-head'>
 <Link to="#"><img src='/images/facebook.svg'/></Link>
 <Link to="#"><img src='/images/twitter.svg'/></Link>
 <Link to="#"><img src='/images/linkedin.svg'/></Link>
 </div>
 </div></Col>
</Row>
 <Col>

 </Col>

 </Container>
 </div>
       

 
  )
}
export default Footer