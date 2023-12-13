import React from 'react'
import './Vision.css'
import Navbar from './Navbar';
import images from '../components/images/Water.jpeg'
import Footer from './Footer'
import drop1 from '../Assets/vision.png';
import drop2 from '../Assets/mission.png';
import images33 from '../components/images/Gratitud Wine Design CF Napa Brand Design.jpeg'
import images35 from '../components/images/Premium Vector Child care logo.jpeg'
import images36 from '../components/images/Premium Vector People human together family unity logo icon illustration.jpeg'
import images37 from '../components/images/You will get Make Excellent Eye Catching Custom T Shirt.jpeg'
import images34 from '../components/images/A Modest Case for Civil Marriage Equality (Two Years Later).jpeg'


const Vision = () => {
  return (
    <>
        <Navbar />
        <div className='container-1'>
        <div className='navv'>
            ss
        </div>
        <div className='div2'>
            <div className='mission'>
                <img src={drop1} alt="drop1" className="drop1" />
                <h2>Mission</h2>
                <p className ='vtext'>"In pursuit of our mission, we are committed to empowering positive change through acts of compassion and collaboration.<br/> 
                    We strive to create a tangible impact on the lives of those in need, fostering a community where transparency,<br/> 
                    accountability, and unwavering dedication are the cornerstones of our endeavors."</p>
            </div>
            <div className='vission'>
                <img src={drop2} alt="drop2" className="drop2" />
                <h2>Vision</h2>
                <p className='vtext'>"In our vision, we see a world transformed by compassion, where every act of kindness ripples through communities,<br/> 
                    breaking barriers and creating a tapestry of shared humanity. It's a future where hope is abundant, opportunities <br/> 
                    are accessible to all, and the power of collective empathy shapes a world that nurtures the well-being and potential of every individual."</p>
            </div>
        </div>
        <div className='img'>
                  <img src={images} alt="hope" className='img' />
        </div>
        <div>
            <h3>Leadership</h3>
           <hr className='horizontal-line' />
           <div className='leader_logo'>
            <img src={images33} alt='logo'/>
            <img src={images35} alt='logo'/>
            <img src={images36}  alt='logo' />
            <img src={images37}  alt='logo' />
            <img src={images34} alt='logo'/>

           </div>
        </div>
       
        </div>
        <Footer />
    </>
  )
}

export default Vision