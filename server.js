const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// Replace with your Infura project URL
const infuraUrl = process.env.RPC_URL;
const provider = new ethers.JsonRpcProvider(infuraUrl);
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY; // Use the private key of your wallet
const wallet = new ethers.Wallet(privateKey, provider);
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
        internalType: "uint256",
        name: "accuracy",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "precision",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "recall",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "f1Score",
        type: "uint256",
      },
    ],
    name: "MetricsUpdated",
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
        internalType: "uint256",
        name: "accuracy",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "precision",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "recall",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "f1Score",
        type: "uint256",
      },
    ],
    name: "storeMetrics",
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
    ],
    name: "clientMetrics",
    outputs: [
      {
        internalType: "uint256",
        name: "accuracy",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "precision",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "recall",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "f1Score",
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
    name: "getMetrics",
    outputs: [
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
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const contractWithSigner = new ethers.Contract(contractAddress, abi, wallet);

// API endpoint to store metrics
// app.post("/store-metrics", async (req, res) => {
//   try {
//     const { clientId, round, accuracy, precision, recall, f1Score } = req.body;

//     if (!clientId || !round || !accuracy || !precision || !recall || !f1Score) {
//       return res.status(400).json({ error: "All metrics are required" });
//     }

//     const tx = await contractWithSigner.storeMetrics(
//       clientId,
//       round,
//       accuracy,
//       precision,
//       recall,
//       f1Score
//     );
//     console.log("Transaction sent:", tx.hash);
//     await tx.wait();
//     console.log("Transaction mined:", tx.hash);

//     res
//       .status(200)
//       .json({ message: "Metrics stored successfully", txHash: tx.hash });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to store metrics" });
//   }
// });
const store_metric = async (req, res) => {
  try {
    const { clientId, round, accuracy, precision, recall, f1Score } = req.body;

    if (!clientId || !round || !accuracy || !precision || !recall || !f1Score) {
      return res.status(400).json({ error: "All metrics are required" });
    }

    const tx = await contractWithSigner.storeMetrics(
      clientId,
      round,
      accuracy,
      precision,
      recall,
      f1Score
    );
    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("Transaction mined:", tx.hash);

    res
      .status(200)
      .json({ message: "Metrics stored successfully", txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to store metrics" });
  }
};
app.post("/store-metrics", store_metric);
// API endpoint to get metrics
app.get("/get-metrics", async (req, res) => {
  try {
    const { clientId, round } = req.query;

    if (!clientId || !round) {
      return res.status(400).json({ error: "clientId and round are required" });
    }

    const metrics = await contractWithSigner.getMetrics(clientId, round);
    res.status(200).json({
      accuracy: metrics[0].toString(),
      precision: metrics[1].toString(),
      recall: metrics[2].toString(),
      f1Score: metrics[3].toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve metrics" });
  }
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
