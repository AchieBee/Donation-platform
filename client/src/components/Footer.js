import React from 'react'
import logo from '../Assets/logo.png';
import './Footer.css'
import images3 from '../components/images/Elon Musk.jpeg'
import images4 from '../components/images/Cuisenaire Rods in the Classroom.jpeg'
import images5 from '../components/images/6 Ways to Grow Your Facebook Page Audience.jpeg'
import images6 from '../components/images/15+ Logo Linkedin Png.jpeg'
import images7 from '../components/images/Email, gmail, mail, logo, social, social media icon - Free download.jpeg'
import images8 from '../components/images/Whatsapp icons for free download Freepik.jpeg'

const Footer = () => {
        return (
           <div className='footer'>
                <div className='ftext'>
                    <p>Charity is a selfless act of giving, 
                    driven by compassion and a desire to improve the well-being of
                    others. It involves providing support, resources, or assistance to those 
                    in need, fostering a sense of community and contributing to positive social impact</p>
                <img src={logo} alt="logo" className="logo" />
                </div>
                <div className='contact'>
                    <a href='Contact info'><p>Contact us</p></a> 
                    <img className = 'mail' src={images7} alt= 'mail'/>
                    <img className='whatsapp' src = {images8} alt = 'whatsapp'/>
                    <img className='linkedin' src={images6} alt='whatsapp' />
                    <span>+254741041580</span><br/>
                    <span>+254700909000</span><br/>
                    <a href='News'><p>News</p> </a>
                </div>
                <div className='about'>
                    <a href='About us'><p>About us</p></a>
                </div>
               
                <div className='socialmedia'>
                    <img src={images3} alt='twitter'/>
                    <img src= {images4} alt = 'instagram'/>
                    <img src = {images5} alt = 'facebook'/>
                    <img src= {images6} alt='linked'/>
                </div>
                <div className='fin'>
                <p>&copy;2023 Hope Charity Organisation</p>
                </div>
           </div> 
        )
    
}

export default Footer

