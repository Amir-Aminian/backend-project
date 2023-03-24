const config = require("./config")
const mysql = require("mysql2/promise");

const database = async (query) => {
  const connection = await mysql.createConnection(config.database);
  const [result, field] = await connection.execute(query);
  connection.close();
  return(result);
}

module.exports = database;
