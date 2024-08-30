import React, { useEffect, useState } from 'react';
import FriendList from '../FriendsList';
import Form from './Form';
import '../MainContent.scss';
import Navbar from '../../components/Navbar';
import AvatarGrid from './AvatarCircle';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const QuickPay= () =>{ 
  const {contract }=useAuth();
  const [friends,setFriends] = useState([]);
  const {account}=useAuth();
  const navigate=useNavigate()
  useEffect(()=>{
    if(!account){
      navigate("/");
    }
	},[]);
  useEffect(()=>{
    const temp=async()=>{

    const [ids,names,amounts]=await contract.getFriends();
    let temps=[];
    for(let i=0; i<ids.length; i++){
      temps.push({id: ids[i],name: names[i],amount: amounts[i]/1e18});
    }
    setFriends(temps);
    }
    temp();
  },[]);
  
  return (
<div className="absolute h-screen top-0 left-0">
  <div className="main-content h-full ">
    <div className="left-side ">
      <div className='font-calligraphic text-6xl mb-5 text-white pt-7'>My Friends</div>
      <div className='p-4 flex flex-wrap rounded'>

      <AvatarGrid friends={friends} />
      </div>
    </div>
    <div className='flex flex-col w-[70%] h-full'>
        <Navbar/>
    <div className="right-side items-center justify-center ml-[15%] mt-[20%]">

      <Form />
    </div>
    </div>
  </div>
</div>
)
};

export default QuickPay;
