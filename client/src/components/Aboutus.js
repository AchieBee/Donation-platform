import React from "react";
import Navbar from './Navbar';
import Footer from './Footer';
import aimage from '../Assets/group.jpg'
import './Aboutus.css'
import drop3 from '../Assets/lotus.png';


function Aboutus() {


    return (
        <div>
            <Navbar />
            <div className="side">
                <h3 className="abheader1">Our Organization</h3>
                <p className="sidetext555">Welcome to Hope Charity, where compassion
                    meets action, and every act of kindness creates a
                    ripple of positive change. Established on 22 November 2023,
                    Hope Charity is a beacon of hope committed to making a lasting
                    impact on the lives of those in need.</p>
                <img src={drop3} alt="drop3" className="drop3" />
            </div>
            <div className='vimg'>
                
                <img src={aimage} alt="group" className='vimg' />
            </div>
            <div className="atext">
                <h2 className="abheader">Meet the Team</h2>
                <p className="patext">
                    <h4>Nicolas Esemere- Founder</h4>
                    As the founder of Hope Charity,Nicolas is a driving force behind Hope Charity, has dedicated his life to creating positive change. 
                    With a background in Software engineering, he envisions a world where compassion knows no boundaries. 
                    Nick's passion for helping others is the cornerstone of Hope Charity's mission.</p>
                <p className="patext">
                    <h4> Tobias Omondi - Founder</h4> 
                    As the founder of Hope Charity,Tobias is a driving force behind Hope Charity, has dedicated his life to creating positive change.
                    With a background in Software engineering, he envisions a world where compassion knows no boundaries.
                    Tobias' passion for helping others is the cornerstone of Hope Charity's mission.</p>
            </div>
            <div className="atext2">
                <h2 className="abheader">Our Dedicated Team</h2>
                <p className="patext">
                    Hope Charity is made possible by a team of compassionate individuals who share
                    a common goal — to make the world a better place. From tech wizards ensuring a
                    seamless online experience to outreach coordinators building connections with communities,
                    each team member contributes to the heart and soul of Hope Charity.</p>
                
            </div>
                <div className="atext3">
                <p className="patext2">
                    <h2 className="abheader">Our Programs</h2><br/>

                    Basic Needs Assistance: We provide essential resources such as food, clean water, shelter, and medical care to those facing immediate challenges.<br />

                    Education Initiatives: We believe in the power of education to break the cycle of poverty. Our programs aim to increase access to quality education and empower individuals to build a brighter future.<br />

                    Community Development: Through sustainable projects, we actively participate in community development initiatives, focusing on infrastructure, economic empowerment, and social cohesion.<br />

                    Emergency Relief: In times of crisis, Hope Charity swiftly responds with emergency relief efforts, delivering aid to those affected by natural disasters, conflicts, or other unforeseen events.<br />

                    Get Involved:
                    Hope Charity thrives on the support of compassionate individuals, businesses, and organizations. Whether you choose to donate, volunteer, or advocate for our cause, your contribution plays a crucial role in bringing hope to those who need it most.<br />

                    Join Us in Spreading Hope:
                    Together, let's build a world where kindness knows no bounds and where the flame of hope burns brightly in the hearts of all. Join us on this meaningful journey, and let's make a positive impact that transcends boundaries and transforms lives.<br />

                    Thank you for being a part of the Hope Charity family. Together, we can turn hope into reality.</p>

            </div>
            <Footer />
        </div>
    );
}
export default Aboutus;