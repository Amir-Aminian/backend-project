const mysql = require("mysql2/promise");
const host = process.env.HOST;
const user = process.env.USER;
const databaseName = process.env.DATABASE;
const password = process.env.PASSWORD;
const waitForConnections = process.env.waitForConnections;
const connectionLimit = process.env.connectionLimit;
const queueLimit = process.env.queueLimit;

const pool = mysql.createPool({host: host, user: user, database: databaseName, password: password, waitForConnections: waitForConnections, connectionLimit: connectionLimit, queueLimit: queueLimit});

const sequentialQueries = async (callback) => {
  let connection;

  try {
    // Get a connection from the pool
    connection = await pool.getConnection();

    // Start a transaction
    await connection.beginTransaction();

    // Queries
    await callback(connection);

    // Commit the transaction
    await connection.commit();

    return(true);

  } catch (error) {
    // Rollback the transaction if an error occurs
    await connection.rollback();
    
    return(false);

  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
}



module.exports = sequentialQueries;
