import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './App.css';




function Donorhomepage(){
    const [getCharity, setCharity] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/charities')
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data.charities)) {
                    setCharity(data.posts);
                } else {
                    console.error('Data is not in the expected format:', data);
                }
            }, 2000);
    }, []);


    return(
        <div>
         <Navbar />
            <div className="charities">
                {charities.map((charity) => (
                    <div key={charity.id} className="charity-item">
                        <div className="cimg">
                            <img src={charities.image_url} alt="charity_img" className="cimg" />
                        </div>
                        <div className="ptext">
                            <h2>{charities.name}</h2>
                            <p1> {charities.description}</p1>
                        </div>
                        <button onClick={() => handleClick()}>Donate</button>
                    </div>
                ))}
            </div>
         <Footer />  
        </div>
    );
}
export default Donorhomepage;