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
                    <h4>Our Values</h4>
                    <p>
                        <h5>Empathy</h5>
                        Hope Charity is founded on the principle of empathy.
                         We understand that everyone has a unique story, 
                         and we strive to create an inclusive space where 
                         people can support one another in times of need.
                        <h5>Transparency</h5>
                        We are committed to transparency in all our operations. 
                        From the allocation of funds to the impact of each donation, 
                        we believe in keeping our community informed and engaged.
                        <h5>Collaboration</h5>
                        Hope Charity is a collaborative effort. 
                        We partner with a network of trusted charities, organizations, 
                        and individuals to amplify the reach and effectiveness of our collective efforts.</p>
                </div>
                <div className='div2'>
                    <div className='mission'>
                        <img src={drop1} alt="drop1" className="drop1" />
                        <h2 className='visionheader'>Mission</h2>
                        <p className='vtext'>"In pursuit of our mission, we are committed to empowering positive change through acts of compassion and collaboration.<br />
                            We strive to create a tangible impact on the lives of those in need, fostering a community where transparency,<br />
                            accountability, and unwavering dedication are the cornerstones of our endeavors."</p>
                    </div>
                    <div className='vission'>
                        <img src={drop2} alt="drop2" className="drop2" />
                        <h2 className='visionheader'>Vision</h2>
                        <p className='vtext'>"In our vision, we see a world transformed by compassion, where every act of kindness ripples through communities,<br />
                            breaking barriers. It's a future where hope is abundant, opportunities <br />
                            are accessible to all, and the power of collective empathy shapes a world that nurtures the well-being and potential of every individual."</p>
                    </div>
                </div>
                <div className='img'>
                    <img src={images} alt="hope" className='img' />
                </div>
                <div className='how'>
                    <h2 className='vi'>How Hope Charity Works</h2>
                    <p className='vtext'><h4>Donate with Purpose</h4>
                        Our platform allows you to donate to a variety of causes that resonate with
                        your values via the Donor account. Whether it's supporting education, healthcare, disaster relief,
                        or community development, you have the power to make a difference.
                        Our platform also allows you to be donated to to via Charity account
                        which allows a user to create a Charity /cause to be donated to.</p>
                    <p className='vtext'><h4>Support</h4>
                        Our abled admins work round the clock to efficiently approve Charity accounts.
                        If approved you will receive an email informing you of your account approval or rejection .
                        If you or someone you know is facing a challenge and could use a helping hand,
                        our "Request Assistance" feature is here for you.
                        We believe in the strength of community support,
                        and together, we can overcome obstacles.</p>
                </div>
                <div>
                    <h3>Leadership</h3>
                    <hr className='horizontal-line' />
                    <div className='leader_logo'>
                        <img src={images33} alt='logo' />
                        <img src={images35} alt='logo' />
                        <img src={images36} alt='logo' />
                        <img src={images37} alt='logo' />
                        <img src={images34} alt='logo' />

                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Vision