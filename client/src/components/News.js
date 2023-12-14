import React, { useState, useEffect } from 'react';
import './News.css'
import Navbar from './Navbar';
import Footer from './Footer';


function News(){
    const [getnews, setnews] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/news')
            .then((response) => response.json())
            .then((data) => setnews(data.news));
    }, []);
  return (
    <div className='news'>
        <Navbar />
        <div>
            <div>
                <h2 className='netitle'>News &Events</h2>
                {getnews.map((news) => (
                    <div key={news.id} className="nemain">
                        <div className="nimg">
                            <img src={news.news_image} alt="nimg" className="nimg" />
                        </div>
                        <div className="ntxt">
                            <h2>{news.news_title}</h2>
                            <p2 className='netxt'> {news.news_text}</p2>
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