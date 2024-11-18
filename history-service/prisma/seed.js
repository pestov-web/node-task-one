const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  // Проверка, существуют ли уже записи в таблице history
  const existingHistory = await prisma.history.findFirst({
    where: {
      productId: 1,
      shopId: 1,
      action: "create_stock",
      quantity: 50,
      createdAt: new Date("2024-11-10T10:00:00Z"),
    },
  });

  // Если данных нет, добавляем
  if (!existingHistory) {
    await prisma.history.createMany({
      data: [
        {
          productId: 1,
          shopId: 1,
          action: "create_stock",
          quantity: 50,
          createdAt: new Date("2024-11-10T10:00:00Z"),
        },
        {
          productId: 1,
          shopId: 1,
          action: "increase_stock",
          quantity: 10,
          createdAt: new Date("2024-11-11T11:00:00Z"),
        },
        {
          productId: 2,
          shopId: 1,
          action: "create_stock",
          quantity: 30,
          createdAt: new Date("2024-11-10T12:00:00Z"),
        },
        {
          productId: 3,
          shopId: 2,
          action: "create_stock",
          quantity: 20,
          createdAt: new Date("2024-11-12T09:00:00Z"),
        },
        {
          productId: 4,
          shopId: 2,
          action: "decrease_stock",
          quantity: 5,
          createdAt: new Date("2024-11-12T14:00:00Z"),
        },
        {
          productId: 5,
          shopId: 3,
          action: "create_stock",
          quantity: 40,
          createdAt: new Date("2024-11-13T08:00:00Z"),
        },
      ],
    });

    console.log("Demo data has been added to history table.");
  } else {
    console.log("Data already exists in the history table.");
  }

  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
