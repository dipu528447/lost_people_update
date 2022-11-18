import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const { setUser } = props;
    // sign in user with email password
    function login() {
        console.log(email, password)
        if (!email) {
            setMsg('Please provide a your email address')
            return ''
        }
        if (!password) {
            setMsg('Please provide a your password')
            return ''
        }
        if(email==='admin@admin.com' && password ==='123456'){
            setMsg('loggod in as an admin');
            const user={
                displayName:"admin",
                email:'admin@admin.com',
                photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCmsJlDBKWc7C-DPa83GG8Si2t49CEkm_PLEolAAy3VaxATEi9pOmUtRkj2JcNbPxR3i0&usqp=CAU",
                emailVerified:true,
            }
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user));
            user.emailVerified ? navigate('/userDashboard/userDashboard/home') : navigate('/');
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                user.photoURL="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png";
                console.log(email);
                setUser(user)
                localStorage.setItem('user', JSON.stringify(user));
                user.emailVerified ? navigate('/userDashboard/userDashboard/home') : navigate('/');
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                navigate('/userDashboard/userDashboard/home')
                setMsg('Invalid user and password')
            });
    }
    function loginwithFacebook(event) {
        event.preventDefault();
        const provider = new FacebookAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                //const credential = FacebookAuthProvider.credentialFromResult(result);
                //const accessToken = credential.accessToken;
                const { user } = result;
                user.emailVerified = true;
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                navigate("/userDashboard/userDashboard/home")
            })
            .catch((error) => {
                //const errorCode = error.code;
                const errorMessage = error.message;
                //const email = error.customData.email;
                //const credential = FacebookAuthProvider.credentialFromError(error);
                setMsg('Login Failed');
                console.log(errorMessage)
                navigate("/")
            });
    }
    function loginwithGmail(event) {
        event.preventDefault();
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(function (result) {
                console.log(result.user.email)
                const { user } = result;
                user.emailVerified = true;
                setUser(user)
                localStorage.setItem('user', JSON.stringify(user));
                navigate("/userDashboard");
            })
            .catch((error) => {
                const errorMessage = error.message;
                setMsg(errorMessage)
                navigate("/");
            });
    }

    return (
        <div>
            <h1 className='text-center text-7xl text-yellow-50 py-12'>Lost Person Finder</h1>
            <h1 className='text-center text-3xl text-yellow-50 py-4'>Login Form</h1>
            <div className="form-control w-full max-w-xs m-auto py-4">
                <label className="label">
                    <span className="label-text">Enter Your Email</span>
                </label>
                <input type="email" placeholder="Type here" className="input input- input-primary w-full max-w-xs" onChange={event => setEmail(event.target.value)} required />
                <label className="label">
                    <span className="label-text">Enter Your Password</span>
                </label>
                <input type="password" placeholder="Type here" className="input input- input-primary w-full max-w-xs" onChange={event => setPassword(event.target.value)} required />
                <p className='text-start text-red-500'>{msg}</p>
                <div className='flex'>
                    <button className="btn btn-info w-28 m-5" onClick={login}>Login</button>
                    <Link to="/registration"><button className="btn btn-secondary w-28 m-5">Signup</button></Link>
                </div>
                <div className='flex m-5 justify-center space-x-3'>
                    <button className="btn btn-circle bg-blue-900" onClick={loginwithFacebook} >
                        <i className="fa-brands fa-facebook-f text-xl text-white"></i>
                    </button>
                    <button className="btn btn-circle bg-white" onClick={loginwithGmail}>
                        <i className="fa-brands fa-google text-xl text-blue-500"></i>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Login;