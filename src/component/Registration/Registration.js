import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { db, storage } from '../../firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [permanent_address, setPermanentAddress] = useState('');
    const [present_address, setPresentAddress] = useState('');
    const [pic, setPic] = useState('');
    const [number, setNumber] = useState('');
    const [nid,setNID]=useState('');
    const [file, setFile] = useState('');
    const [data,setData]=useState();
    const [progress, setProgress] = useState(null);
    const auth = getAuth();
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate=useNavigate();
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
                    setPic(()=> ({  photo: downloadURL }));
                });
            })

        }
        file && uploadFile()
    }, [file])
    const handleSubmit = async () => {
        // e.preventDefault();
        // let errors = validate();
        // if (Object.keys(errors).length) return setErrors(errors);
        
        setIsSubmit(true);
        if(!file){
            alert("please upload an image of profile");
            return '';
        }
        try{
            const {photo}=pic;
            await addDoc(collection(db, 'users'), {
                email, displayName, number, password,photoURL:photo,present_address:"",permanent_address:"",nid,
                timeStamp: serverTimestamp(),
            });
        }
        catch(err){
            console.log(err)
        }
        
        
    }
    function verifyEmail() {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert("please check your mail inbox or spam folder and click on verify button")
            });
    }
    // create user with email password
    function createUser() {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                handleSubmit();
                verifyEmail();
                console.log(user);
                
            })
            .catch((error) => {

                const errorMessage = error.message;
                alert(errorMessage);
            });
    }


    return (
        <div>
            <h1 className='text-center text-7xl text-yellow-50 py-12'>Lost Person Finder</h1>
            <h1 className='text-center text-3xl text-yellow-50 py-4'>Registration Form</h1>
            <div className="form-control w-full max-w-xs m-auto py-4">
                
                <label className="label">
                    <span className="label-text">Enter Your Name</span>
                </label>
                <input type="text" placeholder="Type here" className="input input- input-primary w-full max-w-xs" onChange={event => setDisplayName(event.target.value)} />
                
                <label className="label">
                    <span className="label-text">Enter Your Email address</span>
                </label>
                <input type="email" placeholder="Type here" className="input input- input-primary w-full max-w-xs" onChange={event => setEmail(event.target.value)} />
                
                <label className="label">
                    <span className="label-text">Enter Your phone number</span>
                </label>
                <input type="number" placeholder="Type here" className="input input- input-primary w-full max-w-xs" onChange={event => setNumber(event.target.value)} />
                <label className="label">
                    <span className="label-text">Enter Your NID card</span>
                </label>
                <input type="text" placeholder="Type here" className="input input- input-primary w-full max-w-xs" onChange={event => setNID(event.target.value)} />
                
                <label className='label'>Photo</label>
                <input type="file" className="input w-full"  name='photo' onChange={(e) => setFile(e.target.files[0])} />
                
                
                <label className="label">
                    <span className="label-text">Enter Your Password</span>
                </label>
                
                <input type="password" placeholder="Type here" className="input input- input-primary w-full max-w-xs" onChange={event => setPassword(event.target.value)} />
                <label className="label">
                    <span className="label-text">Confirm Password</span>
                </label>
                
                <input type="password" placeholder="Type here" className="input input- input-primary w-full max-w-xs"  />
                <div className='flex'>
                    <button className="btn btn-info w-1/2 m-auto my-5" onClick={createUser}>Sign in</button>
                </div>
                <Link to='/'><p className='text-info'>Already have an account?</p></Link>
            </div>
        </div>
    );
};

export default Registration;