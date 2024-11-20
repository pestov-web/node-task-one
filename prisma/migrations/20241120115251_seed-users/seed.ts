import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Генератор случайных данных
const generateUser = (index: number) => ({
  firstName: `FirstName${index}`,
  lastName: `LastName${index}`,
  age: Math.floor(Math.random() * 100) + 18, // Возраст от 18 до 118 лет
  gender: Math.random() > 0.5 ? 'male' : 'female',
  hasProblems: Math.random() > 0.5,
});

// Функция для вставки пользователей
async function seedUsers() {
  const batchSize = 1000; // Размер батча
  const totalUsers = 1000000; // Общее количество пользователей

  for (let i = 0; i < totalUsers; i += batchSize) {
    const usersBatch = [];

    for (let j = i; j < i + batchSize && j < totalUsers; j++) {
      usersBatch.push(generateUser(j));
    }

    try {
      await prisma.users.createMany({
        data: usersBatch,
      });
      console.log(`Вставлено ${i + usersBatch.length} пользователей`);
    } catch (error) {
      console.error(
        `Ошибка при вставке пользователей с ${i} по ${i + usersBatch.length}:`,
        error,
      );
    }
  }
  console.log('Миграция завершена');
}

seedUsers()
  .catch((error) => {
    console.error('Ошибка при миграции:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
