const mysql = require("mysql2/promise");
const host = process.env.HOST;
const user = process.env.USER;
const databaseName = process.env.DATABASE;
const password = process.env.PASSWORD;
const waitForConnections = process.env.waitForConnections;
const connectionLimit = process.env.connectionLimit;
const queueLimit = process.env.queueLimit;

const database = async (query, values) => {
  const connection = mysql.createPool({host: host, user: user, database: databaseName, password: password, waitForConnections: waitForConnections, connectionLimit: connectionLimit, queueLimit: queueLimit});
  const [result, field] = await connection.execute(query, values);
  return(result);
}

module.exports = database;
