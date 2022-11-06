import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
        lost_date: ""
    }
    const [data, setData] = useState(initialState);
    const { name, email, age, last_location, division, parmanent_address, present_address, hair_color, nid, eye_ball_color, last_weared_dress_details, blood_group, height, weight, lost_date } = data;
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

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
        await addDoc(collection(db, 'post'), {
            ...data,
            timeStamp: serverTimestamp(),
        });
        alert('saved successfully');
    }
    return (
        <div>
            <p>Please enter the details about your losted person</p>
            <div className='mx-auto w-3/4'>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">

                        <label className="input-group m-2">
                            <span className='w-1/4'>Full Name</span>
                            <input type="text" placeholder="Lost Person's Name (Example: Mr. ABC)" className="input input-bordered w-full" name='name' onChange={handleChange} required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Age</span>
                            <input type="number" placeholder="Lost Person's Age (Example: 20+)" className="input input-bordered w-full" required name='age' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Last Location</span>
                            <input type="text" placeholder="Lost Person's Last Location (Example: Sanman Shopping Mall, GEC, Chattogram" className="input input-bordered w-full" required name='last_location' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/5'>Division</span>
                            <select className="select w-full max-w-lg input=bordered" onChange={handleChange} name='division'>
                                <option disabled selected>Choose Division</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chattogram">Chattogram</option>
                                <option value="Rajshahi">Rajshahi</option>
                                <option value="Khulna">Khulna</option>
                                <option value="Barisal">Barishal</option>
                                <option value="Sylhet">Sylhet</option>
                                <option value="Nowakhali">Nowakhali</option>
                            </select>
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>NID No</span>
                            <input type="text" placeholder="Lost Person's National ID No (Example: 2392949420)" className="input input-bordered w-full" required name='nid' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Present Address</span>
                            <input type="text" placeholder="Lost Person's Present Address (Example: house: 2/3, streetno: 1, CDA, Kornelhaat, Chattogram)" className="input input-bordered w-full" required name='present_address' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Permanent Address</span>
                            <input type="text" placeholder="Lost Person's Permanent Address (Example: house: 2/3, streetno: 1, CDA, Kornelhaat, Chattogram)" className="input input-bordered w-full" required name='permanent_address' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Hair Color</span>
                            <input type="text" placeholder="Lost Person's Hair Color (Example: Black)" className="input input-bordered w-full" required name='hair_color' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Eye ball Color</span>
                            <input type="text" placeholder="Lost Person's Eye Ball Color (Example: Blue)" className="input input-bordered w-full" required name='eye_ball_color' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Last weared dress details</span>
                            <input type="text" placeholder="Lost Person's Dress Details (Example: Yello shirt and blue pant with sandle)" className="input input-bordered w-full" required name='last_weared_dress_details' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Blood Group</span>
                            <input type="text" placeholder="Lost Person's Blood Group (Example: O positive)" className="input input-bordered w-full" required name='blood_group' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Height</span>
                            <input type="number" placeholder="Lost Person's Height (Example: 5 feet 5 inch)" className="input input-bordered w-full" required name='height' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Weight</span>
                            <input type="number" placeholder="Lost Person's Weight (Example: 30kg)" className="input input-bordered w-full" required name='weight' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Lost Date</span>
                            <input type="text" placeholder="Lost Date (Example: 2022-12-12)" className="input input-bordered w-full" required name='lost_date' onChange={handleChange} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Lost Person Image</span>
                            <input type="file" className="input w-full" required name='lost_person_img' onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                    </div>
                    <button className="btn btn-primary w-1/4" type='submit' disabled={progress !== null && progress < 100}>Save</button>
                </form>
            </div>
        </div>
    );
};

export default PostManagement;