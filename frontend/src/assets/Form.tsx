import React from 'react';
import { TextField, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { ethers } from 'ethers';


const Form: React.FC = () => {

  const {amount_,contract,setAmount_,receiver,setReceiver}=useAuth()


  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount_(event.target.value);
  };
  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReceiver(event.target.value);
  };
  
  const submitForm = async() =>{

      if(amount_=='' || amount_==0){alert("Empty value" ); return;}
      const isValid=/^\d+(\.\d{1,})?$/.test(amount_);
      if(!isValid) {alert( "Invalid value");return;}

      console.log(amount_)
      const to_be_sent = ethers.utils.parseEther(String(amount_));
      console.log(to_be_sent);
      const tx = await contract.sendMoney(receiver, { value: to_be_sent });

      // Wait for the transaction to be mined
      await tx.wait();
      console.log("Transaction successful")
  }
  return(
  <div className="form-container">
    <p className='font-calligraphic text-4xl '>Send Money</p>
    <TextField label="Receiver's address" value={receiver} onChange={handleChangeAddress}variant="outlined" fullWidth margin="normal" />
    <TextField label="Value"  value={amount_} onChange={handleChangeAmount} variant="outlined" fullWidth margin="normal" />
    <Button variant="contained" color="primary" fullWidth onClick={submitForm}>
      Send Money
    </Button>
  </div>
);
}

export default Form;
