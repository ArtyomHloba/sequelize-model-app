module.exports = {
  development: {
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '2323',
    database: process.env.DB_NAME ?? 'task_menager_development',
    host: process.env.DB_HOST ?? '127.0.0.1',
    dialect: 'postgres',
    port: Number(process.env.DB_PORT) ?? 5432,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
