const winston = require("winston");

// Create a Winston logger instance
const logger = winston.createLogger({
  level: "info", // Set the minimum log level (info, debug, error, etc.)
  format: winston.format.combine(
    winston.format.timestamp(), // Add a timestamp to each log
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`; // Customize log message format
    })
  ),
  transports: [
    new winston.transports.Console({
      // Log to the console
      format: winston.format.combine(
        winston.format.colorize(), // Colorize the output
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      // Log to a file
      filename:
        "C:/RepositoryProjects/Blockchain_ml_model_weight_updater/Onchain_Model_update_API/server_transactions.log", // Path to the log file
      level: "info", // You can set a different log level for the file
    }),
  ],
});

module.exports = logger;
