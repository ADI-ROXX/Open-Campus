import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AddFriendTwoColumnLayout from '../assets/AddFriendTwoColumn';
import Loader from '../assets/Loader';
import { useNavigate } from 'react-router-dom';
interface Friend {
  id: string;
  name: string;
  amount: number;
}

const AddPage: React.FC = () => {
  const {contract }=useAuth();
  const [friends,setFriends] = useState<Friend[]>([]);
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
    let temps: Friend[]=[];
    for(let i=0; i<ids.length; i++){
      temps.push({id: ids[i],name: names[i],amount: amounts[i]/1e18});
    }
    setFriends(temps);
    }
    temp();
  },[]);
    console.log("HomePage");
    return <div className='bg-blue-6900'><AddFriendTwoColumnLayout friends={friends} /></div>;
  };

export default AddPage;
