import React from 'react'
import './Vision.css'
import images from '../components/images/Death of an infant shows cruelty of starving in a country of food abundance.jpeg'
import Footer from './Footer'


const Vision = () => {
  return (
    <div className='container'>
        <div className='container-1'>
            <h2>OUR MISSION AND VISSION STATEMENT</h2>
        </div>
        <div className='mission'>
            <h1>Mission</h1>
            <p>"In pursuit of our mission, we are committed to empowering positive change through acts of compassion and collaboration.<br/> 
                We strive to create a tangible impact on the lives of those in need, fostering a community where transparency,<br/> 
                accountability, and unwavering dedication are the cornerstones of our endeavors.<br/> 
                Join us on this mission to build a brighter, more compassionate future, one where every individual has the opportunity <br/> 
                to thrive and contribute to a world defined by empathy and collective support."</p>
        </div>
        <div className='vission'>
            <h1>Vision</h1>
            <p>"In our vision, we see a world transformed by compassion, where every act of kindness ripples through communities,<br/> 
                breaking barriers and creating a tapestry of shared humanity. It's a future where hope is abundant, opportunities <br/> 
                are accessible to all, and the power of collective empathy shapes a world that nurtures the well-being and potential of every individual."</p>
        </div>
        <hr></hr>
        <div className='img'>
        <img src={images} alt="Image link" />
        <div>
            <Footer />
        </div>
        </div>
    </div>
  )
}

export default Vision