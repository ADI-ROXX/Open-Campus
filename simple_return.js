const contractAddress = "0xc88731715755E52a6f39fAd45bE550735CB87816";
const abi=[
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

const contract = new web3.eth.Contract(contractABI, contractAddress);
