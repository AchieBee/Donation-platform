import React, { useState, useEffect } from 'react';
import "./Admin.css";


function Admin() {
    const [approvalRequests, setApprovalRequests] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/approval-requests')
            .then(response => response.json())
            .then(data => {
                setApprovalRequests(data.requests);
            })
            .catch(error => console.error(error));
    }, []);

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
                    <p><i className="fas fa-tachometer-alt"></i> Dashboard</p>
                    <p><i className="fas fa-tasks"></i> Requests</p>
                    <p><i className="fas fa-newspaper"></i> News & Events</p>
                    <p><i className="fas fa-user"></i> Add Account</p>
                    <p><i className="fas fa-cogs"></i> Settings</p>
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
                <div>
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

                    <div>
                        
                    </div>
                
                </div>
            </div>
        </div>
    );
}

export default Admin;
