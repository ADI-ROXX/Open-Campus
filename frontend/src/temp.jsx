import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SendArray() {
    const friends = ['Alice', 'Bob', 'Charlie'];
    const out = [ -5,10, -5];
    const {account}=useAuth();
  const navigate=useNavigate()
  useEffect(()=>{
    if(!account){
      navigate("/");
    }
	},[]);
    useEffect(()=>{axios.post('http://localhost:3000/quick', { friends, out })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            // console.error('There was an error sending the data!', error);
        });},[]);

    return(
        <p className="h-screen text-4xl">HEllo</p>
    )
}

export default SendArray;