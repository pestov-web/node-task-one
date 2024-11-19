const amqp = require("amqplib");

const RABBIT_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = process.env.QUEUE_NAME;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBIT_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
  }
};

const sendMessage = async (message) => {
  try {
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
    console.log(`Message sent to ${QUEUE_NAME}:`, message);
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};

module.exports = {
  connectRabbitMQ,
  sendMessage,
};
