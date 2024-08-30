import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { ethers } from 'ethers';
import { useAuth } from '../context/AuthContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';

const RetrieveRecords = () => {
    const {account,signer}=useAuth();

    const [loading, setLoading] = useState(false);
    const [records,setRecords] = useState([]);
    useEffect(()=>{
        const temp=async()=>{try {
        const response = await axios.post('http://localhost:3000/retrieve-records', { from: account });
        console.log(response.data);
        setRecords(response.data);
        } catch (err) {
        console.error('Error:', err);
        } finally {
        setLoading(false);
        }}
        temp();
    },[]);
    const handleSubmit=async(item)=>{

            let to = item.to;
            let amount=item.amount;
            let _id=item._id;

            // Check if MetaMask is installed
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
      
            // Create a provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);
      
            // Get the signer (the user)
            const signer = provider.getSigner();
      
            // Convert the amount to wei (1 ether = 10^18 wei)
            const valueInWei = ethers.utils.parseEther(String(amount));
      
            // Send the transaction
            const tx = await signer.sendTransaction({
              to: to,
              value: valueInWei,
            });
      
            // Wait for the transaction to be mined
            await tx.wait();
      
            console.log("Transaction successful");
            const response = await axios.delete('http://localhost:3000/delete', {
                data: { _id },  // Pass the _id in the request body
            });
            console.log(response.data);

    }
  return (
    <div>
      {loading && <Loader />}
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>

            <TableCell>To</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records && records.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.to}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit(item)}
                >
                  Send Money
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default RetrieveRecords;
