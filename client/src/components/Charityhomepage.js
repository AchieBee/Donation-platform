import React from "react";


function Charityhomepage() {
    const [getCharity, setCharity] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/charities')
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data.charities)) {
                    setCharity(data.posts);
                } else {
                    console.error('Data is not in the expected format:', data);
                }
            }, 2000);
    }, []);
    return (
        <div>
        <Navbar />
            <div className="charitiesm">
                {charities.map((charity) => (
                    <div key={charity.id} className="charity-itemm">
                        <div className="cimg">
                            <img src={charities.image_url} alt="charity_img" className="cimg" />
                        </div>
                        <div className="ptext">
                            <h2>{charities.name}</h2>
                            <p1> {charities.description}</p1>
                        </div>
                    </div>
                ))}
            </div>
            <form>
                <input type="text" placeholder="search..." value={search} onChange={handleChange} />
            </form>
            <Footer />  

        </div>

    );
}
export default Charityhomepage;