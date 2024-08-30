// Import the ethers library
const { ethers } = require('ethers');

// Replace with your contract's ABI and address
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_userID",
				"type": "uint256"
			}
		],
		"name": "setUserID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "userID",
				"type": "uint256"
			}
		],
		"name": "UserIDSet",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUserID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const CONTRACT_ADDRESS = '0x291a017e231C0d7d1065269c7351C2BefA9d4283'; // Replace with your contract address

// Function to connect to the contract
const connectToContract = async () => {
    try {
        // Check if MetaMask is installed
        if (!window.ethereum) {
            throw new Error("MetaMask is not installed");
        }

        // Initialize a Web3Provider with MetaMask
        const provider = new ethers.Web3Provider(window.ethereum);

        // Request account access from MetaMask
        await provider.send("eth_requestAccounts", []);

        // Get the signer from the provider
        const signer = provider.getSigner();

        // Initialize the contract
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        console.log("Contract connected successfully");
        return contract;
    } catch (error) {
        console.error("Error connecting to contract:", error);
    }
};

// Example function to interact with the contract
const setUserID = async (userID) => {
    try {
        const contract = await connectToContract();
        if (!contract) return;

        // Call the contract function
        const tx = await contract.setUserID(userID);
        console.log('Transaction hash:', tx.hash);

        // Wait for the transaction to be mined
        await tx.wait();
        console.log('User ID set successfully');
    } catch (error) {
        console.error('Error setting user ID:', error);
    }
};

// Example usage
const userID = 12345; // Example user ID
setUserID(userID);
