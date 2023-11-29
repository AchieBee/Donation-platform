import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import '../Home.css'

function Donorhomepage({charity}){
    const [getdonor, setdonor] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch('http://127.0.0.1:5555/donorh')
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data.charities)) {
                    setdonor(data.charities);
                } else {
                    console.error('Data is not in the expected format:', data);
                }
            }, 2000);
    }, []);
    const handleClick = (id) => {
        navigate(`/donorh/${id}`);
    };
    
    return(
        <div>
         <Navbar />
            <div className="donor">
                {getdonor.map((charity) => (
                    <div key={charity.id} className="donori">
                        <div className="cimg">
                            <img src={charity.image_url} alt="charity_img" />
                        </div>
                        <div className="ptext">
                            <h2>{charity.name}</h2>
                            <p> {charity.description}</p>
                            <h5>{charity.posted_at}</h5>
                        </div>
                        <button onClick={() => handleClick(charity.id)}>Donate</button>
                    </div>
                ))}
            </div>
         <Footer />  
        </div>
    );
}
export default Donorhomepage;