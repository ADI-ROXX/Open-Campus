


const CONTRACT_ADDRESS = '0x291a017e231C0d7d1065269c7351C2BefA9d4283';
const CONTRACT_ABI = [
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
	},
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
	}
];

async function setUserID(userName, userAddress) {
    // Define provider (e.g., Infura, Alchemy, or local node provider)


      // Create an ethers provider
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();

	// Connect to the contract
	const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    try {
        // Convert userName to userID (you may have a different method for this)
        const userID = parseInt(userName, 10); // Example conversion, adjust as needed

        // Call the setUserID function on the smart contract
        const tx = await contract.setUserID(userID);

        // Wait for transaction confirmation
        await tx.wait();

        console.log(`User ID ${userID} set for address ${userAddress}`);
    } catch (error) {
        console.error('Error setting user ID:', error);
    }
}

// Example usage
const userName = '123'; // Example userName
const userAddress = '0xUserWalletAddress'; // Example user address
setUserID(userName, userAddress);
