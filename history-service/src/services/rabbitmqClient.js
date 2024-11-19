const amqp = require("amqplib");
const { saveToHistory } = require("./saveToHistory");

const RABBIT_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = "inventory_changes";
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
      async (msg) => {
        if (msg !== null) {
          const messageContent = msg.content.toString();
          console.log(` [x] Received message: ${messageContent}`);

          try {
            const parsedData = JSON.parse(messageContent);

            // Сохранение в базу данных
            await saveToHistory({
              productId: parsedData.productId,
              shopId: parsedData.shopId,
              action: parsedData.action,
              quantity: parsedData.quantity,
            });

            // Подтверждение обработки сообщения
            channel.ack(msg);
          } catch (err) {
            console.error("Error processing message:", err);
            // Здесь можно решить, нужно ли подтверждать сообщение или оставить его в очереди
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
