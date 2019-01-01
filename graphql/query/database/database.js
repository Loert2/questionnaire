import knex from "knex";

const config = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 10100,
      user: "graphql",
      password: "password",
      database: "graphql"
    }
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.GRAPHQL_DB_HOST,
      port: process.env.GRAPHQL_DB_PORT,
      user: process.env.GRAPHQL_DB_USER,
      password: process.env.GRAPHQL_DB_PASSWORD,
      database: process.env.GRAPHQL_DB_DATABASE
    }
  }
};

const current_config =
  process.env.NODE_ENV === "production"
    ? config.production
    : config.development;

const db = knex(current_config);

export default db;
