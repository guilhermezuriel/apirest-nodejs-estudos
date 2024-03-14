import type { Knex } from "knex";
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/app.db"
    },
    useNullAsDefault:true,
    migrations:{
      extension:'ts',
      directory:'./db/migrations'
    }
  },
  test:{
    client:'sqlite3',
    connection:{
      filename:"./db/test.db"
    },
    useNullAsDefault:true,
    migrations:{
      extension:'ts',
      directory:'./db/migrations'
    }
  }
};

module.exports = config;
