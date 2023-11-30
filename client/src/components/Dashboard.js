import React from 'react';
import images16 from '../components/images/Account, user, interface, profile icon - Free download.jpeg';
import images17 from '../components/images/failure.png'
import images18 from '../components/images/tracker.png'
import images19 from '../components/images/arrow.png'
import images20 from '../components/images/Child labour - Child Labour in India(4).jpeg'
import images21 from '../components/images/Child labour - Child Labour in India(4).jpeg'
import './Dashboard.css';


const Dashboard = () => {
  return (
    <div className='dash_container'>
      <img src={images16} alt="crying child" />
      <div className='name'>
        <h3>James hesmoth</h3>
      </div>
      <div className='heading'>
        <h1>Dashboard</h1>
      </div>
      <div className='buttons_container'>
        <button className='dashboard_button'><p>News and Eventsdashboard_button</p></button>
        <button className='dashboard_button'><p>Unapproved Requests</p></button>
        <button className='dashboard_button'><p>Archived Amount</p></button>
        <button className='dashboard_button'><p>Settings</p></button>
      </div>
      
      <div className='page_img'>
        <img src={images17} alt= 'logo'/>
        <p>Requests</p>
        <img src={images18} alt='logo1'/>
        <p>Archieved charities</p>
        <img src={images19} alt='logo2' />
        <p>Page visit</p>
      </div>
      
      <div className='image_group_1'>
        
        <img src={images20} alt='profile'/>
        <h2>Tittle</h2>
        <button className='admin_btn'>Approve</button>
        <button className='admin_btn'>Disapprove</button>
      </div>

      <div className='image_group_2'>
        <img src={images21} alt='profile'/>
        <button className='admin_btn'>Approve</button>
        <button className='admin_btn'>Disapprove</button>
      </div>
    </div>
  );
};

export default Dashboard;
