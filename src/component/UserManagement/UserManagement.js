import { async } from '@firebase/util';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

const UserManagement = () => {
    const [userList,setUserList]=useState([]);
    useEffect(()=>{        
        const unsub = onSnapshot(
            collection(db, "users"),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                });
                console.log(list)
                setUserList(list.filter(item=>item.email!="admin@admin.com"))
                
            }, (error) => {
                console.log(error);
            }
        );
        return () => {
            unsub();
        }
},[])
const deleteUser=async(email)=>{
    if(window.confirm("are you sure to delete this post?")){
        try{
            await deleteDoc(doc(db,"users",email));
            setUserList(userList.filter((d)=>d.email!==email));
        }catch(err){
            console.log(err)
        }
    }

}
    return (
        <div>
            {userList.map(userli=>{
                return (
                <div className="card w-1/3 mx-auto my-5 bg-base-100 shadow-xl">
                    <div className="card-body flex flex-row justify-between">
                        <h2 className="card-title">{userli.email}</h2>
                        
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={()=>deleteUser(userli.email)}>Delete</button>
                        </div>
                    </div>
                </div>
              );
            })}
        </div>
    );
};

export default UserManagement;