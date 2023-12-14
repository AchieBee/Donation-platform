import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../Home.css';


function Charityhomepage({charity}) {
    const [getCharity, setCharity] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '', stories: '', image_url: '', user_id: '', paypal_email: '', paypal_no: '', bank_no: '', acc_name: '', mpesa_paybill: '', mpesa_acc: '', phone_no: '', skrill_name: '', skrill_country: '',beneficiary_name:'',beneficiary_image_url:'',beneficiary_stories:'',});

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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5555/charityh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data.message); 
            if (response.ok) {
                setFormData({name: '',description: '',stories: '',
                    image_url: '', user_id: '', paypal_email: '', paypal_no: '', bank_no: '', acc_name: '', mpesa_paybill: '', mpesa_acc: '', phone_no: '', skrill_name: '', skrill_country: '',beneficiary_name: '',beneficiary_image_url: '',beneficiary_stories: '',});   
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };
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
                            <h5>{charity.posted_at}</h5>
                        </div>
                    </div>
                ))}
            </div>
            <div className='formc'>
                <h2>Charity Form</h2>
                <form onSubmit={handleSubmit}>
                    <label>Title:</label><input type="text" name="name" value={formData.name} onChange={handleChange} /> 
                    <label>Description:</label><textarea name="description" value={formData.description} onChange={handleChange} />
                    <label>Stories:</label><textarea name="stories" value={formData.stories} onChange={handleChange} />
                    <label>Image:</label><input type="text" name="image_url" value={formData.image_url} onChange={handleChange} />
                    <h3>Account Information</h3>
                    <label>Paypal_email:</label><input type="text" name="paypal_email" value={formData.paypal_email} onChange={handleChange} />
                    <label>Paypal_no:</label><input type="text" name="paypal_no" value={formData.paypal_no} onChange={handleChange} />
                    <label>Bank_no:</label><input type="text" name="bank_no" value={formData.bank_no} onChange={handleChange} />
                    <label>Account_name:</label><input type="text" name="acc_name" value={formData.acc_name} onChange={handleChange} />
                    <label>Mpesa_paybill:</label><input type="text" name="mpesa_paybill" value={formData.mpesa_paybill} onChange={handleChange} />
                    <label>Mpesa_acc:</label><input type="text" name="mpesa_acc" value={formData.mpesa_acc} onChange={handleChange} />
                    <label>Skrill_country:</label><input type="text" name="skrill_country" value={formData.skrill_country} onChange={handleChange} />
                    <label>Skrill_name:</label><input type="text" name="skrill_name" value={formData.skrill_name} onChange={handleChange} />
                    <label>Phone_no:</label><input type="text" name="phone_no" value={formData.phone_no} onChange={handleChange} />
                    <h3>Beneficiary Information</h3>
                    <label>Beneficiary Name:</label><input type="text" name="beneficiary_name" value={formData.beneficiary_name} onChange={handleChange} />
                    <label>Beneficiary Image URL:</label>
                    <input type="text"name="beneficiary_image_url"value={formData.beneficiary_image_url}onChange={handleChange}/>
                    <label>Beneficiary Stories:</label><textarea name="beneficiary_stories"value={formData.beneficiary_stories}onChange={handleChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
        <Footer />  
        </>

    );
}
export default Charityhomepage;