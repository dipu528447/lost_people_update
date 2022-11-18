import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './UserDashboard.css'
const UserDashboard = props => {
    const { user } = props;
    console.log(user)
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 ml-6 p-2 shadow bg-base-100 rounded-box w-52">
                            <Link to="userDashboard/home"><li><label>Home</label></li></Link>
                            <Link to="userDashboard/postManagement"><li><label>Post Management</label></li></Link>
                            {user.email!=="admin@admin.com"&&<Link to="userDashboard/profile"><li><label>Profile</label></li></Link>}
                            <Link to="userDashboard/chat"><li><label className='text-left'>Chat</label></li></Link>
                            <Link to="/"><li><label onClick={() => localStorage.setItem('user', JSON.stringify(''))}>Logout</label></li></Link>
                        </ul>
                    </div>
                </div>
                <div className='navbar-center'>
                    <h1 className='text-xl text-secondary'>Lost Person Finder</h1>
                </div>
                {/* <div className="navbar-center">
                    <div className="tabs tabs-boxed">
                        <a className="tab tab-active">All</a>
                        <a className="tab">Dhaka</a>
                        <a className="tab">Chittagong</a>
                        <a className="tab">Sylhet</a>
                        <a className="tab">Khulna</a>
                        <a className="tab">Borishal</a>
                        <a className="tab">Rangpur</a>
                        <a className="tab">Rajshahi</a>
                    </div>
                </div> */}
                <div className="navbar-end">
                    <label className="normal-case text-xs m-2">Welcome <span className='text-secondary'>{user.displayName ? user.displayName : user.email}!!!</span></label>
                    <div className="avatar online">
                        <div className="w-8 rounded-full bg-white">
                            <img src={user.photoURL ? user.photoURL : "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png"} alt="not Found" />
                        </div>
                    </div>
                </div>

            </div>
            <Outlet></Outlet>
        </div>

    );
};

export default UserDashboard;