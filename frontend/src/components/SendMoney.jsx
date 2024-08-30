import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const abi_money =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_debtor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_creditor",
				"type": "address"
			}
		],
		"name": "checkOwes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_owesTo",
				"type": "address"
			}
		],
		"name": "getOwes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "friends",
				"type": "address[]"
			}
		],
		"name": "getRelation",
		"outputs": [
			{
				"internalType": "int256[]",
				"name": "",
				"type": "int256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "other",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "me",
				"type": "address"
			}
		],
		"name": "oneToOneReturn",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "owes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "sendMoney",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "friends",
				"type": "address[]"
			},
			{
				"internalType": "address",
				"name": "me",
				"type": "address"
			}
		],
		"name": "simpleReturn",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "_addr",
						"type": "address"
					},
					{
						"internalType": "int256",
						"name": "_amount",
						"type": "int256"
					}
				],
				"internalType": "struct money.addr_money[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const address_money = "0x1c3418369fc60fFD4c4668AfF23f03d27b6f8E12";


const SendMoney = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const {account}=useAuth();
  const navigate=useNavigate()
  useEffect(()=>{
    if(!account){
      navigate("/");
    }
	},[]);
  // Function to handle sending money
  const sendMoney = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed!');
      return;
    }

    try {
      // Request access to the user's MetaMask account
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    
      const {contract_money}=useAuth();

      // Convert the amount to Wei
      const amountInWei = ethers.utils.parseEther(amount);

      // Send the money by calling the contract's sendMoney function
      const tx = await contract_money.sendMoney(recipient, { value: amountInWei });
      await tx.wait();

      alert('Transaction successful!');
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed! Check the console for details.');
    }
  };

  return (
    <div>
      <h2>Send Money</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendMoney}>Send</button>
    </div>
  );
};

export default SendMoney;
