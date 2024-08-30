
import React, { useEffect, useState } from 'react';
import FriendList from './FriendsList';
import './MainContent.scss';
import Navbar from '../components/Navbar';
import RetrieveRecords from './Retreived';
import { useAuth } from '../context/AuthContext';


const MainContent = ({ friends }) =>{   
  return (
  <div className="main-content h-full ">
    <div className="left-side ">
      <div className='font-calligraphic text-6xl mb-5 text-white pt-7'>My Friends</div>
      <div className='p-4 flex flex-wrap rounded'>

      <FriendList friends={friends} />
      </div>
    </div>
    <div className='flex relative flex-col w-full h-full'>
        <Navbar/>
    <div className="right-side items-center w-full justify-center mt-4 ml-10 ">

      <RetrieveRecords />
    </div>
    </div>
  </div>
)
};



export default function RetreivedContent() {
    const {contract }=useAuth();
  const [friends,setFriends] = useState([]);
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
    <div className="two-column-layout h-screen absolute top-0 right-0 bottom-0 left-0 ">
    <MainContent friends={friends} />
  </div>
  )
}
