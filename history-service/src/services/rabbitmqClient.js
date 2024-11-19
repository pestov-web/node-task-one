const amqp = require("amqplib");
const { saveToHistory } = require("./saveToHistory");

const RABBIT_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = process.env.QUEUE_NAME;
async function startConsumer() {
  try {
    const connection = await amqp.connect(RABBIT_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log("Connected to RabbitMQ");
    console.log(`Waiting for messages in ${QUEUE_NAME}.`);

    channel.consume(
      QUEUE_NAME,
      async (msg) => {
        if (msg !== null) {
          const messageContent = msg.content.toString();
          console.log(`Received message: ${messageContent}`);

          try {
            const parsedData = JSON.parse(messageContent);

            // Сохранение в базу данных
            await saveToHistory({
              plu: parsedData.plu,
              shopId: parsedData.shopId,
              action: parsedData.action,
              shelfQuantity: parsedData.shelfQuantity,
              orderQuantity: parsedData.orderQuantity,
            });

            channel.ack(msg);
          } catch (err) {
            console.error("Error processing message:", err);
          }
        }
      },
      { noAck: false }
    );
  } catch (err) {
    console.error("Error in RabbitMQ consumer:", err);
  }
}

module.exports = { startConsumer };
