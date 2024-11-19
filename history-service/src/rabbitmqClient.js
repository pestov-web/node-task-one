const amqp = require("amqplib");

const RABBIT_URL = process.env.RABBITMQ_URL; // URL подключения к RabbitMQ
const QUEUE_NAME = "inventory_changes"; // Имя очереди, которую слушаем

async function startConsumer() {
  try {
    const connection = await amqp.connect(RABBIT_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(
      ` [*] Waiting for messages in ${QUEUE_NAME}. Press CTRL+C to exit.`
    );

    channel.consume(
      QUEUE_NAME,
      (msg) => {
        if (msg !== null) {
          const messageContent = msg.content.toString();
          console.log(` [x] Received message: ${messageContent}`);

          // Здесь можно обработать сообщение
          const parsedData = JSON.parse(messageContent);
          console.log("Processed data:", parsedData);

          // Подтверждаем, что сообщение обработано
          channel.ack(msg);
        }
      },
      { noAck: false } // Включаем подтверждение обработки
    );
  } catch (err) {
    console.error("Error in RabbitMQ consumer:", err);
  }
}

module.exports = { startConsumer };
