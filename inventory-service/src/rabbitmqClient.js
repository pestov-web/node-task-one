const amqp = require("amqplib");

const RABBIT_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = process.env.QUEUE_NAME;

let channel; // Объявляем глобальную переменную для канала

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBIT_URL);
    channel = await connection.createChannel(); // Обновляем глобальную переменную
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(`Connected to RabbitMQ ${QUEUE_NAME}`);
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
  }
};

const sendMessage = async (message) => {
  try {
    if (!channel) {
      throw new Error(
        "RabbitMQ channel is not initialized. Call connectRabbitMQ first."
      );
    }
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
