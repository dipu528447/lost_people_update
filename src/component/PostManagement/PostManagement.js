import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

const PostManagement = ({ user }) => {

    const initialState = {
        name: "",
        email: user?.email ? user.email : "",
        age: "",
        last_location: "",
        division: "",
        nid: "",
        present_address: "",
        parmanent_address: "",
        hair_color: "",
        eye_ball_color: "",
        last_weared_dress_details: "",
        blood_group: "",
        height: "",
        weight: "",
        lost_date: "",
        lost_person_img:""
    }
    const [data, setData] = useState(initialState);
    const { name, email, lost_person_img, age, last_location, division, permanent_address, present_address, hair_color, nid, eye_ball_color, last_weared_dress_details, blood_group, height, weight, lost_date } = data;
    const [file, setFile] = useState(lost_person_img);
    const [progress, setProgress] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [id,setId]=useState('');
    useEffect(()=>{
        
            setLoading(true);
            // console.log('loading')
            const unsub = onSnapshot(
                collection(db, "post"),
                (snapshot) => {
                    let list = [];
                    snapshot.docs.forEach((doc) => {
                        list.push({ id: doc.id, ...doc.data() })
                    });
                    console.log(list)
                    if(user.email==='admin@admin.com'){
                        setPosts(list);
                    }
                    else{
                        setPosts(list.filter(item=>item.email==user.email))
                    }
                    
                    setLoading(false);
                }, (error) => {
                    console.log(error);
                }
            );
            return () => {
                unsub();
            }

    },[])
    useEffect(()=>{
        id&& handleEdit();
    },[id])
    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress);
                switch (snapshot.state) {
                    case 'paused':
                        console.log('upload is paused');
                        break;
                    case 'running':
                        console.log('upload is running');
                        break;
                    default:
                        break;
                }
            }, (error) => {
                console.log(error)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                    setData((prev) => ({ ...prev, lost_person_img: downloadURL }));
                });
            })

        }
        file && uploadFile()
    }, [file])
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        console.log(e.target.name, e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // let errors = validate();
        // if (Object.keys(errors).length) return setErrors(errors);
        setIsSubmit(true);
        
        if(!id){
            if(!file){
                alert("please upload an image of losted person");
                return '';
            }
            try{
                await addDoc(collection(db, 'post'), {
                    ...data,
                    timeStamp: serverTimestamp(),
                });
            }
            catch(err){
                console.log(err)
            }

            
        }
        else{
            try{
                await updateDoc(doc(db, 'post',id), {
                    ...data,
                    timeStamp: serverTimestamp(),
                });
            }
            catch(err){
                console.log(err);
            }
           
        }
        
        alert('saved successfully');
        setData(initialState)
        setFile(null)
        setId('');
    }
    const handleEdit=async ()=>{
        const docRef=doc(db,"post",id)
        const snapshot=await getDoc(docRef);
        if(snapshot.exists()){
            setData({...snapshot.data()});
            
        }
    }
    const handleDelete=async(deleteID)=>{
       if(window.confirm("are you sure to delete this post?")){
        try{
            await deleteDoc(doc(db,"post",deleteID));
            setData(data.filter((d)=>d.id!==deleteID));
        }catch(err){
            console.log(err)
        }
       }

    }
    return (
        <div>
            <p>Please enter the details about your losted person</p>
            <div className='mx-auto w-3/4'>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">

                        <label className="input-group m-2">
                            <span className='w-1/4'>Full Name</span>
                            <input type="text" placeholder="Lost Person's Name (Example: Mr. ABC)" className="input input-bordered w-full" name='name' onChange={handleChange} value={name} required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Age</span>
                            <input type="number" placeholder="Lost Person's Age (Example: 20+)" className="input input-bordered w-full" required name='age' value={age} onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Last Location</span>
                            <input type="text" placeholder="Lost Person's Last Location (Example: Sanman Shopping Mall, GEC, Chattogram" className="input input-bordered w-full" required value={last_location} name='last_location' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/5'>Division</span>
                            <select className="select w-full max-w-lg input=bordered" onChange={handleChange} value={id?division:"Choose Division"} name='division'>
                                <option disabled >Choose Division</option>
                                <option value="Dhaka" >Dhaka</option>
                                <option value="Chattogram" >Chattogram</option>
                                <option value="Rajshahi" >Rajshahi</option>
                                <option value="Khulna" >Khulna</option>
                                <option value="Barisal" >Barishal</option>
                                <option value="Sylhet" >Sylhet</option>
                                <option value="Nowakhali">Nowakhali</option>
                            </select>
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>NID No</span>
                            <input type="text" placeholder="Lost Person's National ID No (Example: 2392949420)" className="input input-bordered w-full" required name='nid' onChange={handleChange} value={nid} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Present Address</span>
                            <input type="text" placeholder="Lost Person's Present Address (Example: house: 2/3, streetno: 1, CDA, Kornelhaat, Chattogram)" className="input input-bordered w-full" value={present_address} required name='present_address' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Permanent Address</span>
                            <input type="text" placeholder="Lost Person's Permanent Address (Example: house: 2/3, streetno: 1, CDA, Kornelhaat, Chattogram)" className="input input-bordered w-full" value={permanent_address} required name='permanent_address' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Hair Color</span>
                            <input type="text" placeholder="Lost Person's Hair Color (Example: Black)" className="input input-bordered w-full" required name='hair_color' onChange={handleChange} value={hair_color}/>
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Eye ball Color</span>
                            <input type="text" placeholder="Lost Person's Eye Ball Color (Example: Blue)" className="input input-bordered w-full" required name='eye_ball_color' onChange={handleChange} value={eye_ball_color} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Last weared dress details</span>
                            <input type="text" placeholder="Lost Person's Dress Details (Example: Yello shirt and blue pant with sandle)" className="input input-bordered w-full" value={last_weared_dress_details} required name='last_weared_dress_details' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Blood Group</span>
                            <input type="text" placeholder="Lost Person's Blood Group (Example: O positive)" className="input input-bordered w-full" required name='blood_group' onChange={handleChange} value={blood_group} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Height</span>
                            <input type="number" placeholder="Lost Person's Height (Example: 5 feet 5 inch)" className="input input-bordered w-full" required name='height' onChange={handleChange} value={height} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Weight</span>
                            <input type="number" placeholder="Lost Person's Weight (Example: 30kg)" className="input input-bordered w-full" required name='weight' onChange={handleChange}  value={weight}/>
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Lost Date</span>
                            <input type="text" placeholder="Lost Date (Example: 2022-12-12)" className="input input-bordered w-full" required name='lost_date' onChange={handleChange} value={lost_date} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Lost Person Image</span>
                            <input type="file" className="input w-full"  name='lost_person_img' onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                    </div>
                    <button className="btn btn-primary w-1/4" type='submit' disabled={progress !== null && progress < 100}>Save</button>
                </form>
            </div>

            <div className='container mx-auto'>
                <h1 className='text-4xl my-5'>{user.email==='admin@admin.com'?"User Posts": "My Post"}</h1>
                {posts.map((post,index)=>{
                    return(
                        <div className="card w-1/2 bg-base-100 shadow-xl container mx-auto my-10" key={index}>
                            <figure><img src={post.lost_person_img} alt="Shoes" /></figure>
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
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={()=>setId(post.id)}>Edit</button>
                                    <button className="btn btn-secondary" onClick={()=>handleDelete(post.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                

            </div>
        </div>
    );
};

export default PostManagement;