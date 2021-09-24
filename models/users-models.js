const db = require("../db/connection.js");

exports.fetchUsers = async () => {
  const users = await db.query(`SELECT username FROM users`);
  
  return users.rows;
};
