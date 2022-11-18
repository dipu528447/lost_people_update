import { onSnapshot, collection,doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import React, { useEffect, useState } from 'react';
import { async } from '@firebase/util';

const Chat = ({ user }) => {
    const [msgs,setMsgs]=useState([]);
    const [loading,setLoading]=useState(false);
    const handleSendMsg=async (e)=>{
        e.preventDefault();
        const message={
            sender:user.email,
            image:user.photoURL,
            content:document.getElementById('text').value,
            id:msgs.length+1
              
        }
        try{
            await addDoc(collection(db, 'messages'), {
                ...message,
                timeStamp: serverTimestamp(),
            });
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        console.log(user);
        setLoading(true);
        console.log('loading')
        
        const unsub=onSnapshot(
                collection(db,'messages'),
                (snapshot) => {
                    let list = [];
                    console.log(snapshot);
                    //snapshot.sort(function(a,b){return a.id-b.id})
                    snapshot.docs.forEach((doc) => {
                        list.push({ id: doc.id, ...doc.data() })
                    });
                    list=list.sort(function(a,b){return a.id-b.id })
                    console.log(list)
                    setMsgs(list);
                    setLoading(false);
                }, (error) => {
                    console.log(error);
                }
           
        );
        return () => {
            unsub();
        }
        
    }, [])
    return (
        <div>
            <h1 className='text-3xl'>Chat</h1>
            <div className='grid mx-20 p-2 border border-primary'>
                {console.log(msgs)} 
                {msgs.map((msg,index)=>{     
                        if(msg.sender==user.email){
                            return (
                                <div className='justify-self-end'>
                                    <div className='flex bg-primary rounded-full' key={index}>
                                        <div className="avatar">
                                            <div className="w-8 rounded-full">
                                                <img src={msg.image} />
                                            </div>
                                        </div>
                                        <div className='p-2 text-sm text-right'>
                                            {msg.content}
                                        </div>
                                        
                                    </div>
                                    <br></br>
                                </div>
                            );
                        }
                        else{
                            return (
                                <div className='justify-self-start'>
                                    <div className='flex bg-secondary  rounded-full' key={index}>
                                        <div className='avatar'>
                                            <div className="w-8 rounded-full">
                                                <img src={msg.image} />
                                            </div>
                                        </div>
                                        
                                        <div className='p-2 text-sm text-left text-black'>
                                            {msg.content}
                                        </div>
                                        
                                    </div>
                                    <br></br>
                                </div>
                            );
                        }
                })}
            
                
            </div>
            <div className='w-full absolute sticky bottom-0'>
                    <form onSubmit={handleSendMsg} className="flex mx-20">
                        <input type='text' className='w-full border' id="text"/>
                        <button type="submit" className='btn btn-black' >Send</button>
                    </form>
             </div>
        </div>
    );
};

export default Chat;