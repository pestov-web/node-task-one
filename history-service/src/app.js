const fastify = require("fastify")({ logger: true });

const createHistory = require("./models/history");
const app = fastify;

app.post("/history", async (req, reply) => {
  const { productId, shopId, action, quantity } = req.body;
  try {
    const history = await createHistory(productId, shopId, action, quantity);
    reply.status(201).send(history);
  } catch (err) {
    reply.status(500).send({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen({ port: PORT }, () => {
  console.log(`History service running on port ${PORT}`);
});
