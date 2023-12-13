import React, {useState} from 'react';
import './Gallery.css';
import Gallery1 from '../components/Gallery/_(1).jpeg';
import Gallery2 from '../components/Gallery/African Boy at Lake Victoria Entebbe Uganda.jpeg';
import Gallery3 from '../components/Gallery/Child labour - Child Labour in India.jpeg';
import Gallery4 from '../components/Gallery/KOMMAAR Photo.jpeg';
import Gallery5 from '../components/Gallery/Lavazza calendar 2015_ The Earth Defenders by Steve McCurry.jpeg';
import Gallery6 from '../components/Gallery/Recitar Poesias_.jpeg';
import Gallery7 from '../components/Gallery/touchn2btouched.jpeg';
import Gallery8 from '../components/Gallery/uganda, africa, poverty, young, black, life, child, poor, children, rural, village.jpeg'
import Gallery9 from '../components/Gallery/Ulingan, Tondo - My Toy from mommy Mui Lai.jpeg'
import Gallery10 from '../components/Gallery/We are happy to be in partnership with some great charities here at Bsogood_.jpeg'
import Gallery11 from '../components/Gallery/Worst Drought in 60 Years Brings Famine To Millions in Somalia, Kenya, and Ethiopia_ Aid is Blocked.jpeg'


const Gallery = () => {

    let data = [
        { id: 1, imgsrc: Gallery1 },
        { id: 2, imgsrc: Gallery2 },
        { id: 3, imgsrc: Gallery3 },
        { id: 4, imgsrc: Gallery4 },
        { id: 5, imgsrc: Gallery5 },
        { id: 6, imgsrc: Gallery6 },
        { id: 7, imgsrc: Gallery7 },
        { id: 7, imgsrc: Gallery8 },
        { id: 7, imgsrc: Gallery9 },
        { id: 7, imgsrc: Gallery10 },
        { id: 7, imgsrc: Gallery11 }
    ];
    const [model,setModel] = useState (true);
    const [tempimgSrc,setTempimgSrc] = useState ('');
    const getting = (imgsrc) =>{
        setTempimgSrc(imgsrc);
        setModel(true)
    }

    return (
        <div className = {model? 'model open' : 'model'}>
            <img src = {tempimgSrc}/>
        <div className='gallery'>
            <h2> Image Gallery </h2>
            <div className='gallery_img'>
                {data.map((item, index) => (
                    <div className='pics' key={index} onClick = {() =>getting(item.imgsrc)}>
                        <img src={item.imgsrc} alt={`gallery-${item.id}`} style={{ width: '100%' }} />
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default Gallery
