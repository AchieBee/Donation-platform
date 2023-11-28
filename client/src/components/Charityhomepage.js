import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../Home.css';


function Charityhomepage({charity}) {
    const [getCharity, setCharity] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/charityh')
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data.charities)) {
                    setCharity(data.charities);
                } else {
                    console.error('Data is not in the expected format:', data);
                }
            }, 2000);
    }, []);
    return (
        <>
        <Navbar />
        <div className='cbody'>
            <div className="charitym">
                {getCharity.map((charity) => (
                    <div key={charity.id} className="charityi">
                        <div className="cimg">
                            <img src={charity.image_url} alt="charity_img" className="cimg" />
                        </div>
                        <div className="ptext">
                            <h2>{charity.name}</h2>
                            <p> {charity.description}</p>
                            <h3>{charity.posted_at}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <div className='formc'>
                
            </div>
        </div>
        <Footer />  
        </>

    );
}
export default Charityhomepage;