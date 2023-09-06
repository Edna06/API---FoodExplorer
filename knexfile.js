const path = require("path");

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { // a nossa conexão
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    useNullAsDefault: true
  }
};