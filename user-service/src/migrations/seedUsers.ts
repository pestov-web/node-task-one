import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsersMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = [];
    for (let i = 0; i < 1_000_000; i++) {
      const firstName = `User${i}`;
      const lastName = `LastName${i}`;
      const age = Math.floor(Math.random() * 60) + 18;
      const gender = Math.random() > 0.5 ? 'male' : 'female';
      const hasIssues = Math.random() > 0.7; // 30% пользователей имеют проблемы

      users.push(
        `('${firstName}', '${lastName}', ${age}, '${gender}', ${hasIssues})`,
      );
    }

    await queryRunner.query(`
      INSERT INTO users (first_name, last_name, age, gender, has_issues)
      VALUES ${users.join(', ')}
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users`);
  }
}
