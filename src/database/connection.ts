import { createConnection, getConnectionOptions } from 'typeorm';

export default (async () => {
  const defaultOptions = await getConnectionOptions();
  const isProdEnv = process.env.NODE_ENV === 'production';

  const database = await createConnection(
    Object.assign(defaultOptions, {
      ...(isProdEnv && {
        database: './dist/database/database.sqlite',
        entities: ['./dist/models/**.js'],
        migrations: ['./dist/database/migrations/**.js'],
        cli: {
          migrationsDir: './dist/database/migrations',
        },
      }),
    }),
  );

  if (isProdEnv) {
    await database.runMigrations();
  }

  return database;
})();
