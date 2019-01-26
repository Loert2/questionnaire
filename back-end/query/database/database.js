import knex from "knex";

const config = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "postgres",
      database: "questionnaire2"
    }
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.POSTGRESQL_DB_HOST,
      port: process.env.POSTGRESQL_DB_PORT,
      user: process.env.POSTGRESQL_DB_USER,
      password: process.env.POSTGRESQL_DB_PASSWORD,
      database: process.env.POSTGRESQL_DB_DATABASE
    }
  }
};

const current_config =
  process.env.NODE_ENV === "production"
    ? config.production
    : config.development;

const db = knex(current_config);

export default db;
