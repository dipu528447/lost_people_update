import React from 'react';

const PostManagement = ({ user }) => {
    return (
        <div>
            <p>Please enter the details about your losted person</p>

            <div className="avatar mt-10">
                <div className="w-96 rounded">
                    <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png" alt="not found" />
                </div>
            </div>
            <div className='mx-auto w-3/4'>
                <form>
                    <div className="form-control">

                        <label className="input-group m-2">
                            <span className='w-1/4'>Full Name</span>
                            <input type="text" placeholder="Lost Person's Name (Example: Mr. ABC)" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Age</span>
                            <input type="number" placeholder="Lost Person's Age (Example: 20+)" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Last Location</span>
                            <input type="text" placeholder="Lost Person's Last Location (Example: Sanman Shopping Mall, GEC, Chattogram" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>NID No</span>
                            <input type="text" placeholder="Lost Person's National ID No (Example: 2392949420)" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Present Address</span>
                            <input type="text" placeholder="Lost Person's Present Address (Example: house: 2/3, streetno: 1, CDA, Kornelhaat, Chattogram)" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Permanent Address</span>
                            <input type="text" placeholder="Lost Person's Permanent Address (Example: house: 2/3, streetno: 1, CDA, Kornelhaat, Chattogram)" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Hair Color</span>
                            <input type="text" placeholder="Lost Person's Hair Color (Example: Black)" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Eye ball Color</span>
                            <input type="text" placeholder="Lost Person's Eye Ball Color (Example: Blue)" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Last weared dress details</span>
                            <input type="text" placeholder="Lost Person's Dress Details (Example: Yello shirt and blue pant with sandle)" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Blood Group</span>
                            <input type="text" placeholder="Lost Person's Blood Group (Example: O positive)" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Height</span>
                            <input type="number" placeholder="Lost Person's Height (Example: 5 feet 5 inch)" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Weight</span>
                            <input type="number" placeholder="Lost Person's Weight (Example: 30kg)" className="input input-bordered w-full" required />
                        </label>
                        <label className="input-group m-2">
                            <span className='w-1/4'>Lost Date</span>
                            <input type="text" placeholder="Lost Date (Example: 2022-12-12)" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <button className="btn btn-primary w-1/4">Save</button>
                </form>
            </div>
        </div>
    );
};

export default PostManagement;