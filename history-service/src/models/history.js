const prismaClient = require("@prisma/client");

const prisma = prismaClient;

async function createHistory(productId, shopId, action, quantity) {
  return await prismaClient.history.create({
    data: { productId, shopId, action, quantity },
  });
}

module.exports = { createHistory };
