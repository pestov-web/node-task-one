import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Генератор случайных данных
const generateUser = (index: number) => ({
  firstName: `FirstName${index}`,
  lastName: `LastName${index}`,
  age: Math.floor(Math.random() * 100) + 18, // Возраст от 18 до 118 лет
  gender: Math.random() > 0.5 ? 'male' : 'female',
  hasIssues: Math.random() > 0.5,
});

// Функция для вставки пользователей
async function seedUsers() {
  const batchSize = 1000; // Размер батча
  const totalUsers = 1_000_000; // Общее количество пользователей

  console.log(`Начало генерации ${totalUsers} пользователей...`);

  for (let i = 0; i < totalUsers; i += batchSize) {
    const usersBatch = Array.from(
      { length: Math.min(batchSize, totalUsers - i) },
      (_, j) => generateUser(i + j),
    );

    try {
      await prisma.user.createMany({
        data: usersBatch,
        skipDuplicates: true, // Пропуск дублирующихся записей
      });
      console.log(`Вставлено пользователей: ${i + usersBatch.length}`);
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
