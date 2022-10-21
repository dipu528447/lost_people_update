import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Link } from 'react-router-dom';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

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
                verifyEmail()
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
                    <span className="label-text">Enter Your Email</span>
                </label>
                <input type="email" placeholder="Type here" className="input input- input-primary w-full max-w-xs" onChange={event => setEmail(event.target.value)} />
                <label className="label">
                    <span className="label-text">Enter Your Password</span>
                </label>
                <input type="password" placeholder="Type here" className="input input- input-primary w-full max-w-xs" onChange={event => setPassword(event.target.value)} />
                <div className='flex'>
                    <button className="btn btn-info w-1/2 m-auto my-5" onClick={createUser}>Sign in</button>
                </div>
                <Link to='/'><p className='text-info'>Already have an account?</p></Link>
            </div>
        </div>
    );
};

export default Registration;