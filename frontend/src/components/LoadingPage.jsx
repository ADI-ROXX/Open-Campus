import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useAuth } from '../context/AuthContext';
import Loader from '../assets/Loader';
import React from 'react';



const LoadingPage=()=> {
  const {account}=useAuth();
  console.log("Account,",account);
  const {provider,contract}=useAuth();
  console.log(provider);
  const checkIfExists=async () => {
    // const [exists, setExists] = useState(false);
    // Create a provider and signer (assumes MetaMask is installed)

    

    try {
      // Call the checkIfExists function
      console.log("contract",contract)
      const exists = await contract.checkIfExists();
      console.log(exists)
      if(!exists){
        navigate("/create");
      }
      else{
        navigate("/db");
      }
      // setExists(exists);
    } catch (error) {
      console.error("Error checking if user exists:", error);
    }
  }



  const navigate=useNavigate();

	console.log(account);
	useEffect(()=>{
    if(!account){
      navigate("/");
    }
    checkIfExists()
	
	},[]);
	
	
  

  return (
    <div>
      {/* {loading ? <p>Loading...</p> : null} */}
      <Loader />
    </div>
  );
}

export default LoadingPage;
