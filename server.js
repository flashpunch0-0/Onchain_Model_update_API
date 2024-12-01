// const express = require("express");
// const { ethers } = require("ethers");
// require("dotenv").config();
// const cors = require("cors");
// const app = express();
// app.use(cors());
// app.use(express.json());
// const Queue = require("bull");
// const metricsQueue = new Queue("metricsQueue");
// // Replace with your Infura project URL
// const infuraUrl = process.env.RPC_URL;
// const provider = new ethers.JsonRpcProvider(infuraUrl);
// const contractAddress = process.env.CONTRACT_ADDRESS;
// const privateKey = process.env.PRIVATE_KEY; // Use the private key of your wallet
// const wallet = new ethers.Wallet(privateKey, provider);
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
// ];
// // const abi = [
// //   {
// //     anonymous: false,
// //     inputs: [
// //       {
// //         indexed: true,
// //         internalType: "uint256",
// //         name: "clientId",
// //         type: "uint256",
// //       },
// //       {
// //         indexed: false,
// //         internalType: "uint256",
// //         name: "round",
// //         type: "uint256",
// //       },
// //       {
// //         indexed: false,
// //         internalType: "uint256",
// //         name: "accuracy",
// //         type: "uint256",
// //       },
// //       {
// //         indexed: false,
// //         internalType: "uint256",
// //         name: "precision",
// //         type: "uint256",
// //       },
// //       {
// //         indexed: false,
// //         internalType: "uint256",
// //         name: "recall",
// //         type: "uint256",
// //       },
// //       {
// //         indexed: false,
// //         internalType: "uint256",
// //         name: "f1Score",
// //         type: "uint256",
// //       },
// //     ],
// //     name: "MetricsUpdated",
// //     type: "event",
// //   },
// //   {
// //     inputs: [
// //       {
// //         internalType: "uint256",
// //         name: "clientId",
// //         type: "uint256",
// //       },
// //       {
// //         internalType: "uint256",
// //         name: "round",
// //         type: "uint256",
// //       },
// //       {
// //         internalType: "uint256",
// //         name: "accuracy",
// //         type: "uint256",
// //       },
// //       {
// //         internalType: "uint256",
// //         name: "precision",
// //         type: "uint256",
// //       },
// //       {
// //         internalType: "uint256",
// //         name: "recall",
// //         type: "uint256",
// //       },
// //       {
// //         internalType: "uint256",
// //         name: "f1Score",
// //         type: "uint256",
// //       },
// //     ],
// //     name: "storeMetrics",
// //     outputs: [],
// //     stateMutability: "nonpayable",
// //     type: "function",
// //   },
// //   {
// //     inputs: [
// //       {
// //         internalType: "uint256",
// //         name: "",
// //         type: "uint256",
// //       },
// //       {
// //         internalType: "uint256",
// //         name: "",
// //         type: "uint256",
// //       },
// //     ],
// //     name: "clientMetrics",
// //     outputs: [
// //       {
// //         internalType: "uint256",
// //         name: "accuracy",
// //         type: "uint256",
// //       },
// //       {
// //         internalType: "uint256",
// //         name: "precision",
// //         type: "uint256",
// //       },
// //       {
// //         internalType: "uint256",
// //         name: "recall",
// //         type: "uint256",
// //       },
// //       {
// //         internalType: "uint256",
// //         name: "f1Score",
// //         type: "uint256",
// //       },
// //     ],
// //     stateMutability: "view",
// //     type: "function",
// //   },
// //   {
// //     inputs: [
// //       {
// //         internalType: "uint256",
// //         name: "clientId",
// //         type: "uint256",
// //       },
// //       {
// //         internalType: "uint256",
// //         name: "round",
// //         type: "uint256",
// //       },
// //     ],
// //     name: "getMetrics",
// //     outputs: [
// //       {
// //         internalType: "uint256",
// //         name: "",
// //         type: "uint256",
// //       },
// //       {
// //         internalType: "uint256",
// //         name: "",
// //         type: "uint256",
// //       },
// //       {
// //         internalType: "uint256",
// //         name: "",
// //         type: "uint256",
// //       },
// //       {
// //         internalType: "uint256",
// //         name: "",
// //         type: "uint256",
// //       },
// //     ],
// //     stateMutability: "view",
// //     type: "function",
// //   },
// // ];
// const contractWithSigner = new ethers.Contract(contractAddress, abi, wallet);

// // API endpoint to store metrics
// // app.post("/store-metrics", async (req, res) => {
// //   try {
// //     const { clientId, round, accuracy, precision, recall, f1Score } = req.body;

// //     if (!clientId || !round || !accuracy || !precision || !recall || !f1Score) {
// //       return res.status(400).json({ error: "All metrics are required" });
// //     }

// //     const tx = await contractWithSigner.storeMetrics(
// //       clientId,
// //       round,
// //       accuracy,
// //       precision,
// //       recall,
// //       f1Score
// //     );
// //     console.log("Transaction sent:", tx.hash);
// //     await tx.wait();
// //     console.log("Transaction mined:", tx.hash);

// //     res
// //       .status(200)
// //       .json({ message: "Metrics stored successfully", txHash: tx.hash });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: "Failed to store metrics" });
// //   }
// // });

// //

// //
// const store_metric = async (req, res) => {
//   const { clientId, round, accuracy, precision, recall, f1Score } = req.body;

//   if (!clientId || !round || !accuracy || !precision || !recall || !f1Score) {
//     return res.status(400).json({ error: "All metrics are required" });
//   }

//   metricsQueue.add({
//     clientId,
//     round,
//     accuracy,
//     precision,
//     recall,
//     f1Score,
//   });
//   console.log("metrics queuesd");
//   res.status(200).json({ message: "Metrics queued for storage" });
// };
// app.post("/store-metrics", store_metric);

// metricsQueue.process(async (job) => {
//   console.log("Processing job:", job.id); // Add this line to check if the job is being processed
//   const { clientId, round, accuracy, precision, recall, f1Score } = job.data;
//   try {
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
//   } catch (error) {
//     console.error("Failed to store metrics:", error);
//     throw error;
//   }
// });

// // API endpoint to get metrics
// app.get("/get-metrics", async (req, res) => {
//   try {
//     const { clientId, round } = req.query;

//     if (!clientId || !round) {
//       return res.status(400).json({ error: "clientId and round are required" });
//     }

//     const metrics = await contractWithSigner.getMetrics(clientId, round);
//     res.status(200).json({
//       accuracy: metrics[0].toString(),
//       precision: metrics[1].toString(),
//       recall: metrics[2].toString(),
//       f1Score: metrics[3].toString(),
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to retrieve metrics" });
//   }
// });

// // Start the server on port 3000
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();
const cors = require("cors");
const redis = require("redis");
const Queue = require("bull");
const logger = require("./logger");
const app = express();
app.use(cors());
app.use(express.json());

// Connect to Redis server
const redisClient = redis.createClient({
  host: "172.24.237.72",
  port: 6379,
});
redisClient.connect().catch((err) => {
  console.error("Redis connection error:", err);
  process.exit(1);
});

// Create the Bull queue for metrics
const metricsQueue = new Queue("metricsQueue", {
  redis: {
    host: "172.24.237.72",
    port: 6379,
  },
  settings: {
    maxStalledCount: 5, // Number of times a job can be stalled before being considered failed
    retryProcessDelay: 10000, // Delay before retrying jobs (10 seconds)
  },
});

// Configure ethers.js provider
const infuraUrl = process.env.RPC_URL;
const provider = new ethers.JsonRpcProvider(infuraUrl);
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
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

//  not working below wala
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
const contractWithSigner = new ethers.Contract(contractAddress, abi, wallet);

// API endpoint to store metrics
// const store_metric = async (req, res) => {
//   const { clientId, round, accuracy, precision, recall, f1Score } = req.body;

//   if (!clientId || !round || !accuracy || !precision || !recall || !f1Score) {
//     return res.status(400).json({ error: "All metrics are required" });
//   }

//   metricsQueue.add({
//     clientId,
//     round,
//     accuracy,
//     precision,
//     recall,
//     f1Score,
//   });
//   console.log("Metrics queued for storage");

//   res.status(200).json({ message: "Metrics queued for storage" });
// };
// app.post("/store-metrics", store_metric);

// // Process the queued jobs in Bull
// metricsQueue.process(async (job) => {
//   console.log("Processing job:", job.id); // Check if the job is being processed
//   const { clientId, round, accuracy, precision, recall, f1Score } = job.data;

//   try {
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
//     queueData = {
//       clientId,
//       round,
//       accuracy,
//       precision,
//       recall,
//       f1Score,
//       txHash: tx.hash,
//     };
//     console.log("Transaction mined:", tx.hash);
//     logger.info(`Pushing data to Redis queue: ${JSON.stringify(queueData)}`);
//   } catch (error) {
//     logger.error(`Error pushing data to Redis: ${err}`);
//     console.error("Failed to store metrics:", error);
//     throw error;
//   }
// });
// metricsQueue.on("failed", (job, err) => {
//   console.error(`Job failed: ${job.id}, Error: ${err}`);
// });

// // API endpoint to get metrics
// app.get("/get-metrics", async (req, res) => {
//   console.log(req.query);
//   try {
//     const { clientId, round } = req.query;

//     if (!clientId || !round) {
//       return res.status(400).json({ error: "clientId and round are required" });
//     }

//     const metrics = await contractWithSigner.getMetrics(clientId, round);
//     console.log(metrics);
//     res.status(200).json({
//       accuracy: metrics[0].toString(),
//       precision: metrics[1].toString(),
//       recall: metrics[2].toString(),
//       f1Score: metrics[3].toString(),
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to retrieve metrics" });
//   }
// });

// // Start the server on port 3000
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const store_metric = async (req, res) => {
  const { clientId, round, modelParameters } = req.body;

  if (
    !clientId ||
    !round ||
    !modelParameters ||
    !Array.isArray(modelParameters)
  ) {
    return res.status(400).json({
      error: "clientId, round, and modelParameters (array) are required",
    });
  }

  // Add job to the queue for processing
  metricsQueue.add({
    clientId,
    round,
    modelParameters,
  });
  console.log("Model parameters queued for storage");

  res.status(200).json({ message: "Model parameters queued for storage" });
};

app.post("/store-model-parameters", store_metric);

// Process the queued jobs in Bull
metricsQueue.process(async (job) => {
  console.log("Processing job:", job.id); // Check if the job is being processed
  const { clientId, round, modelParameters } = job.data;

  try {
    const tx = await contractWithSigner.storeModelParameters(
      clientId,
      round,
      modelParameters
    );

    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    queueData = {
      clientId,
      round,
      modelParameters,
      txHash: tx.hash,
    };
    console.log("Transaction mined:", tx.hash);
    logger.info(`Pushing data to Redis queue: ${JSON.stringify(queueData)}`);
  } catch (error) {
    logger.error(`Error pushing data to Redis: ${error}`);
    console.error("Failed to store model parameters:", error);
    throw error;
  }
});

metricsQueue.on("failed", (job, err) => {
  console.error(`Job failed: ${job.id}, Error: ${err}`);
});

// API endpoint to get model parameters
app.get("/get-model-parameters", async (req, res) => {
  console.log(req.query);
  try {
    const { clientId, round } = req.query;

    if (!clientId || !round) {
      return res.status(400).json({ error: "clientId and round are required" });
    }

    const modelParameters = await contractWithSigner.getModelParameters(
      clientId,
      round
    );
    console.log(modelParameters);
    res.status(200).json({
      modelParameters: modelParameters.map((param) => param.toString()),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve model parameters" });
  }
});

app.get("/get-all-model-parameters", async (req, res) => {
  try {
    const { numClients, numRounds } = req.query;

    if (!numClients || !numRounds) {
      return res
        .status(400)
        .json({ error: "numClients and numRounds are required" });
    }

    const allParameters = [];

    for (let clientId = 1; clientId <= numClients; clientId++) {
      for (let round = 1; round <= numRounds; round++) {
        try {
          const modelParameters = await contractWithSigner.getModelParameters(
            clientId,
            round
          );
          allParameters.push({
            clientId,
            round,
            modelParameters: modelParameters.map((param) => param.toString()),
          });
        } catch (error) {
          console.error(
            `Error fetching parameters for client ${clientId}, round ${round}:`,
            error
          );
        }
      }
    }

    res.status(200).json(allParameters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve model parameters" });
  }
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
