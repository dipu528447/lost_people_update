import { onSnapshot, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

const Home = props => {
    const { user } = props;
    const [preDistrict, setPreDistrict] = useState('All')
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loadedPost, setLoadedPost] = useState([]);
    useEffect(() => {
        setLoading(true);
        
        console.log('loading')
        const unsub = onSnapshot(
            collection(db, "post"),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                });
                setPosts(list);
                setLoading(false);
            }, (error) => {
                console.log(error);
            }
        );
        return () => {
            unsub();
        }
    }, [])
    function getActive(district) {
        console.log(preDistrict)
        const predis = document.getElementById(`${preDistrict}`)
        predis.classList.remove('tab-active');
        const dis = document.getElementById(`${district}`)
        dis.classList.add('tab-active')
        setPreDistrict(district);
        if (district === 'All') {
            setLoadedPost(posts)
        }
        else {
            setLoadedPost(posts.filter(item => item.division === district));
        }

    }
    return (

        <div>
            <div className="container mx-auto w-1/2">
                <div className="tabs">
                    <label className="tab tab-lifted tab-active" id="All" onClick={() => getActive("All")}>All</label>
                    <label className="tab tab-lifted" id="Dhaka" onClick={() => getActive("Dhaka")}>Dhaka</label>
                    <label className="tab tab-lifted" id="Chattogram" onClick={() => getActive("Chattogram")}>Chattogram</label>
                    <label className="tab tab-lifted" id="Rajshahi" onClick={() => getActive("Rajshahi")}>Rajshahi</label>
                    <label className="tab tab-lifted" id="Khulna" onClick={() => getActive("Khulna")}>Khulna</label>
                    <label className="tab tab-lifted" id="Barisal" onClick={() => getActive("Barisal")}>Barisal</label>
                    <label className="tab tab-lifted" id="Sylhet" onClick={() => getActive("Sylhet")}>Sylhet</label>
                    <label className="tab tab-lifted" id="Nowakhali" onClick={() => getActive("Nowakhali")}>Nowakhali</label>
                </div>
            </div>
            {loadedPost.map(post => {
                return (
                    <div className='container mx-auto my-12' key={post.id}>
                        <div className="card lg:card-side bg-base-100 shadow-xl lg:mx-24 p-10">
                            <figure><img src={post.lost_person_img} className='h-3/4 w-full border-8 border-secondary' alt="Album" /></figure>
                            <div className="card-body">
                                <h2 className="card-title lg:text-5xl"><span className="text-red-400">MISSING:</span> <span className="text-yellow-100">{post.name}</span></h2>
                                <p className='lg:text-xl text-left text-yellow-500'>Have you seen this person? </p>
                                <p className='lg:text-xl text-left'>Age: {post.age} </p>
                                <p className='lg:text-xl text-left'>Hair Color: {post.hair_color} </p>
                                <p className='lg:text-xl text-left'>Eye Color: {post.eye_ball_color} </p>
                                <p className='lg:text-xl text-left'>Last seen at: {post.last_location} </p>
                                <p className='lg:text-xl text-left'>Last weared dress: {post.last_weared_dress_details} </p>
                                <p className='lg:text-xl text-left'>Lost Date: {post.lost_date} </p>
                                <p className='lg:text-xl text-left'>Height: {post.height} Feet</p>
                                <p className='lg:text-xl text-left'>Weight: {post.weight} Kilo Gram</p>
                                <p className='lg:text-xl text-left'>Posted By: {post.email} </p>
                                {/* <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Show Details</button>
                                </div> */}
                            </div>
                        </div>
                    </div>

                );
            })}
        </div>
    );
};

export default Home;