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
                    <div className="text2">
                        <h3>{selectedcharity.stories}</h3>
                    </div>
                </div>
                <div className="donate2">
                    <h2>Donate</h2>
                    <CollapsibleSection title="Paypal" content={<>
                        <div className="coldiv">Email: {selectedcharity.paypal_email}</div>
                        <div className="coldiv">Number: {selectedcharity.paypal_no}</div>
                    </>} />
                    <CollapsibleSection title="Bank" content={<>
                        <div className="coldiv">Account Name: {selectedcharity.Acc_name}</div>
                        <div className="coldiv">Bank Number: {selectedcharity.bank_no}</div>
                    </>} />
                    <CollapsibleSection title="Mpesa" content={<>
                        <div className="coldiv">Paybill: {selectedcharity.mpesa_paybill}</div>
                        <div className="coldiv">Account: {selectedcharity.mpesa_Acc}</div>
                    </>} />
                    <CollapsibleSection title="Skrill" content={<>
                        <div className="coldiv">Country: {selectedcharity.skrill_country}</div>
                        <div className="coldiv">Name: {selectedcharity.skrill_name}</div>
                    </>} />
                </div>
                
            </div>
            <Footer />
        </div>
    );
}

export default Charitydetails;