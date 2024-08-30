// src/components/LoginPage.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "int256[]",
				"name": "data",
				"type": "int256[]"
			}
		],
		"name": "RelationData",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "friend",
				"type": "address"
			}
		],
		"name": "addFriend",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkIfExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
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
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "createUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFriends",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
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
		"inputs": [],
		"name": "getFriends_helper",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
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
				"internalType": "int256",
				"name": "",
				"type": "int256"
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
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"internalType": "int256",
				"name": "",
				"type": "int256"
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
				"internalType": "int256",
				"name": "",
				"type": "int256"
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
				"internalType": "struct Money.addr_money[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const contractAddress = '0xa93020cc615fcdADC7aD53E3dcBF551056EEbF10';

import {create} from 'ipfs-http-client'


export const ConnectToMetaMask=()=>{
  const {account,setContract,setAccount,setProvider}=useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Set the first account in the state
        setAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
		const signer = provider.getSigner();
		const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

      // Connect to the contract
		const contract = new ethers.Contract(contractAddress, contractABI, signer);
		setContract(contract);
        navigate('/loading');
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError('MetaMask is not installed. Please install MetaMask and try again.');
    }
  };
  const {provider,contract}=useAuth();
  return (
    <div className="h-screen items-center flex flex-col justify-center">
      <button onClick={connectMetaMask} className='text-blue-600 '>
        {account ? `Connected: ${account}` : 'Connect to MetaMask'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}



