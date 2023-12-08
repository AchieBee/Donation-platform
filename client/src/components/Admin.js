import React, { useState, useEffect } from 'react';
import "./Admin.css";


function Admin() {
    const [approvalRequests, setApprovalRequests] = useState([]);
    const [selectedSection, setSelectedSection] = useState('requests');

    const [formData, setFormData] = useState({ news_title: '', news_image: '', news_text: '' });
    const [formData2, setFormData2] = useState({ fullname: '', email: '', image_url: '', _password_hash: '' });


    useEffect(() => {
        fetchData(selectedSection);
    }, [selectedSection]);

    const fetchData = (section) => {
        let apiUrl = '';
        switch (section) {
            case 'requests':
                apiUrl = 'http://127.0.0.1:5555/approval-requests';
                break;
            case 'news':
                apiUrl = 'http://127.0.0.1:5555/news';
                break;
            case 'admin':
                apiUrl = 'http://127.0.0.1:5555/admin';
                break;
            default:
                break;
        }

        if (apiUrl) {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    switch (section) {
                        case 'requests':
                            setApprovalRequests(data.requests);
                            break;
                        case 'news':
                            // Handle data for the 'news' section if needed
                            break;
                        case 'admin':
                            // Handle data for the 'admin' section if needed
                            break;
                        // Add more cases for other sections as needed
                        default:
                            break;
                    }
                })
                .catch(error => console.error(error));
        }
    };


    const handleApprove = (userId) => {
        fetch(`http://127.0.0.1:5555/approval-requests/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'approve' }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update state after successful API call
                setApprovalRequests((prevRequests) =>
                    prevRequests.filter((request) => request.userId !== userId)
                );
                console.log(data);
            })
            .catch((error) => console.error(error));
    };

    const handleReject = (userId) => {
        fetch(`http://127.0.0.1:5555/approval-requests/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'delete' }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update state after successful API call
                setApprovalRequests((prevRequests) =>
                    prevRequests.filter((request) => request.userId !== userId)
                );
                console.log(data);
            })
            .catch((error) => console.error(error));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleAddNews = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5555/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data.message);
            if (response.ok) {
                setFormData({
                    news_title: '', news_image: '', news_text: ''});
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };
    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setFormData2({ ...formData2, [name]: value });
    };
    const handleAddAdmin = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5555/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData2),
            });

            const data = await response.json();
            console.log(data.message);
            if (response.ok) {
                setFormData2({
                    fullname: '', email: '', image_url: '',password: ''
                });
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <div className="admin-profile">
                    {/* Profile picture and name */}
                    <img src="profile-picture.jpg" alt="Profile" />
                    <p className="admin-name">Admin</p>
                    <p className="admin-tag">Admin</p>
                </div>
                <div className="admin-navigation">
                    <p onClick={() => setSelectedSection('dashboard')}><i className="fas fa-tachometer-alt"></i> Dashboard</p>
                    <p onClick={() => setSelectedSection('requests')}><i className="fas fa-tasks"></i> Requests</p>
                    <p onClick={() => setSelectedSection('news')}><i className="fas fa-newspaper"></i> News & Events</p>
                    <p onClick={() => setSelectedSection('admin')}><i className="fas fa-user"></i> Add Account</p>
                    <p onClick={() => setSelectedSection('settings')}><i className="fas fa-cogs"></i> Settings</p>
                </div>
            </div>

            <div className="admin-content">
                <div className="admin-topbar">
                    <input type="text" placeholder="Search..." />
                </div>
                <div className="admin-icons">
                    <span className="notification-icon">&#128276;</span>
                    <span className="account-icon">&#128100;</span>
                </div>
                <div className="admin-main3">
                    {/* Content based on selected section */}
                    {selectedSection === 'requests' && (
                        <div className="admin-requests">
                            {approvalRequests.length > 0 && (
                                <div className="approval-requests">
                                    <h3>Account Approval Requests</h3>
                                    {approvalRequests.map(request => (
                                        <div key={request.userId} className="approval-request">
                                            <p>{request.full_name} ({request.userType}) {request.email}</p>
                                            <button onClick={() => handleApprove(request.userId)}>Approve</button>
                                            <button onClick={() => handleReject(request.userId)}>Reject</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {selectedSection === 'news' && (
                        <div>
                            <h3>Add News</h3>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <label>Title:</label>
                                <input type="text" name="news_title" value={formData.news_title} onChange={handleChange} />

                                <label>Text:</label>
                                <textarea name="news_image" value={formData.news_image} onChange={handleChange} />

                                <label>Image URL:</label>
                                <input type="text" name="news_text" value={formData.news_text} onChange={handleChange} />
                                <button onClick={(e) => handleAddNews(e)}>Add News</button>
                            </form>
                        </div>
                    )}

                    {selectedSection === 'admin' && (
                        <div>
                            <h3>Add Admin Account</h3>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <label>Full Name:</label>
                                <input type="text" name="fullname" value={formData2.fullname} onChange={handleChange2} />

                                <label>Email:</label>
                                <input type="email" name="email" value={formData2.email} onChange={handleChange2} />

                                <label>Image URL:</label>
                                <input type="text" name="image_url" value={formData2.image_url} onChange={handleChange2} />

                                <label>Password:</label>
                                <input type="password" name="password" value={formData2.password} onChange={handleChange2} />
                                <button onClick={(e) => handleAddAdmin(e)}>Add Admin</button>
                            </form>
                        </div>
                    )}

                    {/* Add more sections as needed */}
                </div>
            </div>
        </div>
    );
}

export default Admin;
