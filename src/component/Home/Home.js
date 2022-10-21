import React, { useState } from 'react';

const Home = props => {
    const { user } = props;
    const [preDistrict, setPreDistrict] = useState('All')
    function getActive(district) {
        console.log(preDistrict)
        const predis = document.getElementById(`${preDistrict}`)
        predis.classList.remove('tab-active');
        const dis = document.getElementById(`${district}`)
        dis.classList.add('tab-active')
        setPreDistrict(district);
    }
    return (
        <div>
            <div className="container mx-auto w-1/2">
                <div className="tabs">
                    <a className="tab tab-lifted tab-active" id="All" onClick={() => getActive("All")}>All</a>
                    <a className="tab tab-lifted" id="Dhaka" onClick={() => getActive("Dhaka")}>Dhaka</a>
                    <a className="tab tab-lifted" id="Chattogram" onClick={() => getActive("Chattogram")}>Chattogram</a>
                    <a className="tab tab-lifted" id="Rajshahi" onClick={() => getActive("Rajshahi")}>Rajshahi</a>
                    <a className="tab tab-lifted" id="Khulna" onClick={() => getActive("Khulna")}>Khulna</a>
                    <a className="tab tab-lifted" id="Barisal" onClick={() => getActive("Barisal")}>Barisal</a>
                    <a className="tab tab-lifted" id="Sylhet" onClick={() => getActive("Sylhet")}>Sylhet</a>
                    <a className="tab tab-lifted" id="Nowakhali" onClick={() => getActive("Nowakhali")}>Nowakhali</a>
                </div>
            </div>

        </div>
    );
};

export default Home;