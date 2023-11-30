import React from "react";
import "./Aboutus.css";

function Aboutus() {
  const imageUrl = 'https://images.pexels.com/photos/5257759/pexels-photo-5257759.jpeg?auto=compress&cs=tinysrgb&w=600'

  return (
    <div className="aboutus-container">
      <h3>About Us</h3>
      <div className="header">
        <h1>
          <img src={imageUrl} alt="Our Organisation" />
          <span className="overlay-text">Our Organisation</span>
        </h1>
      </div>

      <div className="p-container highlighted">
        <h4>About Us</h4>
        <p><em>At HopeCharity we are an organisation....</em></p>
      </div>

    </div>
  );
}

export default Aboutus;
