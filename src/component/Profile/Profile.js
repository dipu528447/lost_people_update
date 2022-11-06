import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { db, storage } from './../../firebase'
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'

const Profile = ({ user }) => {

    const initialState = {
        displayeName: "",
        email: user.email,
        present_address: "",
        permanent_address: "",
        nid: "",
        contact: ""

    }
    const [data, setData] = useState(initialState);
    const { displayName, email, permanent_address, present_address, contact, nid } = data;
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
                    setData((prev) => ({ ...prev, profile_pic: downloadURL }));
                });
            })

        }
        file && uploadFile()
    }, [file])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // let errors = validate();
        // if (Object.keys(errors).length) return setErrors(errors);
        setIsSubmit(true);
        await addDoc(collection(db, 'users'), {
            ...data,
            timeStamp: serverTimestamp(),
        });
        alert('saved successfully');
    }
    return (
        <div>
            <div className="avatar online">
                <div className="w-24 rounded-full bg-white">
                    <img src={user.photoURL ? user.photoURL : "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png"} alt="not found" />
                </div>
            </div>
            <div className='mx-auto w-3/4'>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="input-group m-2">
                            <span className='w-1/4'>Full Name</span>
                            <input type="text" placeholder={user.displayName} className="input input-bordered w-full" name='displayName' onChange={handleChange} required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>NID No</span>
                            <input type="text" placeholder={user?.nid ? user.nid : "Your National ID No"} className="input input-bordered w-full" onChange={handleChange} name='nid' required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Present Address</span>
                            <input type="text" placeholder={user?.present_address ? user.present_address : "Your Present Address"} onChange={handleChange} className="input input-bordered w-full" required name='present_address' />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Permanent Address</span>
                            <input type="text" placeholder={user?.permanent_address ? user.permanent_address : "Your Permanent Address"} onChange={handleChange} className="input input-bordered w-full" name='permanent_address' required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Contact</span>
                            <input type="number" placeholder={user?.contact ? user.contact : "Your Contact Number"} className="input input-bordered w-full" onChange={handleChange} name='contact' required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Change Profile Image</span>
                            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="input w-full" name='profile_pic' required />
                        </label>
                    </div>
                    <button className="btn btn-primary w-1/4" type="submit" disabled={progress !== null && progress < 100}>Update Profile</button>
                </form>
            </div>

        </div>
    );
};

export default Profile;