import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';
import "./Admin.css";


function Admin() {
    const navigate = useNavigate();
    const [approvalRequests, setApprovalRequests] = useState([]);
    const [selectedSection, setSelectedSection] = useState('dashboard');
    const [formData, setFormData] = useState({ news_title: '', news_image: '', news_text: '' });
    const [formData2, setFormData2] = useState({ fullname: '', email: '', image_url: '', _password_hash: '' });
    const [admin, setAdmin] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5555/adminprofile');
                const data = await response.json();
                setAdmin(data);
            } catch (error) {
                console.error('Error fetching admin profile:', error);
            }
        };

        fetchAdminProfile();
    }, []);
    const handleLogout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5555/logout', {
                method: 'GET',
            });

            if (response.ok) {
                console.log('Logout successful');
                setAdmin(null);
                navigate('/login');
            } else {
                console.error('Error logging out:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    useEffect(() => {
        fetchData(selectedSection);
    }, [selectedSection]);
   

    const state = {
        series: [
            {
                name: 'Requests',
                type: 'column',
                data: [100, 200, 250, 150, 250, 280, 380, 460],
            },
            {
                name: 'Deleted',
                type: 'column',
                data: [10, 30, 31, 40, 41, 49, 65, 85],
            },
            {
                name: 'Approved',
                type: 'line',
                data: [200, 290, 370, 360, 440, 450, 500, 580],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
                stacked: false,
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: [1, 1, 4],
            },
            title: {
                text: 'Requests Analysis (Mon - Fri)',
                align: 'left',
                offsetX: 110,
            },
            xaxis: {
                categories: [],
            },
            yaxis: [
                {
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#008FFB',
                    },
                    labels: {
                        style: {
                            colors: '#008FFB',
                        },
                    },
                    title: {
                        text: 'Requests',
                        style: {
                            color: '#008FFB',
                        },
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
                {
                    seriesName: 'Income',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#00E396',
                    },
                    labels: {
                        style: {
                            colors: '#00E396',
                        },
                    },
                    title: {
                        text: 'Operations (per hr)',
                        style: {
                            color: '#00E396',
                        },
                    },
                },
                {
                    seriesName: 'Revenue',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#FEB019',
                    },
                    labels: {
                        style: {
                            colors: '#FEB019',
                        },
                    },
                    title: {
                        text: 'Hours put in(hr)',
                        style: {
                            color: '#FEB019',
                        },
                    },
                },
            ],
            tooltip: {
                fixed: {
                    enabled: true,
                    position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                    offsetY: 30,
                    offsetX: 60,
                },
            },
            legend: {
                horizontalAlign: 'left',
                offsetX: 40,
            },
        },
    };
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    const fetchData = (section) => {
        let apiUrl = '';
        switch (section) {
            case 'dashboard':
                apiUrl = 'http://127.0.0.1:5555/dashboard';
                break;
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
            fetch(`${apiUrl}?search=${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    switch (section) {
                        case 'dashboard':
                            break;
                        case 'requests':
                            setApprovalRequests(data.requests);
                            break;
                        case 'news':
                            break;
                        case 'admin':
                            break;
                        default:
                            break;
                    }
                })
                .catch(error => console.error(error));
        }
    };
    const filterRequests = () => {
        return approvalRequests.filter(
            (request) =>
                request.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                request.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
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
                {admin && (
                    <div>
                    <img src={admin.image_url} alt="Admin Avatar" />
                    <p> {admin.fullname}</p>
                    </div>
                )}
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
                    <span className="account-icon" onClick={handleLogout}>
                        &#128100; Logout</span>
                </div>
                <div className="admin-main3">
                    {selectedSection === 'dashboard' && (
                        <div className='dashboard'>
                            <div className='dash'>
                            <div className="dashboard-item1">
                                <h4>Total Requests</h4>
                                    <span className="icon">&#9878;</span>
                                <p>{approvalRequests.length}</p>
                            </div>
                            <div className="dashboard-item2">
                                <h4>Today's Requests</h4>
                                    <span className="icon">&#9923;</span>
                                <p>{approvalRequests.length}</p>
                            </div>
                            </div>
                            <div className='dash2'>
                            <div className="dashboard-item3">
                            <h4>Request Projection</h4> 
                                <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
                            </div>
                            <div className="dashboard-item4">
                                <h4>Recent activity</h4>
                                <p></p>
                            </div>
                            </div>
                        </div>
                    )}
                    {selectedSection === 'requests' && (
                        <div className="admin-requests">
                            {filterRequests().length > 0 && (
                                <div className="approval-requests">
                                    <h3>Account Approval Requests</h3>
                                    {filterRequests().map((request) => (
                                        <div key={request.userId} className="approval-request">
                                            <div>{request.image_url}</div>
                                            <p>{request.full_name} {request.email}</p>
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
                            <h2>Add News</h2>
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
                            <h2>Add Admin Account</h2>
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
                </div>
            </div>
        </div>
    );
}

export default Admin;
