import React, { useState, useEffect } from 'react';
import './News.css'
import Navbar from './Navbar';
import Footer from './Footer';


function News(){
    const [getnews, setnews] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/news')
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data.admin)) {
                    setnews(data.admin);
                } else {
                    console.error('Data is not in the expected format:', data);
                }
            }, 2000);
    }, []);
  return (
    <div className='news'>
        <Navbar />
        <div>
            <div>
                {getnews.map((news) => (
                    <div key={news.id} className="nmain">
                        <div className="nimg">
                            <img src={news.news_image} alt="news_img" />
                        </div>
                        <div className="ntxt">
                            <h2>{news.news_title}</h2>
                            <p> {news.news_text}</p>
                            <h5>{news.posted_at}</h5>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
        <Footer />
    </div>
  )
}

export default News