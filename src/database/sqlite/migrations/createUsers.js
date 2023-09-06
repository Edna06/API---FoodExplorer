const createUsers = `
  create table if not exists USERS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updates_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   )
`;

module.exports = createUsers;