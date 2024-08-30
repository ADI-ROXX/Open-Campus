// duolingo1839


// zdm8cyzvc9k0I3li
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export async function pushRecords( records ) {
  let input_records=[];
  for(let i=0; i<records.length; i++) {
    let temp={};
    temp["from"]=records[i][0];
    temp["to"]=records[i][1];
    temp["amount"]=records[i][2];
    input_records.push(temp);
  }

  try {
    const response = await axios.post('http://localhost:3000/push-records', {
      records: input_records
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error pushing records:', error);
  }

}


export async function getRecords(fromValue) {
  try {

    const response = await axios.post('http://localhost:3000/retrieve-records', {
      from: fromValue
    });


    // Return the records from the response
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error retrieving records:', error);
    // Handle the error appropriately
    return [];
  }
}


const DB=()=>{
  const {account}=useAuth();
  const navigate=useNavigate()
  useEffect(()=>{
    if(!account){
      navigate("/");
    }
    let out = getRecords(account);
    console.log("records",out);
	},[]);


  return(
    <div>
      <button onClick={()=>pushRecords([["Hello","Bye",2000]])}>Hello</button>
      <button onClick={()=>getRecords("Hello")}>Byre</button>
    </div>
    )
}


export default DB;