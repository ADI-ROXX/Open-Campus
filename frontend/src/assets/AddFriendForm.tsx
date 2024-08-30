import React from 'react';
import { TextField, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AddFriend: React.FC = () => {

  const {receiver,setReceiver}=useAuth()
  const {contract,account}=useAuth();

  const navigate=useNavigate();

  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReceiver(event.target.value);
  };
  
  const submitForm = async () => {
    try {
      if(receiver===''){alert("Please enter a value");return;};
      
      let out = await contract.getFriends_helper();
      
      if(out.includes(receiver)){
        alert("Already your  friend");return;
      }
      if(account===receiver){
        alert("Your id"); return;
      }

      
      out=await contract.addFriend(receiver);

      console.log(out);

      

      // await contract.addFriend(fr);
    } catch (err) {
        console.log(err);
    }

    setReceiver('');
    // Implement submission logic here
  };
  return(
    <div>
  <div className="form-container">
    <p className='font-calligraphic text-4xl '>Add Friend</p>
    <TextField label="Friend's Address" value={receiver} onChange={handleChangeAddress}variant="outlined" fullWidth margin="normal" />
    <Button variant="contained" color="primary" fullWidth onClick={submitForm}>
        Add Friend
    </Button>
  </div>
  </div>
);
}

export default AddFriend;
