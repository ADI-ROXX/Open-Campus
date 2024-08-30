import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
// improt useAuth from '../context/'


import CheckIcon from '@mui/icons-material/Check';
import { Box } from '@mui/material';
const AvatarGrid = ({friends}) => {
  const {selectedIds, setSelectedIds} = useAuth();
  const handleAvatarClick = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
    console.log(selectedIds);
  };
  const AvatarCircle = ({ id,name,amount, clicked }) => {
    const radii=70
    return (
      <Box position="relative" onClick={() => handleAvatarClick(id)}>
        <Avatar
          sx={{
            width: radii,
            height: radii,
            backgroundColor: selectedIds.includes(id) ? 'green' : 'lightblue',
            cursor: 'pointer',
          }}
        >
          {selectedIds.includes(id) && <CheckIcon />}
        </Avatar>
      <p className="text-white ">{name}</p>
      <p style={{ color: amount <= 0 ? 'green' : 'red' }}>{Math.abs(amount)}</p>
      </Box>
    );
  };



  

  return (
    <Box display="flex" gap={2}>
    <div className="flex flex-wrap ml-5 gap-4 items-start h-[2px]">
    {friends && friends.map((friend,index) => (

      <AvatarCircle key={index} src="/path/" alt={friend.name} id={friend.id} name={friend.name} amount={friend.amount} clicked={handleAvatarClick} />
    ))}


  </div>
    </Box>
  );
};

export default AvatarGrid;
