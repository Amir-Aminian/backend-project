const config = require("./config")
const mysql = require("mysql2/promise");

const database = async (query, values) => {
  const connection = await mysql.createConnection(config.database);
  const [result, field] = await connection.execute(query, values);
  connection.close();
  return(result);
}

module.exports = database;
