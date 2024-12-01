const { ethers } = require("ethers");
require("dotenv").config();
// Replace with your Infura project URL
const infuraUrl = process.env.RPC_URL;
const provider = new ethers.JsonRpcProvider(infuraUrl);
console.log("RPC_URL:", process.env.RPC_URL);
console.log("CONTRACT_ADDRESS:", process.env.CONTRACT_ADDRESS);
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY);

const contractAddress = process.env.CONTRACT_ADDRESS;

// ABI (Application Binary Interface) of your contract
// const abi = [
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "uint256",
//         name: "clientId",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "round",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "accuracy",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "precision",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "recall",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "f1Score",
//         type: "uint256",
//       },
//     ],
//     name: "MetricsUpdated",
//     type: "event",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     name: "clientMetrics",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "accuracy",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "precision",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "recall",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "f1Score",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "clientId",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "round",
//         type: "uint256",
//       },
//     ],
//     name: "getMetrics",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "clientId",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "round",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "accuracy",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "precision",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "recall",
//         type: "uint256",
//       },
//       {
//         internalType: "uint256",
//         name: "f1Score",
//         type: "uint256",
//       },
//     ],
//     name: "storeMetrics",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "clientId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "round",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "modelParameters",
        type: "uint256[]",
      },
    ],
    name: "ModelParametersUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "clientId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "round",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "modelParameters",
        type: "uint256[]",
      },
    ],
    name: "storeModelParameters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "clientModelParameters",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "clientId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "round",
        type: "uint256",
      },
    ],
    name: "getModelParameters",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
// Create contract instance
const privateKey = process.env.PRIVATE_KEY; // Use the private key of your wallet
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, provider);

// To store metrics, you will need a signer (account with private key)

// Set the signer to the contract
const contractWithSigner = contract.connect(wallet);

// // Function to store metrics
// async function storeMetrics(
//   clientId,
//   round,
//   accuracy,
//   precision,
//   recall,
//   f1Score
// ) {
//   const tx = await contractWithSigner.storeMetrics(
//     clientId,
//     round,
//     accuracy,
//     precision,
//     recall,
//     f1Score
//   );
//   console.log("Transaction sent:", tx.hash);
//   await tx.wait();
//   console.log("Transaction mined:", tx.hash);
// }

// // Function to get metrics
// async function getMetrics(clientId, round) {
//   const metrics = await contract.getMetrics(clientId, round);
//   console.log(
//     "Metrics for clientId:",
//     clientId,
//     "round:",
//     round,
//     "accuracy:",
//     metrics[0],
//     "precision:",
//     metrics[1],
//     "recall:",
//     metrics[2],
//     "f1Score:",
//     metrics[3]
//   );
// }

// Example usage
// Store metrics for clientId = 55, round = 1
// storeMetrics(55, 4, 95, 90, 92, 93);

// Get metrics for clientId = 55, round = 1
// getMetrics(55, 4);
// getMetrics(55, 4);

// async function testTransaction() {
//   try {
//     console.log("Preparing to send transaction...");
//     const tx = await contract.storeMetrics(1, 1, 95, 90, 92, 93); // Example placeholder values
//     console.log("Transaction sent:", tx.hash);

//     const receipt = await tx.wait();
//     console.log("Transaction mined. Receipt:", receipt);
//   } catch (error) {
//     console.error("Error during transaction:", error);
//   }
// }

// // Test the transaction
// testTransaction();

// const contract = new ethers.Contract(contractAddress, abi, wallet);

// Function to store metrics
// async function storeMetrics(
//   clientId,
//   round,
//   accuracy,
//   precision,
//   recall,
//   f1Score
// ) {
//   try {
//     console.log("Sending transaction to store metrics...");
//     const tx = await contractWithSigner.storeMetrics(
//       clientId,
//       round,
//       accuracy,
//       precision,
//       recall,
//       f1Score
//     );
//     console.log("Transaction sent:", tx.hash);

//     const receipt = await tx.wait();
//     console.log("Transaction mined. Receipt:", receipt);
//   } catch (error) {
//     console.error("Error storing metrics:", error);
//   }
// }

// // Example usage
// storeMetrics(68, 56, 95, 90, 92, 93);
async function storeModelParameters(clientId, round, modelParameters) {
  try {
    console.log("Sending transaction to store model parameters...");
    const tx = await contractWithSigner.storeModelParameters(
      clientId,
      round,
      modelParameters
    );
    console.log("Transaction sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction mined. Receipt:", receipt);
  } catch (error) {
    console.error("Error storing model parameters:", error);
  }
}

// Example usage
const modelParameters = [95, 90, 92, 93]; // Example model parameters
storeModelParameters(68, 56, modelParameters);
