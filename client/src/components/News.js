import React from 'react'
import images10 from '../components/images/Poor African children keeping their hands up - asking for food_ Many.jpeg'
import images11 from '../components/images/Peace be upon you - السلام عليكم.jpeg'
import images12 from '../components/images/Worst Drought in 60 Years Brings Famine To Millions in Somalia, Kenya, and Ethiopia_ Aid is Blocked.jpeg'
import images13 from '../components/images/KOMMAAR Photo.jpeg'
import images14 from '../components/images/African Boy at Lake Victoria Entebbe Uganda.jpeg'
import './News.css'
import Footer from './Footer'


const News = () => {
  return (
    <div className='news_updates'>
        <div className='news_img'>
            <img src={images10} alt='hands of people'/>
            <h4>GIVING HOPE.</h4>
            <p>Amidst the adversities faced by many, the campaign strives to be a beacon of light, offering a helping hand to children in vulnerable situations and the needy in our communities. 
                The focus is not only on addressing immediate needs but also on fostering a sense of hope for a brighter future.</p>
                <span><a href="news1-full-article.html" className="read_more_button">Read More</a></span>
        </div>
        <div className='news_img_1'>
        
            <h4>SHOWING LOVE TO THE NEEDY</h4>
            <p>Amidst the adversities faced by many, the campaign strives to be a beacon of light, offering a helping hand to children in vulnerable situations and the needy in our communities. 
                The focus is not only on addressing immediate needs but also on fostering a sense of hope for a brighter future.</p>
            <img src={images11} alt='crying baby'/>
            <span><a href="news1-full-article.html" className="read_more_button">Read More</a></span>
        </div>
        <div className='news_img_2'>
            <img src={images12} alt=' a dying child'/>
            <h4>FEEDING HUNDRED PEOPLE, JUST ONE</h4>
            <p>Amidst the adversities faced by many, the campaign strives to be a beacon of light, offering a helping hand to children in vulnerable situations and the needy in our communities. 
                The focus is not only on addressing immediate needs but also on fostering a sense of hope for a brighter future.</p>  
                <span><a href="news1-full-article.html" className="read_more_button">Read More</a></span>
        </div>
        <div className='news_img_3'>
            <h4>HAPPINES BRINGS JOY TO CHILDREN</h4>
            <p>Amidst the adversities faced by many, the campaign strives to be a beacon of light, offering a helping hand to children in vulnerable situations and the needy in our communities. 
                The focus is not only on addressing immediate needs but also on fostering a sense of hope for a brighter future.</p>   
                <img src={images13} alt=' happy child'/>
                <span><a href="news1-full-article.html" className="read_more_button">Read More</a></span>
        </div> 
        <div className='news_img_4'>
        <img src={images14} alt='praying'/>
            <h4>PRAYING BRING HAPPINES AND GIVE PEACE TO CHILDREN</h4>
            <p>Amidst the adversities faced by many, the campaign strives to be a beacon of light, offering a helping hand to children in vulnerable situations and the needy in our communities. 
                The focus is not only on addressing immediate needs but also on fostering a sense of hope for a brighter future.</p>
                <span><a href="news1-full-article.html" className="read_more_button">Read More</a></span>
        </div>
        <div>
            <Footer/>
        </div>
        </div>
  )
}

export default News