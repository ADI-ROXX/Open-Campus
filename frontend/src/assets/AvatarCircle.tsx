import React from 'react';
import { Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';
// improt useAuth from '../context/'
interface AvatarCircleProps {
  id:string,
  name: string;
  amount:number
}



const AvatarCircle: React.FC<AvatarCircleProps> = ({ id,name,amount }) => {

  const {setReceiver,setAmount_}=useAuth();
  const radi=70;
  return(
    <div className="hover:cursor-pointer" onClick={()=>{setAmount_(amount);setReceiver(id)}}>
  <Avatar src="/path/" alt={name} sx={{ bgcolor:'green',textColor:'black',width: radi, height: radi }}  />
    <p className="text-white ">{name}</p>
    <p style={{ color: amount <= 0 ? 'green' : 'red' }}>{Math.abs(amount)}</p>
  </div>
);
};

export default AvatarCircle;
