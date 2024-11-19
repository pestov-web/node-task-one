const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(
      process.env.RABBITMQ_URL || "amqp://guest:guest@rabbitmq:5672"
    );
    channel = await connection.createChannel();
    await channel.assertQueue("inventory_changes", { durable: true });
    console.log(
      "Connected to RabbitMQ and queue 'inventory_changes' asserted."
    );
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
    process.exit(1);
  }
};

/**
 * Прослушивание очереди "inventory_changes"
 * @param {function} onMessage - Callback функция для обработки сообщений
 */
const consumeMessages = async (onMessage) => {
  if (!channel) {
    throw new Error(
      "RabbitMQ channel is not initialized. Call connectRabbitMQ first."
    );
  }

  try {
    channel.consume("inventory_changes", async (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        console.log("Received message from RabbitMQ:", message);

        try {
          await onMessage(message);
          channel.ack(msg);
        } catch (error) {
          console.error("Error processing message:", error);
          channel.nack(msg, false, true); // Повторная попытка обработки
        }
      }
    });

    console.log(
      "Listening for messages from RabbitMQ queue 'inventory_changes'."
    );
  } catch (error) {
    console.error("Error consuming messages:", error);
  }
};

module.exports = {
  connectRabbitMQ,
  consumeMessages,
};
