import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import { useParams } from "react-router-dom";
import Footer from './Footer';
import '../Home.css';


function Charitydetails() {
    const [selectedcharity, setSelectedCharity] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/donorh/${id}`)
            .then((response) => response.json())
            .then((data) => setSelectedCharity(data));
    }, [id]);

    const CollapsibleSection = ({ title, content }) => {
        const [isExpanded, setIsExpanded] = useState(false);

        const handleToggle = () => {
            setIsExpanded(!isExpanded);
        };
        return (
            <div className="collapsible-section">
                <div className="collapsible-header" onClick={handleToggle}>
                    <h4>{title}</h4>
                </div>
                {isExpanded && (
                    <div className="collapsible-content">
                        <h2>{content}</h2>
                    </div>
                )}
            </div>
        );
    };

    if (!selectedcharity) {
       
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />
            <div className="main2">
                <div className="page2">
                    <h2>{selectedcharity.name}</h2>
                    <img src={selectedcharity.image_url} alt={selectedcharity.name} className="imgd" />
                    <div className="text2">
                    <h3>{selectedcharity.description}</h3>
                    </div>
                </div>
                <div className="donate2">
                    <h2>Donate</h2>
                    <CollapsibleSection title="Paypal" content={selectedcharity.paypal} />
                    <CollapsibleSection title="Bank" content={selectedcharity.bank} />
                    <CollapsibleSection title="Mpesa" content={selectedcharity.mpesa} />
                    <CollapsibleSection title="Skrill" content={selectedcharity.skrill} />
                </div>
                
            </div>
            <Footer />
        </div>
    );
}

export default Charitydetails;