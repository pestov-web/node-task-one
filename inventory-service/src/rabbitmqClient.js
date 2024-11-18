const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue("inventory_changes", { durable: true });
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
  }
};

const sendMessage = async (message) => {
  try {
    channel.sendToQueue(
      "inventory_changes",
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
      }
    );
    console.log("Message sent to RabbitMQ:", message);
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};

module.exports = {
  connectRabbitMQ,
  sendMessage,
};
