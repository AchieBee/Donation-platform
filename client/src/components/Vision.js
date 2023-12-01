import React from 'react'
import './Vision.css'
import Navbar from './Navbar';
import images from '../components/images/Death of an infant shows cruelty of starving in a country of food abundance.jpeg'
import Footer from './Footer'
import drop1 from '../Assets/vision.png';
import drop2 from '../Assets/mission.png';



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
                <p>"In pursuit of our mission, we are committed to empowering positive change through acts of compassion and collaboration.<br/> 
                    We strive to create a tangible impact on the lives of those in need, fostering a community where transparency,<br/> 
                    accountability, and unwavering dedication are the cornerstones of our endeavors."</p>
            </div>
            <div className='vission'>
                <img src={drop2} alt="drop2" className="drop2" />
                <h2>Vision</h2>
                <p className='atext'>"In our vision, we see a world transformed by compassion, where every act of kindness ripples through communities,<br/> 
                    breaking barriers and creating a tapestry of shared humanity. It's a future where hope is abundant, opportunities <br/> 
                    are accessible to all, and the power of collective empathy shapes a world that nurtures the well-being and potential of every individual."</p>
            </div>
        </div>
        <div className='img'>
                  <img src={images} alt="hope" className='img' />
        </div>
        </div>
        <Footer />
    </>
  )
}

export default Vision