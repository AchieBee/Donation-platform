import React, { useState, useEffect } from 'react';
import images16 from '../components/images/Account, user, interface, profile icon - Free download.jpeg';
import images17 from '../components/images/failure.png';
import images18 from '../components/images/tracker.png';
import images19 from '../components/images/arrow.png';
import images20 from '../components/images/Child labour - Child Labour in India(4).jpeg';
import images21 from '../components/images/Child labour - Child Labour in India(4).jpeg';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/dash');
      const result = await response.json();
      setDashboard(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleButtonClick = async (buttonType) => {
    if (buttonType === 'newsAndEvents') {
      try {
        const response = await fetch('http://127.0.0.1:5555/newsAndEvents');
        const result = await response.json();
        setDashboard(result);
      } catch (error) {
        console.error('Error fetching news and events:', error);
      }
    } else if (buttonType === 'unapprovedRequests') {
      // Implement fetching unapproved requests data
    } else if (buttonType === 'archivedAmount') {
      // Implement fetching archived amount data
    } else if (buttonType === 'settings') {
      // Implement fetching settings data
    }
  };

  return (
    <div className='dash_container'>
      <img src={images16} alt="crying child" />
      <div className='name'>
        <h3>James Hesmoth</h3>
      </div>
      <div className='heading'>
        <h1>Dashboard</h1>
      </div>
      <div className='buttons_container'>
        <button className='dashboard_button' onClick={() => handleButtonClick('newsAndEvents')}><p>News and Events</p></button>
        <button className='dashboard_button' onClick={() => handleButtonClick('unapprovedRequests')}><p>Unapproved Requests</p></button>
        <button className='dashboard_button' onClick={() => handleButtonClick('archivedAmount')}><p>Archived Amount</p></button>
        <button className='dashboard_button' onClick={() => handleButtonClick('settings')}><p>Settings</p></button>
      </div>
      
      <div className='page_img'>
        <img src={images17} alt='logo' />
        <p>Requests</p>
        <img src={images18} alt='logo1' />
        <p>Archived Charities</p>
        <img src={images19} alt='logo2' />
        <p>Page Visit</p>
      </div>

      <div className='image_group_1'>
        <img src={images20} alt='profile' />
        <h2>Title</h2>
        <button className='admin_btn'>Approve</button>
        <button className='admin_btn'>Disapprove</button>
      </div>

      <div className='image_group_2'>
        <img src={images21} alt='profile' />
        <button className='admin_btn'>Approve</button>
        <button className='admin_btn'>Disapprove</button>
      </div>
    </div>
  );
};

export default Dashboard;
