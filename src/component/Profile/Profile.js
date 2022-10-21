import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';

const Profile = ({ user }) => {
    const auth = getAuth();
    const [name, setName] = useState('');
    const [photoURL, setPhotoURL] = useState('')
    function updateAction() {
        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });

    }
    return (
        <div>
            <div className="avatar online">
                <div className="w-24 rounded-full bg-white">
                    <img src={user.photoURL ? user.photoURL : "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png"} alt="not found" />
                </div>
            </div>
            <div className='mx-auto w-3/4'>
                <form>
                    <div className="form-control">

                        <label className="input-group m-2">
                            <span className='w-1/4'>Full Name</span>
                            <input type="text" placeholder={user.displayName} className="input input-bordered w-full" required onBlur={event => setName(event.target.value)} />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>NID No</span>
                            <input type="text" placeholder="Your National ID No" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Present Address</span>
                            <input type="text" placeholder="Your Present Address" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Permanent Address</span>
                            <input type="text" placeholder="Your Permanent Address" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Contact</span>
                            <input type="number" placeholder="Your Contact no" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <button className="btn btn-primary w-1/4">Save</button>
                </form>
            </div>

        </div>
    );
};

export default Profile;