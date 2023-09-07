const path = require("path");

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { // a nossa conexão
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
      pool:{
        afterCreate: (conn, cb) =>
        conn.run("PRAGMA foreign_keys = ON", cb) //habilitando o apagamento em cascata
      },
    migrations:{
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  }
};
