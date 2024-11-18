const winston = require("winston");
const expressWinston = require("express-winston");

const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: "combined.log" }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
});
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: "error.log" }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
});

module.exports = { logger, errorLogger };
