import React from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { ethers } from 'ethers';

import { useAuth } from '../../context/AuthContext';


const Form= () => {
  const {contract,selectedIds,account}=useAuth();



    const saveInDB=async(friends,out)=>{
      console.log("out",out);
      axios.post('http://localhost:3000/quick', { friends, out })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            // console.error('There was an error sending the data!', error);
        });};

  const submitForm = async() =>{
      const friends=[account,...selectedIds];
      console.log(friends);
      try{
        contract.on("RelationData", (data) => {
          console.log('Relation Data:', data);
          let out = [];
          for(let i=0;i<data.length;i++){
            let hexVal=data[i]._hex;
            const decimalValue = parseInt(hexVal, 16);
            
            // Step 3: Convert the decimal number to a floating-point number (double)
            const doubleValue = Number(decimalValue)/1e18;
            out.push(doubleValue);
          }
          saveInDB(friends,out);
        });

        const out_ = await contract.getRelation(friends);
      } catch(err){
        console.log(err);
      }
  }
  return(
  <div className="form-container">
    <p className='font-calligraphic text-4xl mb-10 '>Quick Settle</p>
    <Button variant="contained" color="primary" fullWidth onClick={submitForm}>
      Settle Loan
    </Button>
  </div>
);
}

export default Form;
